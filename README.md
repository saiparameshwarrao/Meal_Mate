# 🍽️ MealMate

**MealMate** is an innovative meal subscription app designed to simplify how individuals and families access healthy, delicious meals. It offers personalized meal plans, flexible subscriptions, and detailed nutritional info — all in a smooth, user-friendly platform! 🚀

---

## 🍴 Introduction

MealMate makes meal planning and ordering super easy 🎯 — tailored to your dietary needs and lifestyle so you can eat healthy without the stress!

---

## 🎯 Purpose

To provide a seamless meal planning experience catering to vegetarian, vegan, gluten-free, family-friendly, and other dietary preferences.

---

## ✨ Key Features

- 🥗 **Personalized Meal Plans:** Based on dietary restrictions, favorite cuisines, and portion sizes  
- 🛒 **Easy Ordering:** Order your meals for the week in just a few clicks  
- 🔄 **Flexible Subscriptions:** Choose your meal frequency and quantity  
- 📊 **Nutritional Info:** Detailed facts with every meal to keep you informed  
- 🖥️ **User-Friendly Interface:** Smooth and intuitive navigation for everyone  

---

## 🛠️ Technologies Used

### Frontend

- ⚛️ React  
- 🌐 HTML, CSS, JavaScript  

### Backend

- 🟢 Node.js  
- 🚂 Express.js  
- 🍃 MongoDB  

---

## 🏗️ Backend Overview

- 🔀 **Routing:**  
  - `/place-order`: Place & validate orders  
  - `/api/signup`: Register new users (passwords hashed 🔐)  
  - `/api/login`: Authenticate users with JWT tokens 🔑  
  - `/api/food-items`: Fetch food items by category or all  

- 📦 **Models:**  
  - User, Order, Food Item  

- ⚙️ **Configuration:**  
  - `.env` for environment variables (Mongo URI, JWT secret)  
  - MongoDB connection  

- 🛡️ **Middleware:**  
  - CORS enabled  
  - JSON parsing  

- 🧑‍💼 **Admin Panel:**  
  - AdminJS for managing users, food items, and orders  

---



## 📂 Project Structure
```text
Meal_Mate/
├── backend/          
│   ├── server.js     
│   ├── models/       
│   ├── routes/       
│
├── frontend/         
│   ├── src/         
│   ├── public/
│   └── package.json
│
└── README.md
```
---

## 🛠️ Installation & Setup
1. Clone the repo
```text
git clone https://github.com/saiparameshwarrao/Meal_Mate.git
cd Meal_Mate
```

2. Setup Backend (Express + MongoDB)
```text
cd backend
npm install
npm start
```
3. Setup Frontend (React)
```text
cd frontend
npm install
npm start
```

4. MongoDB Connection
Create a .env file inside backend/
```text
MONGO_URI=mongodb://localhost:27017/mealmate
PORT=5000
```
---

