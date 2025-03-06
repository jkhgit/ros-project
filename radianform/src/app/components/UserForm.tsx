// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import NumberFlow from '@number-flow/react';
import PersonalInfoSection from './PersonalInfoSection';
import TierSelector from './TierSelector';
import AddressSection from './AddressSection';

export default function UserForm() {
  const GEOAPIFY_API_KEY = '';
  const EMAIL_VALIDATION_API_KEY = '';

  const [formData, setFormData] = useState({
    firstName: '',
    middleInitial: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [billingState, setBillingState] = useState('annual');
  const [tierState, setTierState] = useState('low');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const prices = {
    low: {
      monthly: 0,
      annual: 0
    },
    middle: {
      monthly: 5,
      annual: 48 
    },
    high: {
      monthly: 10,
      annual: 96 
    }
  };

  useEffect(() => {
    setCurrentPrice(prices[tierState][billingState]);
  }, [billingState, tierState]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (address, city, state, zip) => {
    setFormData(prev => ({
      ...prev,
      address,
      city,
      state,
      zip
    }));
  };

  const handleAddressInput = async (value) => {
    handleInputChange('address', value);
    if (value.length <= 2) {
      setAddressSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/address?query=${encodeURIComponent(value)}`
      );
      
      if (!response.ok) {
        console.warn('Address API request failed:', response.status);
        setAddressSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      const data = await response.json();
      
      if (data.features && Array.isArray(data.features)) {
        setAddressSuggestions(data.features);
        setShowSuggestions(true);
      } else {
        setAddressSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.warn('Error fetching address suggestions:', error);
      setAddressSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectAddress = (suggestion) => {
    const props = suggestion.properties;
    handleAddressChange(
      props.address_line1 || '',
      props.city || '',
      props.state || '',
      props.postcode || ''
    );
    setShowSuggestions(false);
  };

  const validateEmail = async (email) => {
    try {
      const response = await fetch(
        `/api/email?email=${encodeURIComponent(email)}`
      );

      if (response.ok) {
        const data = await response.json();
        
        if (data && typeof data === 'object') {
          return data.deliverability === "DELIVERABLE" && 
                 data.is_valid_format.value === true && 
                 !data.is_disposable_email.value;
        }
      } else {
        console.warn('Email validation API request failed:', response.status);
      }
    } catch (error) {
      console.warn('Error validating email:', error);
    }

    // If API request fails, accept any email
    console.log("fall back true, email validation failed")
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailInput = e.currentTarget.querySelector('input[type="email"]');
    
    try {
      const isEmailValid = await validateEmail(formData.email);
      if (!isEmailValid) {
        emailInput.setCustomValidity('Please enter a valid email address');
        emailInput.reportValidity();
        return;
      }
      
      emailInput.setCustomValidity('');
      
      const formDataToSave = {
        ...formData,
        billingState,
        tierState,
        submittedAt: new Date().toISOString()
      };
      
      try {
        const existingData = localStorage.getItem('userFormData');
        let submissions = [];
        
        if (existingData) {
          submissions = JSON.parse(existingData);
          if (!Array.isArray(submissions)) {
            submissions = [submissions];
          }
        }
        
        submissions.push(formDataToSave);
        
        localStorage.setItem('userFormData', JSON.stringify(submissions));
        console.log('Form data saved to localStorage successfully');
        
        resetForm();
        
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        alert('Failed to save form data. Please try again.');
      }
      
    } catch (error) {
      console.error('Error during submission:', error);
      emailInput.setCustomValidity('Error validating email. Please try again.');
      emailInput.reportValidity();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      middleInitial: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    });
    setBillingState('annual');
    setTierState('low');
    setAddressSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formSection}>
        <PersonalInfoSection 
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <AddressSection
          address={formData.address}
          city={formData.city}
          state={formData.state}
          zip={formData.zip}
          addressSuggestions={addressSuggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          onAddressInput={handleAddressInput}
          onSelectAddress={handleSelectAddress}
          onAddressChange={handleAddressChange}
        />
      </div>

      <div className={styles.formSection}>
        <TierSelector
          billingState={billingState}
          tierState={tierState}
          currentPrice={currentPrice}
          onTierChange={setTierState}
          onBillingChange={setBillingState}
          title={"Select Your tier"}
        />
      </div>
    
      <div className={styles.formSection}>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </form>
  );
} 