import dotenv from 'dotenv';
dotenv.config({ path: `./.env` });

export const { MONGODB_URI, GEMINI_API_KEY, PORT, NODE_ENV, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = process.env;