"use client";

import styles from './page.module.css';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.footerWrapper}>
        
        <motion.div 
          className={styles.footerAbout}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <img src="/images/tnt5.jpg" alt="About Me" />
          <div className={styles.footerAboutInfo}>
            <h1>About Me</h1>
            <p>Welcome to my world of photography! My name is Sele, Im a passionate photographer originally from Nigeria. With a keen eye for detail and a love for capturing life’s most precious moments, I am specialize in wedding, portrait, and fashion photography.</p>
            <p>I am dedicated to capturing your unique story with creativity and professionalism. Let’s create beautiful memories together, one snapshot at a time!</p>
          </div>
        </motion.div>

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
          <Twitter style={{ cursor: 'pointer', transition: 'color 0.3s' }} color="#aaa" />
          <Facebook style={{ cursor: 'pointer', transition: 'color 0.3s' }} color="#aaa" />
          <Instagram style={{ cursor: 'pointer', transition: 'color 0.3s' }} color="#aaa" />
          <Mail style={{ cursor: 'pointer', transition: 'color 0.3s' }} color="#aaa" />
        </div>

        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} OPhycial Lens Photography. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
