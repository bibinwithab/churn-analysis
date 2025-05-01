import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

import pickle

# Load dataset
df = pd.read_csv("./dataset/customer_churn_dataset-training-master.csv")

# Drop CustomerID and handle missing values
df = df.drop(columns=["CustomerID"]).dropna()

# Encode categorical columns
label_encoders = {}
categorical_cols = ["Gender", "Subscription Type", "Contract Length"]
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Split into features and target
X = df.drop("Churn", axis=1)
y = df["Churn"]

# Scale numeric features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
cm = confusion_matrix(y_test, y_pred)
print(f"Confusion Matrix: {cm}")
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))

with open('./models/churn_model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open("./models/scaler.pkl", 'wb') as f:
    pickle.dump(scaler, f)

with open('./models/label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)

# Feature importance for explanation
feature_names = X.columns
feature_importances = model.feature_importances_
importance_dict = dict(zip(feature_names, feature_importances))

# Prediction function
def predict_churn_risk(input_data: dict):
    """
    Predict churn probability, risk segment, and top 3 contributing features.
    """
    # Create DataFrame for input
    input_df = pd.DataFrame([input_data])

    # Encode categoricals
    for col, le in label_encoders.items():
        input_df[col] = le.transform(input_df[col])

    # Scale features
    input_scaled = scaler.transform(input_df)

    # Predict probability
    prob_churn = model.predict_proba(input_scaled)[0][1]

    # Risk classification
    if prob_churn < 0.3:
        risk = "Safe"
    elif prob_churn < 0.7:
        risk = "Risky"
    else:
        risk = "High Churn Risk"

    # Top 3 influencing features
    input_array = input_df.values[0]
    weighted_impact = {
        feature: abs(val * importance_dict[feature])
        for feature, val in zip(feature_names, input_array)
    }
    top_3_reasons = sorted(weighted_impact.items(), key=lambda x: x[1], reverse=True)[:3]

    return {
        "churn_probability": float(round(prob_churn*100, 2)),
        "risk_segment": risk,
        "top_3_reasons": [reason for reason, _ in top_3_reasons]
    }

# Example usage
if __name__ == "__main__":
    sample_input = {
    "Age": 29,
    "Gender": "Male",
    "Tenure": 48,                     
    "Usage Frequency": 12,            
    "Support Calls": 1,               
    "Payment Delay": 0,               
    "Subscription Type": "Premium",   
    "Contract Length": "Annual",      
    "Total Spend": 1000.0,            
    "Last Interaction": 1             
}


    result = predict_churn_risk(sample_input)
    print("\nPrediction Result:")
    print(result)
