import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Visualization } from '../components/Visualization';
import { NewsSection } from '../components/NewsSection';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Visualization />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
};
