import fs from 'fs/promises';
import path from 'path';

export const saveAvatarFile = async (file: Express.Multer.File, fileName: string): Promise<string> => {
    try {
        const uploadDir = path.join(process.cwd(), 'uploads');

        await fs.mkdir(uploadDir, { recursive: true });

        const ext = ".png";

        const fullFileName = `${fileName}${ext}`;
        const filePath = path.join(uploadDir, fullFileName);
        await fs.writeFile(filePath, file.buffer);
        return `/uploads/${fullFileName}`;

    } catch (error) {
        console.error('Error saving file:', error);
        throw error
    }
};