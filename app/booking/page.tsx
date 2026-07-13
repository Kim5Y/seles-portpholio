"use client";

import styles from './page.module.css';
import { motion } from 'framer-motion';

export default function BookingPage() {
  return (
    <main className={styles.main}>
      <motion.div 
        className={styles.wrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Book Now</h1>
        <div className={styles.infoDiv}>
          <div className={styles.logoDiv}>
            <img src="/images/icons/mylogo.png" alt="OPhycial Logo" />
          </div>
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.input} placeholder="First Name" required />
            </div>
            <div className={styles.inputGroup}>
              <input type="text" className={styles.input} placeholder="Last Name" required />
            </div>
            <div className={styles.inputGroup}>
              <input type="email" className={styles.input} placeholder="Email Address" required />
            </div>
            <div className={styles.dateGroup}>
              <input type="date" className={styles.input} required />
              <button type="submit" className={styles.submitBtn}>Book Now</button>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
