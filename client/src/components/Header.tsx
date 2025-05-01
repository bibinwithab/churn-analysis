import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm py-4 px-6 sm:px-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-blue-600 h-6 w-6" />
          <span className="text-xl font-semibold text-gray-800">ChurnInsight</span>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#overview" className="text-gray-600 hover:text-blue-600 transition-colors">Overview</a></li>
            <li><a href="#prediction" className="text-gray-600 hover:text-blue-600 transition-colors">Prediction</a></li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;