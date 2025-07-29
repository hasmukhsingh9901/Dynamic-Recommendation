import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config({ path: `${__dirname}/../.env` });
export const { MONGODB_URI, GEMINI_API_KEY, PORT, NODE_ENV, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = process.env;