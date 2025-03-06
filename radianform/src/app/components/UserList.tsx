// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import styles from './UserList.module.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [keepUsers, setKeepUsers] = useState([]);
  const [deleteUsers, setDeleteUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUsers(Array.isArray(parsedData) ? parsedData : [parsedData]);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUsers([]);
      }
    }
  };

  const moveUser = (user, targetSection) => {
    // Remove user from all sections first
    const removeFromSection = (section) => 
      section.filter(u => u.submittedAt !== user.submittedAt);

    setUsers(removeFromSection);
    setKeepUsers(removeFromSection);
    setDeleteUsers(removeFromSection);

    // Add to target section
    switch (targetSection) {
      case 'keep':
        setKeepUsers(prev => [...prev, user]);
        break;
      case 'delete':
        setDeleteUsers(prev => [...prev, user]);
        break;
      case 'all':
        setUsers(prev => [...prev, user]);
        break;
    }
  };

  const handleDragStart = (e, user) => {
    e.dataTransfer.setData('application/json', JSON.stringify(user));
  };

  const handleDrop = (e, targetSection) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(e.dataTransfer.getData('application/json'));
      moveUser(userData, targetSection);
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  const handleSubmit = () => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      try {
        const allUsers = JSON.parse(savedData);
        const updatedUsers = allUsers.filter(user => 
          !deleteUsers.some(deleteUser => deleteUser.submittedAt === user.submittedAt)
        );
        
        localStorage.setItem('userFormData', JSON.stringify(updatedUsers));
        setDeleteUsers([]);
        setUsers(updatedUsers.filter(user => 
          !keepUsers.some(keepUser => keepUser.submittedAt === user.submittedAt)
        ));
      } catch (error) {
        console.error('Error processing submission:', error);
      }
    }
  };

  const handleReset = () => {
    loadUsers();
    setKeepUsers([]);
    setDeleteUsers([]);
  };

  const UserCard = ({ user }) => (
    <div 
      className={styles.userCard}
      draggable
      onDragStart={(e) => handleDragStart(e, user)}
    >
      <div className={styles.userDetails}>
        <h3>{user.firstName} {user.middleInitial} {user.lastName}</h3>
        <p>{user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>DOB: {user.dateOfBirth}</p>
        <p>Tier: {user.tierState}</p>
        <p>Frequency: {user.billingState}</p>
        <p>{user.address}</p>
        <p>{user.city}, {user.state} {user.zip}</p>
      </div>
    </div>
  );

  const Section = ({ title, users, section }) => (
    <div 
      className={`${styles.section} ${styles.form}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleDrop(e, section)}
    >
      <h2 className={styles.heading1}>{title}</h2>
      <div className={styles.sectionContent}>
        {users.map((user, index) => (
          <UserCard key={`${user.submittedAt}-${index}`} user={user} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.userListContainer}>
      <div className={styles.sectionsContainer}>
        <Section title="All Users" users={users} section="all" />
        <Section title="Keep" users={keepUsers} section="keep" />
        <Section title="Delete" users={deleteUsers} section="delete" />
        <div className={styles.actionSection}>
          <div className={styles.buttonGroup}>
            <button 
              className={`${styles.submitButton} ${styles.resetButton}`} 
              onClick={handleReset}
            >
              Reset Changes
            </button>
            <button 
              className={styles.submitButton} 
              onClick={handleSubmit}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 