import { useState } from 'react';
import styles from './Navbar.module.css';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.navbarWrapper}>
      <motion.nav
        className={styles.navbar}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a href="#home" className={styles.logo} onClick={() => setIsOpen(false)}>
          <img src="/images/icons/mylogo-white.png" alt="OPhycial Logo" />
          <span>OPhycial World</span>
        </a>

        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li><a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a></li>
          <li><a href="#home" onClick={() => { setIsOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>About Me</a></li>
          <li><a href="#contact" className={styles.contactBtn} onClick={() => setIsOpen(false)}>Contact Us</a></li>
        </ul>
      </motion.nav>
    </div>
  );
}
