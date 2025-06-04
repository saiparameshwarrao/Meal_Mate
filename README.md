# 🍽️ MealMate

**MealMate** is an innovative meal subscription app designed to simplify how individuals and families access healthy, delicious meals. It offers personalized meal plans, flexible subscriptions, and detailed nutritional info — all in a smooth, user-friendly platform! 🚀

---

## 📚 Table of Contents

- [Introduction](#introduction)  
- [Purpose](#purpose)  
- [Key Features](#key-features)  
- [Technologies Used](#technologies-used)  
- [Backend Overview](#backend-overview)  
- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
- [Admin Panel](#admin-panel)  
- [Contributing](#contributing)  
- [License](#license)  

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


