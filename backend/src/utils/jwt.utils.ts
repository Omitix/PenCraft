import { sign, verify } from "jsonwebtoken"
const SECRET_KEY = process.env.SECRET_KEY
if (!SECRET_KEY) {
    throw new Error("cannot load SECRET_KEY from env");
}


export const verifyJWT = (token: string): { id: string; } => {
    return verify(token, SECRET_KEY) as { id: string; }
}
export const generateJWT = (id: string): string => {
    return sign({ id }, SECRET_KEY, { expiresIn: "3h" })
}