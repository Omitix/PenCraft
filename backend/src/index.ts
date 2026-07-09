import path from 'path';
import dotenv from 'dotenv';
dotenv.config()
import { testMail } from "./utils/email.utils";
import { connectToDatabase } from './config/db';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import contactRoutes from './routes/contact.routes';
import categoryRoutes from './routes/category.routes';
import commentRoutes from './routes/comment.routes';
import statsRoutes from './routes/stats.routes';
import postRoutes from './routes/post.routes';
import cors from "cors";
import express from 'express';
import { globalErrorHandler } from './middlewares/error.middleware';
import "./types/express";

const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL;
if (!PORT) {
    throw new Error("Cannot find `PORT` in .env file");

}
if (!FRONTEND_URL) {
    throw new Error("Cannot find `FRONTEND_URL ` in .env file");

}

const app = express();
const start = async () => {
    await testMail()
    await connectToDatabase()
    app.use(cors({ origin: FRONTEND_URL, credentials: true }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
    app.use("/api/contact", contactRoutes)
    app.use("/api/auth", authRoutes)
    app.use("/api/user", userRoutes)
    app.use("/api/category", categoryRoutes)
    app.use("/api/comment", commentRoutes)
    app.use("/api/post", postRoutes)
    app.use("/api/stats", statsRoutes)
    app.use(globalErrorHandler)
    app.listen(PORT, () => console.log("✅⭐💗Server runned💗⭐✅"))
}
start().catch(e => console.log(e))