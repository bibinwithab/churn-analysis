# Customer Churn Prediction Web App

This is a full-stack machine learning project that predicts customer churn probability based on user inputs. It consists of a **React** frontend and a **FastAPI** backend.

## 🚀 Features
- Interactive web interface to input customer details
- FastAPI-powered backend serving a trained ML model
- Real-time prediction of customer churn probability
- Segment classification (Safe, Risky, High Churn Risk)
- Top 3 contributing factors influencing the churn decision

---

## 🧠 Machine Learning Model
- Dataset: [Customer Churn Dataset (Kaggle)](https://www.kaggle.com/datasets/muhammadshahidazeem/customer-churn-dataset)
- Model: Trained classifier (e.g., RandomForest)
- Preprocessing: Label encoding for categorical features, standard scaling for numeric values
- Artifacts:
  - churn_model.pkl
  - label_encoders.pkl
  - scaler.pkl
---

## 📁 Project Structure
```
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   └── ...
├── server/                   # FastAPI backend
│   ├── dataset/
│   │   └── customer_churn_dataset-training-master.csv
│   ├── models/
│   │   ├── churn_model.pkl
│   │   ├── label_encoders.pkl
│   │   └── scaler.pkl
│   ├── app.py                # FastAPI app
│   ├── main.py
│   └── requirements.txt
└── README.md
```

---

## 📦 Backend Setup (FastAPI)

1. Navigate to `server/`

```bash
cd server
```

2. Create and activate a virtual environment (optional but recommended):

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:

```bash
uvicorn app:app --reload
```

---

## 🌐 Frontend Setup (React + Vite + Tailwind CSS)

1. Navigate to `client/`

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## 🧪 API Usage

### POST `/predict-churn`
**Request Body (JSON):**
```json
{
  "Age": 30,
  "Gender": "Male",
  "Tenure": 24,
  "Usage_Frequency": 5,
  "Support_Calls": 1,
  "Payment_Delay": 0,
  "Subscription_Type": "Premium",
  "Contract_Length": "Annual",
  "Total_Spend": 500.75,
  "Last_Interaction": 10
}
```

**Response (JSON):**
```json
{
  "churn_probability": 68.23,
  "risk_message": "Customer shows signs of churn. Consider proactive engagement.",
  "top_3_reasons": ["Tenure", "Support Calls", "Payment Delay"]
}
```

---

## 📌 Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, scikit-learn, Pandas
- **Modeling**: Random Forest / Similar Classifier

---

## 📜 License
This project is for educational purposes.

---

## 🙌 Acknowledgements
Inspired by real-world customer churn analytics use-cases.

