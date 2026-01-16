import dotenv from "dotenv";
dotenv.config(); // ВСЕГДА первым

import { Pool, types } from "pg";

// DATE как строка
types.setTypeParser(1082, (value) => value);

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined. Check .env file");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Инициализация таблиц
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS barber (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        experiance INT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        img_url TEXT
      );

      CREATE TABLE IF NOT EXISTS service (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        duration INTERVAL NOT NULL,
        is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        client_name VARCHAR(100) NOT NULL,
        client_contact VARCHAR(100),
        barber_id INT REFERENCES barber(id),
        service_id INT REFERENCES service(id),
        status VARCHAR(50)
      );
    `);

    console.log("✅ Database initialized");
  } catch (err) {
    console.error("❌ Database init failed:", err.message);
    process.exit(1);
  }
  console.log("DATABASE_URL =", JSON.stringify(process.env.DATABASE_URL));

}

await initDb();

export default pool;
