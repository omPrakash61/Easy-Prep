import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'mysql',
  schema: './config/schema.js',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
});