# PenCraft
A full-stack blogging platform built with React, TypeScript, Node.js, Express, and MongoDB. Users can write and publish posts, follow other writers, comment, like, and bookmark content. Includes a complete admin dashboard for managing users, posts, categories, and comments.
This is my second full-stack portfolio project (after [Hirrd](https://github.com/Omitix/Hirrd)), built to practice production-style backend architecture, authentication/authorization, and clean API design.
## Tech Stack
**Frontend**
- React + TypeScript
- Tailwind CSS + DaisyUI
- React Router
- Axios
- TipTap (rich text editor)
**Backend**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT authentication
- Nodemailer (password reset & contact emails)
- Multer (avatar uploads)
## Features
- JWT-based authentication (register, login, forgot/reset password)
- Role-based access control (user / admin)
- Posts with draft/published status, categories, cover images, and a rich text editor
- Soft-delete for posts (deleted posts are hidden, not destroyed)
- Nested comments with likes
- Follow / unfollow system
- Bookmarks
- Server-side search, sorting, and pagination across posts, users, and comments
- Full admin dashboard: manage users, posts, categories, and comments, with live stats
- Avatar upload (stored on the server)
- Contact form that emails the site admin
## Project Structure
```
backend/
  src/
    config/        # DB connection, seed script
    controllers/
    services/       # all DB queries live here
    models/         # Mongoose schemas
    middlewares/     # auth, validation, error handling, rate limiting
    routes/
    types/
    utils/
frontend/
  src/
    pages/
    components/
    hooks/          # data-fetching hooks per resource
    services/       # API calls (axios)
    contexts/
    types/
```
## Notes on Some Decisions
- **MongoDB** was chosen mainly out of preference for this project, not because it was the "correct" technical fit — a relational database like PostgreSQL would have worked just as well here. I wanted more hands-on practice with Mongoose.
- **UI/styling** for the pages and components was generated with AI assistance (Tailwind + DaisyUI). All application logic — models, services, controllers, validation, routing, state management, and business rules — was written by me by hand.
- **Architecture**: flat backend structure (`controllers/services/models`), soft delete for posts, embedded arrays for likes/follows/bookmarks, and a centralized error handler (`AppError` + global middleware) instead of scattering `try/catch` responses across controllers.
## Seed data
```bash
npm run seed
```
## Running Locally
### Backend
```bash
cd backend
npm install
# create a .env file (see below)
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
### Environment Variables (backend/.env)
```
SECRET_KEY =
PORT = 
DATABASE_URI =
FRONTEND_URL = 
APP_USER =
APP_PASS =
ADMIN_EMAIL =
ADMIN_USERNAME =
ADMIN_PASSWORD =
```
## What I'd Add Next
- Real-time notifications (WebSockets)
- Cloud storage for avatars/cover images instead of local disk
- Automated tests
- Docker setup
## Author
Built by **Omitix** — [GitHub](https://github.com/Omitix)
