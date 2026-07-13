import styles from './HomePage.module.css';
import { motion } from 'framer-motion';
import { Camera, Clock, UserCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className={styles.intro}>
        <motion.div
          className={styles.introInfo}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Capturing Moments, Creating Memories</h2>
          <p>Experience the art of photography with OPhycial Lens Photography. From weddings to portraits, we capture your special moments with excellence.</p>
          <a href="#booking" className={styles.btnPrimary}>Book Now</a>
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.secondDiv}>
        <div className={styles.secondDivWrapper}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2>Why Choose Us</h2>
            <p>Ophycial Lens Photography offers a unique blend of creativity and professionalism. Our services are tailored to meet your specific needs, ensuring every moment is captured perfectly.</p>
          </motion.div>



          <div className={styles.features}>
            <motion.div className={styles.featureCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className={styles.featureHead}>
                <Camera size={32} />
                <h5>Professional Quality</h5>
              </div>
              <p>High-resolution images that capture every detail.</p>
            </motion.div>
            <motion.div className={styles.featureCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className={styles.featureHead}>
                <UserCheck size={32} />
                <h5>Personalized Service</h5>
              </div>
              <p>Customized Photography Packages to suit your event.</p>
            </motion.div>
            <motion.div className={styles.featureCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className={styles.featureHead}>
                <Clock size={32} />
                <h5>Quick Turnaround</h5>
              </div>
              <p>Fast and efficient delivery of edited photos.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className={styles.achievements}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Our Achievements</h2>
          <p>Ophycial Lens Photography has a track record of delivering exceptional results.</p>
        </motion.div>
        <div className={styles.statsGrid}>
          <motion.div className={styles.statCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className={styles.statNumber}>500+</div>
            <p>Completed Projects</p>
          </motion.div>
          <motion.div className={styles.statCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <div className={styles.statNumber}>300+</div>
            <p>Happy Clients</p>
          </motion.div>
          <motion.div className={styles.statCard} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className={styles.statNumber}>10</div>
            <p>Years of Experience</p>
          </motion.div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className={styles.portfolio} id="portfolio">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2>Our Portfolio</h2>
          <p>Explore our gallery to see the diverse range of photography styles and events we've captured.</p>
        </motion.div>
        <motion.div
          className={styles.galleryScroll}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { src: 'opswed3.jpg', title: 'Wedding Bliss' },
            { src: 'ela2.jpg', title: 'Portrait Perfection' },
            { src: 'bz6.jpg', title: 'Commercial Excellence' },
            { src: 'cindi2.jpg', title: 'Nature Beauty' },
            { src: 'IMG_1460.jpg', title: 'Event Highlights' },
            { src: 'hp14.jpg', title: 'Family Moments' },
            { src: 'ng-inspo1.jpg', title: 'Fashion Forward' },
            { src: 'bbops.jpg', title: 'Travel Diaries' },
            { src: 'bls3.jpg', title: 'Culinary Creations' }
          ].map((item, i) => (
            <div key={i} className={styles.galleryItem}>
              <img src={`/images/${item.src}`} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
