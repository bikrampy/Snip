# Snip – URL Shortener

A full-stack URL shortener built with Node.js, Express, MongoDB, and EJS.

## Features

- User signup & login with JWT authentication
- Secure password hashing with bcrypt
- Create short URLs (per-user, no cross-user duplicates)
- Redirect short URLs to original destinations
- View all your shortened URLs on a personal dashboard
- Clean dark UI across all pages

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (server-side rendering)
- JWT (jsonwebtoken) + cookie-parser
- bcrypt
- nanoid (short ID generation)

## Setup Instructions

1. Clone the repository

2. Install dependencies:

```bash
    npm install
```

3. Create a `.env` file in the root:

```env
    PORT=8001
    MONGO_URL=mongodb://localhost:27017/snip
    SECRET_KEY=your_secret_key_here
```

4. Start MongoDB locally

5. Run the server:

```bash
    npm start
```

6. Open in browser:

```
    http://localhost:8001
```

## How It Works

- **Signup/Login** — passwords are hashed with bcrypt; a signed JWT is issued and stored in an `token` cookie
- **Auth middleware** — every protected route verifies the JWT before proceeding
- **URL shortening** — nanoid generates a 10-character unique ID; duplicate long URLs are detected per user, not globally
- **Redirecting** — visiting `/urls/u/:id` looks up the short ID and redirects to the original URL

## Architecture

- MVC pattern (models, controllers, routes)
- PRG pattern (Post → Redirect → Get) on all form submissions
- Stateless auth via JWT (no server-side sessions)

## Future Improvements

- Click analytics per short URL
- Edit / delete URLs
- Copy-to-clipboard button on confirmation page
- Custom short ID support
- Deployment (Render / Railway)
