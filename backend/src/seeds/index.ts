import dotenv from "dotenv";
dotenv.config();
import { seedAdmin } from "./admin.seed"
import { seedCategories } from "./category.seed"
import { seedPosts } from "./post.seed"
import { connectToDatabase } from "../config/db";

export const seedData = async () => {
    try {
        await connectToDatabase()
        await seedAdmin()
        await seedCategories()
        await seedPosts()
        console.log("✅✅✅Seed Complete✅✅✅");
        process.exit(0);
    } catch (error) {
        console.log(error);

    }
}


seedData()