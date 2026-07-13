import styles from './GalleryPage.module.css';
import { motion } from 'framer-motion';

const images = [
  { src: 'opswed3.jpg', title: 'Wedding Bliss' },
  { src: 'ela2.jpg', title: 'Portrait Perfection' },
  { src: 'bz6.jpg', title: 'Commercial Excellence' },
  { src: 'cindi2.jpg', title: 'Nature Beauty' },
  { src: 'IMG_1460.jpg', title: 'Event Highlights' },
  { src: 'hp14.jpg', title: 'Family Moments' },
  { src: 'ng-inspo1.jpg', title: 'Fashion Forward' },
  { src: 'bbops.jpg', title: 'Travel Diaries' },
  { src: 'bls3.jpg', title: 'Culinary Creations' },
  { src: 'tnt5.jpg', title: 'Creative Angles' },
  { src: 'ch3.jpg', title: 'Solo Session' },
  { src: 'opswed2.jpg', title: 'Moments Captured' }
];

export default function GalleryPage() {
  return (
    <main className={styles.main}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Our Gallery</h1>
        <p>A collection of our finest captured moments</p>
      </motion.div>

      <div className={styles.grid}>
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            className={styles.imageCard}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.1 }}
          >
            <img src={`/images/${img.src}`} alt={img.title} />
            <div className={styles.overlay}>
              <p>{img.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
