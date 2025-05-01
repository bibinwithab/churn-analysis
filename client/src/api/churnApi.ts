import { CustomerData, PredictionResult } from '../types';

const API_URL = 'http://localhost:8000';

export const predictChurn = async (data: CustomerData): Promise<PredictionResult> => {
  try {
    const response = await fetch(`${API_URL}/predict-churn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to predict churn');
    }

    return await response.json();
  } catch (error) {
    console.error('Error predicting churn:', error);
    throw error;
  }
};