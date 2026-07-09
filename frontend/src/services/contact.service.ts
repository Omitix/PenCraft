import { api } from "./api";

export const sendContactMessage = async (name: string, email: string, subject: string, message: string): Promise<string> => {
    return (await api.post("/contact", { email, subject, name, message })).data.message
}