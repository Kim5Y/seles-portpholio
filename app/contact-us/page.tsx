"use client";

import styles from './page.module.css';
import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <motion.div 
          className={styles.container}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.info}>
            <h1>Book A Session</h1>
            <p>Ready to capture your special moments? Get in touch with us to book a session and let's create something beautiful.</p>
            
            <div className={styles.btnGroup}>
              <a href="https://wa.me/2348167221715" target="_blank" rel="noopener noreferrer" className={styles.btn}>
                WhatsApp Us
              </a>
              <Link href="/booking" className={styles.btn}>
                Book Form
              </Link>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <Mail />
                <span>selepam87@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone />
                <span>+234 816 722 1715</span>
              </div>
            </div>

            <div className={styles.socials}>
              <Facebook className="cursor-pointer hover:text-white transition text-gray-400" />
              <Instagram className="cursor-pointer hover:text-white transition text-gray-400" />
              <Twitter className="cursor-pointer hover:text-white transition text-gray-400" />
              <Linkedin className="cursor-pointer hover:text-white transition text-gray-400" />
            </div>
          </div>
          
          <div className={styles.imageDiv}>
            <img src="/images/tnt5.jpg" alt="Contact Us" />
          </div>
        </motion.div>
      </section>

      <section className={styles.packages}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Photography Packages
        </motion.h2>
        
        <div className={styles.grid}>
          {[
            { title: "Solo Photoshoot", img: "ch3.jpg" },
            { title: "Couple Photoshoot", img: "hp14.jpg" },
            { title: "Wedding", img: "opswed3.jpg" },
            { title: "Fashion", img: "ng-inspo1.jpg" }
          ].map((pkg, idx) => (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <img src={`/images/${pkg.img}`} alt={pkg.title} />
              <div className={styles.cardInfo}>
                <h3>{pkg.title}</h3>
                <ul>
                  <li>2 hours coverage</li>
                  <li>Scenic view location</li>
                  <li>12 professionally edited photos</li>
                  <li>5 days delivery</li>
                </ul>
                <Link href="/booking">
                  <button className={styles.bookBtn}>Book Now</button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
