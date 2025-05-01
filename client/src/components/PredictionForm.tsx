import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { predictChurn } from '../api/churnApi';
import { CustomerData, PredictionResult } from '../types';
import FormField from './FormField';
import PredictionOutput from './PredictionResult';

const defaultFormData: CustomerData = {
  Age: 30,
  Gender: 'Male',
  Tenure: 12,
  Usage_Frequency: 15,
  Support_Calls: 2,
  Payment_Delay: 0,
  Subscription_Type: 'Premium',
  Contract_Length: 'Annual',
  Total_Spend: 500,
  Last_Interaction: 7
};

const genderOptions = ['Male', 'Female'];
const subscriptionOptions = ['Basic', 'Standard', 'Premium'];
const contractOptions = ['Monthly', 'Quarterly', 'Annual'];

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<CustomerData>(defaultFormData);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CustomerData, value: string | number) => {
    setFormData({
      ...formData,
      [field]: typeof defaultFormData[field] === 'number' ? Number(value) : value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const result = await predictChurn(formData);
      setPredictionResult(result);
    
    } catch (err) {
      setError('Failed to predict churn. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="prediction" className="py-16 px-6 sm:px-10 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Churn Prediction Tool</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter customer data below to predict the likelihood of churn and identify key contributing factors.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Data</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField
                  label="Age"
                  type="number"
                  value={formData.Age}
                  onChange={(e) => handleInputChange('Age', e.target.value)}
                  min={18}
                  max={100}
                  required
                />
                
                <FormField
                  label="Gender"
                  type="select"
                  value={formData.Gender}
                  onChange={(e) => handleInputChange('Gender', e.target.value)}
                  options={genderOptions}
                  required
                />
                
                <FormField
                  label="Tenure (months)"
                  type="number"
                  value={formData.Tenure}
                  onChange={(e) => handleInputChange('Tenure', e.target.value)}
                  min={0}
                  required
                />
                
                <FormField
                  label="Usage Frequency"
                  type="number"
                  value={formData.Usage_Frequency}
                  onChange={(e) => handleInputChange('Usage_Frequency', e.target.value)}
                  min={0}
                  required
                />
                
                <FormField
                  label="Support Calls"
                  type="number"
                  value={formData.Support_Calls}
                  onChange={(e) => handleInputChange('Support_Calls', e.target.value)}
                  min={0}
                  required
                />
                
                <FormField
                  label="Payment Delays"
                  type="number"
                  value={formData.Payment_Delay}
                  onChange={(e) => handleInputChange('Payment_Delay', e.target.value)}
                  min={0}
                  required
                />
                
                <FormField
                  label="Subscription Type"
                  type="select"
                  value={formData.Subscription_Type}
                  onChange={(e) => handleInputChange('Subscription_Type', e.target.value)}
                  options={subscriptionOptions}
                  required
                />
                
                <FormField
                  label="Contract Length"
                  type="select"
                  value={formData.Contract_Length}
                  onChange={(e) => handleInputChange('Contract_Length', e.target.value)}
                  options={contractOptions}
                  required
                />
                
                <FormField
                  label="Total Spend ($)"
                  type="number"
                  value={formData.Total_Spend}
                  onChange={(e) => handleInputChange('Total_Spend', e.target.value)}
                  min={0}
                  step="0.01"
                  required
                />
                
                <FormField
                  label="Days Since Last Interaction"
                  type="number"
                  value={formData.Last_Interaction}
                  onChange={(e) => handleInputChange('Last_Interaction', e.target.value)}
                  min={0}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Predict Churn Risk'}
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {predictionResult ? (
              <PredictionOutput result={predictionResult} />
            ) : (
              <div className="bg-blue-50 p-6 sm:p-8 rounded-xl h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Prediction Results</h3>
                  <p className="text-gray-600">
                    Fill out the form and submit to see churn prediction results here.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;