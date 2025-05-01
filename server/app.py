from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np

# Load model, scaler, encoders
with open("./models/churn_model.pkl", "rb") as f:
    model = pickle.load(f)

with open("./models/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("./models/label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

# Feature names
feature_names = [
    "Age", "Gender", "Tenure", "Usage Frequency", "Support Calls",
    "Payment Delay", "Subscription Type", "Contract Length",
    "Total Spend", "Last Interaction"
]

importance_dict = dict(zip(feature_names, model.feature_importances_))

# FastAPI setup
app = FastAPI(title="Customer Churn Prediction API")

#CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Input model
class CustomerData(BaseModel):
    Age: int
    Gender: str
    Tenure: int
    Usage_Frequency: int
    Support_Calls: int
    Payment_Delay: int
    Subscription_Type: str
    Contract_Length: str
    Total_Spend: float
    Last_Interaction: int

# API endpoint
@app.post("/predict-churn")
def predict_churn(data: CustomerData):
    input_dict = {
        "Age": data.Age,
        "Gender": data.Gender,
        "Tenure": data.Tenure,
        "Usage Frequency": data.Usage_Frequency,
        "Support Calls": data.Support_Calls,
        "Payment Delay": data.Payment_Delay,
        "Subscription Type": data.Subscription_Type,
        "Contract Length": data.Contract_Length,
        "Total Spend": data.Total_Spend,
        "Last Interaction": data.Last_Interaction
    }

    df = pd.DataFrame([input_dict])

    # Encode categorical features
    for col, le in label_encoders.items():
        df[col] = le.transform(df[col])

    # Scale
    scaled_input = scaler.transform(df)

    # Predict
    prob = model.predict_proba(scaled_input)[0][1]
    prob_rounded = float(round(prob*100, 2))

    # Segment and message
    if prob < 0.3:
        segment = "Safe"
        message = "Customer is loyal and unlikely to churn."
        return {
            "churn_probability": prob_rounded,
            "risk_message": message,
            "top_3_reasons": ""            
        }
    elif prob < 0.7:
        segment = "Risky"
        message = "Customer shows signs of churn. Consider proactive engagement."
    else:
        segment = "High Churn Risk"
        message = "Customer is very likely to churn. Immediate action recommended."

    # Top 3 contributing factors
    input_array = df.values[0]
    impact_scores = {
        feature: abs(val * importance_dict[feature])
        for feature, val in zip(feature_names, input_array)
    }
    top_3 = sorted(impact_scores.items(), key=lambda x: x[1], reverse=True)[:3]
    top_3_features = [f for f, _ in top_3]

    return {
        "churn_probability": prob_rounded,
        "risk_message": message,
        "top_3_reasons": top_3_features
    }
