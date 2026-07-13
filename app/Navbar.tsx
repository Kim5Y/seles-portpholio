"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <div className={styles.navbarWrapper}>
      <motion.nav 
        className={styles.navbar}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/" className={styles.logo}>
          <span>OPhycial</span>
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/gallery">Gallery</Link></li>
          <li><Link href="/#portfolio">Portfolio</Link></li>
          <li><Link href="/#about">About Me</Link></li>
          <li><Link href="/contact-us" className={styles.contactBtn}>Contact Us</Link></li>
        </ul>
      </motion.nav>
    </div>
  );
}
