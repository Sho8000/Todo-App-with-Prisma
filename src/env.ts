import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 8000;
export const HOST = process.env.HOST || "localhost";

export const DATABASE_URL = process.env.DATABASE_URL;