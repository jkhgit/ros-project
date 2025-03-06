// @ts-nocheck
import Image from "next/image";
import styles from "../page.module.css";
import NumberFlow from '@number-flow/react';

export default function TierSelector({
  billingState,
  tierState,
  currentPrice,
  onTierChange,
  onBillingChange,
  title
}) {
  return (
    <>
      <h1 className={styles.heading1}>{title}</h1>

      <div className={styles.toggleContainer}>
        <div className={styles.toggleButton}>
          <div className={styles.innerToggle}>
            <button 
              type="button" 
              className={`${styles.defaultButton} ${billingState === 'annual' ? styles.activeButton1 : ''}`} 
              onClick={() => onBillingChange('annual')}
            >
              Yearly -20%
            </button>
            <button 
              type="button" 
              className={`${styles.defaultButton} ${billingState === 'monthly' ? styles.activeButton2 : ''}`} 
              onClick={() => onBillingChange('monthly')}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className={styles.toggleTierContainer}> 
        <div className={styles.tabNav}>
          <button 
            type="button" 
            className={`${styles.tierButton} ${tierState === 'low' ? styles.tierActive : ''}`} 
            onClick={() => onTierChange('low')}
          >
            Low
          </button>
          <button 
            type="button" 
            className={`${styles.tierButton} ${tierState === 'middle' ? styles.tierActive : ''}`} 
            onClick={() => onTierChange('middle')}
          >
            Middle
          </button>
          <button 
            type="button" 
            className={`${styles.tierButton} ${tierState === 'high' ? styles.tierActive : ''}`} 
            onClick={() => onTierChange('high')}
          >
            High
          </button>
        </div>
      </div>

      <div className={styles.tierContainer}>
        {tierState === 'low' && (
          <button type="button" className={styles.tierCard}>
            <div className={styles.tierContent}>
              <h2 className={styles.tierHeader}>Low</h2>
              <ul className={styles.featureList}>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Lorem ipsum dolor sit amet</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Consectetur adipiscing elit</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Sed do eiusmod tempor</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Ut labore et dolore magna</li>
              </ul>
              <div className={styles.tierPrice}>
                <span className={styles.tierPriceValue}>$<NumberFlow value={currentPrice} /></span>
                <span className={styles.tierPriceDuration}>/{billingState === 'annual' ? 'year' : 'month'}</span>
              </div>
            </div>
          </button>
        )}
        {tierState === 'middle' && (
          <button type="button" className={styles.tierCard}>
            <div className={styles.tierContent}>
              <h2 className={styles.tierHeader}>Middle</h2>
              <ul className={styles.featureList}>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Duis aute irure dolor</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Excepteur sint occaecat</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Cupidatat non proident</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Sunt in culpa qui officia</li>
              </ul>
              <div className={styles.tierPrice}>
                <span className={styles.tierPriceValue}>$<NumberFlow value={currentPrice} /></span>
                <span className={styles.tierPriceDuration}>/{billingState === 'annual' ? 'year' : 'month'}</span>
              </div>
            </div>
          </button>
        )}
        {tierState === 'high' && (
          <button type="button" className={styles.tierCard}>
            <div className={styles.tierContent}>
              <h2 className={styles.tierHeader}>High</h2>
              <ul className={styles.featureList}>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Nulla pariatur cillum</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Mollit anim id est laborum</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Quis nostrud exercitation</li>
                <li><Image src="/check.svg" alt="checkmark" width={16} height={16} className={styles.checkmark} /> Velit esse dolore eu fugiat</li>
              </ul>
              <div className={styles.tierPrice}>
                <span className={styles.tierPriceValue}>$<NumberFlow value={currentPrice} /></span>
                <span className={styles.tierPriceDuration}>/{billingState === 'annual' ? 'year' : 'month'}</span>
              </div>
            </div>
          </button>
        )}
      </div>
    </>
  );
} 