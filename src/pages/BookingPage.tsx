import styles from './BookingPage.module.css';
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
        <h1 className={styles.mobileTitle}>Book Now</h1>
        <div className={styles.infoDiv}>
          <div className={styles.logoDiv}>
            <h1 className={styles.desktopTitle}>Book Now</h1>
            <img src="/images/icons/mylogo.png" alt="OPhycial Logo" />
          </div>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input type="text" className={styles.input} placeholder="Full Name" required />
            <input type="email" className={styles.input} placeholder="Email Address" required />
            <textarea className={`${styles.input} ${styles.textarea}`} placeholder="Write a short note..." rows={3} required></textarea>
            <div className={styles.dateWrapper}>
              <label>Select a Date</label>
              <div className={styles.dateGroup}>
                <input type="date" className={styles.input} required />
                <button type="submit" className={styles.submitBtn}>Book Now</button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
