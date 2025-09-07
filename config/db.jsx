// lib/db.js

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema'; // Make sure this path to your schema is correct

if (!process.env.DATABASE_URL) {
  throw new Error("FATAL: DATABASE_URL environment variable is not set.");
}

console.log("✅ DATABASE_URL loaded. Forcing secure pool with explicit SSL config...");

// The definitive fix: Pass the URL alongside an explicit SSL object.
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL, // Use the URL for host, user, pass, etc.
  ssl: {
    // This object explicitly commands the driver to use a secure TLSv1.2 connection.
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
});

// This is your single, exported Drizzle instance
export const db = drizzle(pool, { schema, mode: 'default' });