// src/App.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import './App.css';
import heroImage from './images/hero.jpg';
import galleryImage1 from './images/gallery1.jpg';
import galleryImage2 from './images/gallery2.jpg';
import galleryImage3 from './images/gallery3.jpg';

const stripePromise = loadStripe('your-stripe-public-key');

const Hero = () => (
  <section
    className="hero-section"
    style={{ backgroundImage: `url(${heroImage})` }}
  >
    <motion.h1
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="hero-title"
    >
      Gaura Purnima 2025
    </motion.h1>
    <p className="hero-subtitle">
      Join us in celebrating the divine appearance of Lord Chaitanya on March
      25, 2025!
    </p>
  </section>
);

const AboutSection = () => (
  <section className="about-section">
    <h2 className="section-title">About Gaura Purnima</h2>
    <p className="section-content">
      Gaura Purnima is a significant festival in the Vaishnava tradition,
      commemorating the birth of Sri Chaitanya Mahaprabhu, the founder of
      Gaudiya Vaishnavism. The term "Gaura Purnima" translates to "Golden Full
      Moon," symbolizing both the appearance of Lord Chaitanya during a full
      moon and the radiant grace he bestows upon his followers.
    </p>
    <p className="section-content">
      Devotees observe Gaura Purnima with various devotional activities,
      including fasting, congregational chanting, scriptural readings, and
      special ceremonies. The festival fosters unity and devotion among
      participants worldwide.
    </p>
  </section>
);

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const eventDate = new Date('March 25, 2025 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(
          `${days}d ${hours}h ${minutes}m ${seconds}s`
        );
      } else {
        setTimeLeft('The event has started!');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="countdown">Event Starts In: {timeLeft}</div>;
};

const Gallery = () => (
  <section className="gallery-section">
    <h2 className="section-title">Gallery</h2>
    <div className="gallery">
      <img src={galleryImage1} alt="Celebration 1" className="gallery-image" />
      <img src={galleryImage2} alt="Celebration 2" className="gallery-image" />
      <img src={galleryImage3} alt="Celebration 3" className="gallery-image" />
    </div>
  </section>
);

const DonateForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setMessage('Processing donation...');
    setTimeout(() => setMessage('Donation Successful! Thank You!'), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="donate-form">
      <CardElement className="card-input" />
      <button type="submit" className="donate-button">Donate Now</button>
      <p className="donate-message">{message}</p>
    </form>
  );
};

const DonateSection = () => (
  <section className="donate-section">
    <h2 className="section-title">Support the Celebration</h2>
    <p className="section-subtitle">Your donations help make this festival grand!</p>
    <Elements stripe={stripePromise}><DonateForm /></Elements>
  </section>
);

const App = () => (
  <div>
    <Hero />
    <AboutSection />
    <Countdown />
    <Gallery />
    <DonateSection />
  </div>
);

export default App;
