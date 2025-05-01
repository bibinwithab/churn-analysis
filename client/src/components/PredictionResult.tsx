import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { PredictionResult as PredictionResultType } from '../types';

interface PredictionResultProps {
  result: PredictionResultType;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ result }) => {
  const { churn_probability, risk_message, top_3_reasons } = result;
  
  // Determine risk level
  const getRiskLevel = (probability: number) => {
    if (probability < 30) return 'low';
    if (probability < 70) return 'medium';
    return 'high';
  };
  
  const riskLevel = getRiskLevel(churn_probability);
  
  const riskColors = {
    low: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      gauge: 'bg-green-500'
    },
    medium: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
      gauge: 'bg-amber-500'
    },
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-700',
      icon: <XCircle className="h-8 w-8 text-red-500" />,
      gauge: 'bg-red-500'
    }
  };
  
  const colors = riskColors[riskLevel];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`${colors.bg} p-6 sm:p-8 rounded-xl shadow-sm ${colors.border} border`}
    >
      <div className="flex items-start mb-6">
        {colors.icon}
        <h3 className={`${colors.text} ml-3 text-xl font-semibold`}>
          Churn Risk Analysis
        </h3>
      </div>
      
      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-600">Churn Probability</span>
          <span className={`text-sm font-bold ${colors.text}`}>{churn_probability.toFixed(1)}%</span>
        </div>
        
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${churn_probability}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full ${colors.gauge} rounded-full`}
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-2">Risk Assessment</h4>
        <p className="text-gray-700">{risk_message}</p>
      </div>
      
      {top_3_reasons.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Top Contributing Factors</h4>
          <ul className="space-y-2">
            {top_3_reasons.map((reason, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                className="flex items-center"
              >
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-700">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
      
      <motion.div 
        className="mt-8 p-4 bg-white rounded-lg border border-gray-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h4 className="text-sm font-medium text-gray-800 mb-2">Recommendation</h4>
        <p className="text-sm text-gray-600">
          {riskLevel === 'low' 
            ? 'Customer appears satisfied. Consider loyalty rewards to maintain relationship.'
            : riskLevel === 'medium'
            ? 'Proactive intervention recommended. Reach out to address potential concerns.'
            : 'Immediate action required. Offer special retention package and address concerns.'}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PredictionResult;