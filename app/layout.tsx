import './globals.css';
import Navbar from './Navbar';
import Footer from './Footer';

export const metadata = {
  title: 'OphycialScecher | Photography',
  description: 'Experience the art of photography with OPhycial Lens Photography.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
