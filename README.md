# 🔗 URL Shortener

A simple URL Shortener web application built using Node.js, Express, MongoDB, and EJS.

## 🚀 Features

- User Signup & Login
- Custom session-based authentication (UUID + cookies)
- Create short URLs
- Redirect to original URLs
- View all shortened URLs
- Clean UI using EJS templates

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (Server-side rendering)
- UUID + Cookie-parser (custom session)

## 📁 Project Structure

- controllers/ → Business logic
- models/ → Database schema
- routes/ → API routes
- services/ → Session handling
- views/ → EJS templates

## ⚙️ Setup Instructions

1. Clone the repository
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start MongoDB locally
4. Run the server:

    ```bash
    npm start
    ```

5. Open browser:

    ```code
    http://localhost:8000
    ```

## 🧠 Key Concepts Used

- MVC Architecture
- Authentication & Authorization
- PRG Pattern (Post → Redirect → Get)
- Session Management (Stateful)

## 📌 Future Improvements

- URL analytics
- Delete/Edit URLs
- Deployment (Render/Railway)
