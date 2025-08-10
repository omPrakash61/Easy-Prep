
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

// Use env variables (make sure they're defined)
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Initialize drizzle
export const db = drizzle(connection);
