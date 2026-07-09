import { User } from "../models/user.model";
import { createUser, findAllUsers } from "../services/user.service";
import { SortOption } from "../types/sort.types";
import { UserRole } from "../types/user.types";
import { hashPassword } from "../utils/bcrypt.utils";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
if (!ADMIN_EMAIL) {
    throw new Error(`Cannot load ADMIN_EMAIL from .env file`);
}
if (!ADMIN_PASSWORD) {
    throw new Error(`Cannot load ADMIN_PASSWORD from .env file`);
}
if (!ADMIN_USERNAME) {
    throw new Error(`Cannot load ADMIN_USERNAME from .env file`);
}

export const seedAdmin = async () => {
    try {
        const result = await findAllUsers(SortOption.NEWEST, UserRole.ADMIN, 1, 1)
        if (result.users.length <= 0) {
            const hashedPassword = await hashPassword(ADMIN_PASSWORD)
            await createUser(ADMIN_USERNAME, ADMIN_EMAIL, hashedPassword, UserRole.ADMIN)
        }
    } catch (error) {
        console.log(error);
    }
}
