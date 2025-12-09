SoraFinance – Personal Expense Tracker

SoraFinance is a full-stack MERN web app for tracking expenses and getting AI-powered financial tips.
It includes secure authentication, clean UI, and smart spending analysis.

🔹 Features

Track income & expenses

Add / edit / delete transactions

Category-based summaries

AI recommendations (OpenRouter API)

User authentication (JWT)

Responsive UI with Tailwind

Deployed with Render

🔧 Tech Stack

Frontend: React, Vite, Tailwind CSS, Axios

Backend: Node.js, Express, MongoDB (Mongoose)

AI: OpenRouter API

Deployment: Render

Other: JWT Auth, Rate Limiting, dotenv

📁 Project Structure
sora-finance/
│ backend/
│ frontend/
│ package.json
│ README.md

⚙️ Local Setup
1. Clone repo
git clone https://github.com/yourusername/SoraFinance.git
cd SoraFinance

2. Install dependencies

Frontend:

cd frontend
npm install


Backend:

cd ../backend
npm install

3. Add backend .env
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
OPENROUTER_API_KEY=your_api_key
PORT=5000

4. Start development

Backend:

npm run dev


Frontend:

npm run dev

🚀 Deployment (Render)

Build Command

npm run build


Start Command

npm start

📌 About the Project

This project was built as part of my journey to become a MERN Stack Developer.
It demonstrates:

Full-stack CRUD

Authentication system

API integration

Clean, responsive UI

Cloud deployment
