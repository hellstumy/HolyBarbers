import { Pool } from "pg";

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Neon connection string
    ssl: { rejectUnauthorized: false },
  });
}

export default async function handler(req, res) {
  try {
    const result = await pool.query("SELECT NOW()"); // тестовый запрос
    res.status(200).json({ time: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
}
