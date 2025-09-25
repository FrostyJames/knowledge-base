# knowledge-base
 Full-stack internal documentation platform for storing articles, procedures, and videos.
A collaborative knowledge-base web application built with **Flask** (backend) and **React** (frontend).  
This project allows users to manage accounts, create, read, update, and delete entries, and interact with a shared knowledge repository.

---

## **Features**

- User registration and login with secure authentication
- Create, read, update, and delete (CRUD) knowledge entries
- Form validation on frontend and backend
- Role-based access (optional)
- Responsive React frontend with modern UI
- RESTful API with Flask backend


## **Tech Stack**

- **Backend:** Flask, SQLAlchemy, Flask-Migrate
- **Frontend:** React, Fetch API
- **Database:** SQLite (default, can be switched to PostgreSQL)
- **Authentication:** Flask sessions / JWT (depending on implementation)

### How to start and run the application

### **1. Clone the repository**
```bash
git clone 

 Set up the Flask backend
bash
Copy code

python3 -m venv venv
source venv/bin/activate on LINUX 
 venv\Scripts\activate    on Windows

 Install dependencies
pip install -r requirements.txt

 Set environment variables
export FLASK_APP=app.py
export FLASK_ENV=development

 Run the backend
flask run


 Set up the React frontend
npm install
npm start
Your React app should run at http://localhost:3000 and connect to Flask backend at http://localhost:5000.

Usage
Navigate to the frontend in your browser.

Register a new account or log in.

Use the forms to create, view, update, or delete knowledge entries.

All forms are validated both on frontend and backend.

Folder Structure
bash
Copy code
knowledge-base/
├─ app.py                
├─ requirements.txt      
├─ client/               
│   ├─ src/
│   │   ├─ components/   
│   │   └─ App.js
└─ backend/               

