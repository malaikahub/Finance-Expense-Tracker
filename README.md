# Finance-Expense-Tracker

A modern Finance Expense Tracker web application built with React (frontend) and Node.js / Express (backend), connected to a PostgreSQL database hosted on Neon. It allows users to track income, expenses, goals, and manage their financial activities efficiently.

📁 Project Structure

           Finance-Expense-Tracker/
                ├─ backend/          # Node.js + Express backend
                ├─ frontend/         # React frontend (Vite)
                ├─ README.md

🛠️ Backend

The backend is built using Node.js and Express, and serves REST APIs for managing transactions, goals, and user profiles.

Features:

Transactions API: Add, edit, delete, and fetch transactions

Fields: id, user_id, type (Income/Expense), category, amount, description, date

Goals API: Track financial goals with progress

Fields: id, user_id, title, target_amount, current_amount, due_date, status

User Profile API: Fetch and update user profile (name, email, profile picture)

Real-time Updates: WebSocket (socket.io) used to automatically update the dashboard when new transactions are added.

Database: PostgreSQL hosted on Neon

Tables:

users – stores user details

transactions – tracks income and expenses

goals – tracks financial goals

Backend Database Schema

Users Table

                CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(100),
                profile_pic TEXT
             );


Transactions Table

                CREATE TABLE transactions (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                type VARCHAR(50) NOT NULL,
                category VARCHAR(50),
                amount NUMERIC(12,2) NOT NULL,
                description TEXT,
                date TIMESTAMP DEFAULT NOW()
              );


Goals Table

                CREATE TABLE goals (
                id SERIAL PRIMARY KEY,
                user_id INT REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(100) NOT NULL,
                target_amount NUMERIC(12,2) NOT NULL,
                current_amount NUMERIC(12,2) DEFAULT 0,
                due_date DATE,
                status VARCHAR(20) DEFAULT 'ongoing'
               );

⚛️ Frontend

The frontend is built with React using Vite and styled with CSS. It includes dynamic components and visualizations using:

Recharts – for Pie and Line charts

CountUp.js – animated number counters

Framer Motion – for smooth UI animations

Key Pages / Components

Dashboard:

Summary cards: Total Balance, Monthly Income, Total Expense

<img width="755" height="242" alt="image" src="https://github.com/user-attachments/assets/206a3663-7833-4ce9-8690-9fdbbdbda69f" />

Charts: Income vs Expense Line Chart, Spending Insights Pie Chart

<img width="743" height="347" alt="image" src="https://github.com/user-attachments/assets/f7e10ade-57dd-4291-84da-65fa6f7490b4" />

Cards section: Manage Cash, Bank, Wallet balances

<img width="739" height="311" alt="image" src="https://github.com/user-attachments/assets/1ae084fe-a85b-4bc7-8f26-e990157a2daa" />

Transactions:

Table to view all transactions

<img width="993" height="522" alt="image" src="https://github.com/user-attachments/assets/b205a3ce-e306-42ec-8cbd-0c7668002632" />

Add new transactions dynamically

Edit and reset forms

Goals:

Track financial goals progress

<img width="1600" height="770" alt="image" src="https://github.com/user-attachments/assets/3107ac77-86e8-451d-81e7-47d64a40cce5" />

Add / Edit / Delete goals

Pie charts showing goal completion

Profile:

Update name, email, and profile picture

<img width="512" height="648" alt="image" src="https://github.com/user-attachments/assets/e6373355-78e4-4c14-bca0-b511c359036d" />

Secure login section with visual cues

<img width="285" height="247" alt="image" src="https://github.com/user-attachments/assets/ae1a0557-625e-4053-b0d6-773c00fe0a63" />

<img width="280" height="290" alt="image" src="https://github.com/user-attachments/assets/0abab411-3888-4305-a4e4-b52fddc256ad" />

Reports

Export transactions to Excel and PDF

<img width="345" height="111" alt="image" src="https://github.com/user-attachments/assets/a10e140b-5ef8-417f-9467-89e6cdda797c" />

Visualize goals progress

<img width="1597" height="471" alt="image" src="https://github.com/user-attachments/assets/d833b0a2-ab7f-4f93-b278-826fede8a7ec" />

💻 Features

User Authentication (Frontend auth flow)

Dynamic Dashboard with real-time data updates

CRUD operations for transactions and goals

Financial analytics through charts

Export options for reports

Profile management with image upload

⚡ Installation

                  Backend
                  cd backend
                  npm install
                  # Add .env file with PostgreSQL connection
                  npm run dev

                  Frontend
                  cd frontend
                  npm install
                  npm run dev
                  # Open http://localhost:5173 (Vite) in your browser

📦 Dependencies

Backend: express, pg (PostgreSQL client), cors, dotenv, socket.io

Frontend: react, react-dom, react-router-dom, recharts, framer-motion, countup.js, axios
