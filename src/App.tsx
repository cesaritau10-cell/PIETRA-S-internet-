import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlanComparison from './components/PlanComparison';
import BillAnalyzer from './components/BillAnalyzer';
import LocalStores from './components/LocalStores';
import DreamSetup from './components/DreamSetup';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PlanComparison />
        <BillAnalyzer />
        <DreamSetup />
        <LocalStores />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
