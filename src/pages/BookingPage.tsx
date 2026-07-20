'use client';
import { useState } from 'react';
import styles from './BookingPage.module.css';
import { motion } from 'framer-motion';

export default function BookingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleEmail = async () => {
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

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
            <input
              type="text"
              className={styles.input}
              placeholder="Full Name"
              value={name}
              onChange={(e) => { setName(e.target.value); if (status === 'error') setStatus('idle'); }}
              required
            />
            <input
              type="email"
              className={styles.input}
              placeholder="Email Address"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
              required
            />
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Write a short note..."
              rows={3}
              value={message}
              onChange={(e) => { setMessage(e.target.value); if (status === 'error') setStatus('idle'); }}
              required
            />

            {status === 'success' && (
              <p style={{ color: '#00964b', fontSize: '14px', margin: '0 0 8px' }}>
                ✅ Message sent successfully!
              </p>
            )}
            {status === 'error' && (
              <p style={{ color: '#e53935', fontSize: '14px', margin: '0 0 8px' }}>
                ❌ Please fill all fields and try again.
              </p>
            )}

            <div className={styles.dateWrapper}>
              <div className={styles.dateGroup}>
                <a
                  href="https://wa.me/2349132725617"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    backgroundColor: '#00964b',
                    color: 'white',
                    padding: '15px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '500',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleEmail}
                  disabled={status === 'sending'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    backgroundColor: status === 'sending' ? '#555' : '#1a73e8',
                    color: 'white',
                    padding: '15px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    width: '100%',
                    boxSizing: 'border-box',
                    fontSize: '1rem'
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>{status === 'sending' ? 'Sending...' : 'Email'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
