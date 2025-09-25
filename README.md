# Knowledge Base

**Knowledge Base** – a collaborative platform designed to help users create, manage, and share information efficiently. It allows user registration, secure login, and full CRUD functionality for managing knowledge entries. Built with a **Flask backend** and a **React frontend**, this project showcases seamless integration between a Python API and a modern JavaScript interface.

By James Ivan, Martin muthaura, Susan wanjiru, Edwin mwaniki, Caleb muindi

---

## User Stories

- As a **new user**, I want to register an account so I can access the knowledge base.
- As a **registered user**, I want to log in securely so that my information is protected.
- As a **user**, I want to **create, view, edit, and delete** knowledge entries so I can manage information effectively.
- As a **system admin**, I want to view all users and their contributions so I can monitor platform usage.
- As a **user**, I want to see all my contributions over time so I can track what I’ve added.

---

## Data Entity Structure

**Users** → `{ id, name, email, password_hash, created_at }`  
**Entries** → `{ id, user_id, title, content, created_at, updated_at }`  
**Sessions / Tokens** → `{ id, user_id, token, expires_at }`

---

## Features

###  Main Sections

- User Authentication  
- Knowledge Entries CRUD  
- Admin Dashboard  
- Profile & Activity Tracking  
- Search and Filter Functionality  

---

###  User Management

- Register a new user  
- Secure login with password hashing  
- JWT-based authentication  
- Logout functionality  

---

### Knowledge Entries

- Create new knowledge entries  
- Edit and update existing entries  
- Delete entries  
- View all entries or filter by user/date  

---

###  Admin Section

- View all users and their contributions  
- Monitor platform usage  
- View total entries, active users, and more

---

## Extra Features

- Full **form validation** on frontend and backend  
- Input validation for title, content, and user details  
- Protected routes using JWT  
- Responsive UI built with React  
- RESTful API architecture  

---

## System Requirements

- Python 3.8+  
- Node.js 18+  
- npm or yarn  
- Git  
- VS Code or any modern code editor  

---

## How to Use

This is a **Flask + React** web application. You can run the backend server locally and access the frontend from your browser.

The live app allows you to:

- Register and log in as a user  
- Browse knowledge entries  
- Create, update, and delete information  
- Access admin insights (if authorized)  

---

## Local Development

To run the project locally, you will need:

- Python & pipenv installed  
- Node.js installed  
- Basic understanding of Flask and React  
- Command line / Terminal access

---

  # Installation Process
1. Clone the Repository
git clone git@github.com:FrostyJames/knowledge-base.git
cd knowledge-base

2.  Set Up the Backend (Flask)

3.  Create and activate a virtual environment, then install the dependencies:

  - pipenv install
  - pipenv shell
  - pipenv install -r requirements.txt


4. Set environment variables and run the server:

export FLASK_APP=app.py
export FLASK_ENV=development
flask run


The backend will start at:
 http://localhost:5000


Related Repositories
Frontend Repo: Knowledge Base Frontend (if split)

Backend Repo: Knowledge Base API (if split)

Live App: Deployed Version (if available)

Backend API
Authentication Routes:

POST /signup – Register a new user

POST /login – Log in and receive token

POST /logout – Log out user

Entries Routes:

GET /entries – View all entries

POST /entries – Create new entry

PATCH /entries/<id> – Update entry

DELETE /entries/<id> – Delete entry

Support & Contact Details
If you have questions, suggestions, or need support, please reach out:

 Email: james.ivan@student.moringaschool.com

 Email: Martin.muthaura@student.moringaschool.com

 Email: edwin.mwaniki@student.moringaschool.com

 Email: susan.wanjiru1@student.moringaschool.com

 Email: Caleb.muindi@student.moringaschool.com

License
MIT License

Copyright © 2025 Knowledge Base — James Ivan & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

