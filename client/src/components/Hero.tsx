import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  LineChart 
} from 'lucide-react';

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const benefits = [
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-600" />,
      title: "Increased Retention",
      description: "Identify at-risk customers before they leave, allowing for targeted intervention strategies."
    },
    {
      icon: <Users className="h-6 w-6 text-teal-600" />,
      title: "Customer Insights",
      description: "Understand the key factors driving customer churn to improve your product and service."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-orange-600" />,
      title: "Revenue Protection",
      description: "Prevent revenue loss by reducing customer churn with data-driven retention approaches."
    },
    {
      icon: <LineChart className="h-6 w-6 text-purple-600" />,
      title: "Predictive Analytics",
      description: "Leverage ML models to anticipate future churn patterns and take preemptive action."
    }
  ];

  return (
    <section id="overview" className="py-16 px-6 sm:px-10 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Customer Churn Analysis Matters
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding and predicting customer churn is crucial for sustainable business growth. 
            Our advanced analytics tool helps you identify at-risk customers before they leave.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 bg-blue-600 text-white p-8 md:p-12 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">5-25% of Customers Churn Annually</h2>
            <p className="text-lg opacity-90 mb-8">
              The average business loses 10-25% of its customers each year. 
              Reducing churn by just 5% can increase profits by 25-95%, according to research.
            </p>
            <motion.a
              href="#prediction"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Try Our Predictor
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;