// lib/db.js

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema'; // Make sure this path to your schema is correct

if (!process.env.DATABASE_URL) {
  throw new Error("FATAL: DATABASE_URL environment variable is not set.");
}

console.log("✅ DATABASE_URL loaded.");

const isLocalhost = process.env.DATABASE_URL.includes('localhost') || process.env.DATABASE_URL.includes('127.0.0.1');

const poolConfig = {
  uri: process.env.DATABASE_URL,
  ...(isLocalhost ? {} : {
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: false,
    },
  }),
};

const pool = mysql.createPool(poolConfig);

// This is your single, exported Drizzle instance
export const db = drizzle(pool, { schema, mode: 'default' });