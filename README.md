# 🧮 Calculator Web Application

A web-based calculator with a React frontend and a Flask backend. The calculator supports arithmetic expressions, parentheses, and variable assignments with a custom parser and evaluator.

---

## Features

- Evaluate complex mathematical expressions including `+`, `-`, `*`, `/`, and parentheses.
- Support for variables with assignment, e.g. `x = 5`, `y = x + 3`.
- Real-time evaluation via a REST API.
- Clean and modern UI built with React.
- Backend implemented in Flask with custom tokenizer, parser, and evaluator.
- CORS enabled for frontend-backend communication.

---

## Tech Stack

- **Frontend:** React (with hooks), CSS for styling
- **Backend:** Python, Flask, Flask-CORS
- **Communication:** REST API (JSON)

---

## Folder Structure
calculator-web/
├── backend/
│ └── app.py # Flask backend API
├── frontend/
│ ├── src/
│ │ └── App.jsx # React main component
│ ├── public/
│ └── package.json # React project config
└── README.md

---

## Getting Started

### Prerequisites

- Python 3.x
- Node.js and npm/yarn

---

## Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```
2. Create and activate a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip install flask flask-cors
```
4. Run the Flask app:
```bash
python app.py

```
## Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
# or
yarn install
```
3. Start the React app:
```bash
npm start
# or
yarn start
```
--- 

## Usage
- Enter mathematical expressions or assignments in the input field.

- Click Evaluate or press Enter to get the result.

- Use the buttons for digits, operators, parentheses, and controls (Clear, Delete).

- Results or error messages will appear below the input.

---

## API Endpoint
#### POST /evaluate
- Request JSON:
```bash
{
  "expression": "3 + 4 * (2 - 1)"
}
```
- Response JSON (success):
```bash
{
  "result": 7
}
```
- Response JSON (error):
```bash
{
  "error": "Error message here"
}
```
---

## Screenshots
![image](https://github.com/user-attachments/assets/6370e6b7-8ff5-4495-b81b-2ab7ddcd3154)

---

## License
This project is open-source and free to use.

---

## Author
Sahaj Dang
- https://github.com/SahajDang
