// @ts-nocheck
import styles from "../page.module.css";

export default function PersonalInfoSection({ formData, handleInputChange }) {
  return (
    <>
    <h1 className={styles.heading1}>User Sign-up Form</h1>
      <div className={styles.formSection}>
        <h5 className={styles.heading5}>Please fill out your name *</h5>
        <div className={styles.inputRow}>
          <input 
            type="text" 
            placeholder="First Name" 
            className={styles.defaultInput} 
            required 
            value={formData.firstName} 
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Middle Initial" 
            maxLength={1} 
            className={styles.initialInput} 
            required 
            value={formData.middleInitial} 
            onChange={(e) => handleInputChange('middleInitial', e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            className={styles.defaultInput} 
            required 
            value={formData.lastName} 
            onChange={(e) => handleInputChange('lastName', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h5 className={styles.heading5}>Add your email *</h5>
        <div className={styles.inputRow}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className={styles.defaultInput} 
            required 
            value={formData.email} 
            onChange={(e) => {
              handleInputChange('email', e.target.value);
              e.target.setCustomValidity('');
            }}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h5 className={styles.heading5}>Add your Date of Birth *</h5>
        <div className={styles.inputRow}>
          <input 
            type="date" 
            required 
            placeholder="Enter your date of birth" 
            className={styles.defaultInput} 
            value={formData.dateOfBirth} 
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h5 className={styles.heading5}>Add your phone number *</h5>
        <div className={styles.inputRow}>
          <input 
            type="number" 
            required 
            placeholder="Phone Number" 
            className={styles.defaultInput} 
            value={formData.phone}
            pattern="[0-9]*"
            inputMode="numeric"
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
        </div>
      </div>
    </>
  );
} 