// @ts-nocheck
import { useRef, useEffect } from 'react';
import styles from "../page.module.css";

export default function AddressSection({ 
  address, 
  city, 
  state, 
  zip,
  addressSuggestions,
  showSuggestions,
  setShowSuggestions,
  onAddressInput,
  onSelectAddress,
  onAddressChange 
}) {
  const addressContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (addressContainerRef.current && !addressContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <div className={styles.formSection}>
      <h5 className={styles.heading5}>Add your address. *</h5>
      <div className={styles.inputRow}>
        <div className={styles.addressContainer} ref={addressContainerRef}>
          <input 
            type="text"
            placeholder="Street"
            required
            className={styles.addressInput}
            value={address}
            onChange={(e) => onAddressInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            name="street-address"
            autoComplete="street-address"
          />
          {showSuggestions && addressSuggestions.length > 0 && (
            <div className={styles.addressDropdown}>
              {addressSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={styles.addressItem}
                  onClick={() => onSelectAddress(suggestion)}>
                  {suggestion.properties.formatted}
                </div>
              ))}
            </div>
          )}
        </div>

        <input 
          type="text" 
          placeholder="City" 
          className={styles.defaultInput} 
          value={city} 
          required
          onChange={(e) => onAddressChange(address, e.target.value, state, zip)}
        />
        <input 
          type="text" 
          placeholder="State" 
          className={styles.defaultInput} 
          value={state} 
          required
          onChange={(e) => onAddressChange(address, city, e.target.value, zip)}
        />
        <input 
          type="number" 
          placeholder="Zipcode" 
          className={`${styles.defaultInput} ${styles.noSpinner}`} 
          value={zip} 
          required
          onChange={(e) => onAddressChange(address, city, state, e.target.value)}
        />
      </div>
    </div>
  );
} 