// api/test.js
import { Pool } from "pg";

// Singleton Pool — создаётся один раз на холодный старт
let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL, // Neon connection string
      ssl: { rejectUnauthorized: false }, // обязательно для Neon
    });
  }
  return pool;
}

export default async function handler(req, res) {
  const pool = getPool(); // получаем пул

  try {
    const result = await pool.query("SELECT NOW()"); // тестовый запрос
    res.status(200).json({ time: result.rows[0] });
  } catch (error) {
    console.error("Database error:", error); // логи на Vercel
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
}
