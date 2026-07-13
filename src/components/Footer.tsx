import styles from './Footer.module.css';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ showAbout = true }: { showAbout?: boolean }) {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.footerWrapper}>

        {showAbout && (
          <motion.div
            className={styles.footerAbout}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="/images/tnt5.jpg" alt="About Me" />
            <div className={styles.footerAboutInfo}>
              <h1>About Me</h1>
              <p>Welcome to my world of photography! My name is Sele, I'm a passionate photographer originally from Nigeria. With a keen eye for detail and a love for capturing life's most precious moments, I specialize in wedding, portrait, and fashion photography.</p>
              <p>I am dedicated to capturing your unique story with creativity and professionalism. Let's create beautiful memories together, one snapshot at a time!</p>
            </div>
          </motion.div>
        )}

        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <h3>Indoors Services</h3>
            <p>Monday-Friday 8:00 AM to 5:00 PM</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Outdoors Services</h3>
            <p>Monday-Friday 8:00 AM to 6:00 PM</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Our Address</h3>
            <p>Tudun Wada opposite mountains green junction.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Get in Touch</h3>
            <p><a href="tel:+2349132725617">Call Us: +234 913 272 5617</a></p>
            <p><a href="mailto:ophycialworld@gmail.com">Email Us</a></p>
          </div>
        </div>

        <div className={styles.footerSocials}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="/images/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} OPhycial Lens Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
