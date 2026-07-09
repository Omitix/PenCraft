declare namespace Express {
    export interface Request {
        userId?: string,
        file?: Multer.File,
        files?: Multer.File[] | { [fieldname: string]: Multer.File[] };
    }
}