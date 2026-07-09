import mongoose from "mongoose"
const DATABASE_URI = process.env.DATABASE_URI
if (!DATABASE_URI) {
    throw new Error(`Cannot load DATABASE_URI from .env file`);
}

export const connectToDatabase = async () => {
    await mongoose.connect(DATABASE_URI)
    console.log("\n\n✅✅Database connected✅✅\n\n");
}