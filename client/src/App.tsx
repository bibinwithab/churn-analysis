import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col bg-gray-50"
    >
      <Header />
      <main className="flex-grow">
        <Hero />
        <PredictionForm />
      </main>
    </motion.div>
  );
}

export default App;