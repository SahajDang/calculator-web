# 🧮 Calculator Web Application

A web-based calculator with a React frontend and a Flask backend. The calculator supports arithmetic expressions, parentheses, and variable assignments with a custom parser and evaluator.

---

## 🚀 Live Demo

- 🔗 **Frontend:** [https://calculator-frontend-g1d5.onrender.com](https://calculator-frontend-g1d5.onrender.com)
- 🛠️ **Backend API:** [https://calculator-backend-mof7.onrender.com/evaluate](https://calculator-backend-mof7.onrender.com/evaluate)

---

## ✨ Features

- Evaluate complex mathematical expressions including `+`, `-`, `*`, `/`, and parentheses
- Support for variables with assignment, e.g. `x = 5`, `y = x + 3`
- Real-time evaluation via a REST API
- Clean and modern UI built with React
- Backend implemented in Flask with custom tokenizer, parser, and evaluator
- CORS enabled for seamless frontend-backend communication

---

## 🧰 Tech Stack

- **Frontend:** React (Vite), CSS
- **Backend:** Python, Flask, Flask-CORS
- **Deployment:** Render (Frontend + Backend)
- **Communication:** REST API (JSON)

---

## 📁 Folder Structure

calculator-web/
├── backend/
│ └── app.py # Flask backend API
├── frontend/
│ ├── src/
│ │ └── App.jsx # Main React component
│ ├── public/
│ └── package.json # React project config
└── README.md


---

## ⚙️ Getting Started

### 🔙 Backend Setup

```
cd backend
python -m venv venv
```
##### Activate:
Windows:
```
venv\Scripts\activate
```
macOS/Linux:
```
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### 🔜 Frontend Setup
```
cd frontend
npm install
npm run dev
```
---
## 💻 Usage
- Enter mathematical expressions or assignments in the input field.

- Click Evaluate or press Enter to get the result.

- Use the buttons for digits, operators, parentheses, and controls (Clear, Delete).

- Results or error messages will appear below the input.

---

## 🔌 API Endpoint
POST /evaluate
- Request (JSON):
```
{
  "expression": "3 + 4 * (2 - 1)"
}
```
- Response (Success):
```
{
  "result": 7
}
```
- Response (Error):
```
{
  "error": "Error message here"
}
```

## 📸 Screenshots
<img width="484" height="859" alt="image" src="https://github.com/user-attachments/assets/d646b4c1-0668-4b98-bd50-75f809d1999c" />
<img width="477" height="872" alt="image" src="https://github.com/user-attachments/assets/0872022d-e69b-4bab-acc8-c89633abe547" />

---

## 🪪 License

This project is open-source and free to use under the MIT License.

---

## 👨‍💻 Author 
 
Sahaj Dang

🔗 [GitHub @SahajDang](https://github.com/SahajDang)

---

<div align="center">Built with ❤️ using React & Flask</div>

