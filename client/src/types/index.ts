export interface CustomerData {
  Age: number;
  Gender: string;
  Tenure: number;
  Usage_Frequency: number;
  Support_Calls: number;
  Payment_Delay: number;
  Subscription_Type: string;
  Contract_Length: string;
  Total_Spend: number;
  Last_Interaction: number;
}

export interface PredictionResult {
  churn_probability: number;
  risk_message: string;
  top_3_reasons: string[];
}