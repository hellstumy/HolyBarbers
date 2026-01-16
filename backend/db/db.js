import { Pool, types } from "pg";
import dotenv from "dotenv";

dotenv.config();
types.setTypeParser(1082, (value) => value); // для даты

const isDeployed = !!process.env.DATABASE_URL;

const connectionString = isDeployed
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_LOCAL;

const pool = new Pool({
  connectionString,
  ssl: isDeployed ? { rejectUnauthorized: false } : false,
});

export async function initDb() {
  try {
    // Таблицы: barber, service, appointments
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

    console.log(`✅ ${isDeployed ? "Cloud" : "Local"} database initialized`);
  } catch (err) {
    console.error("❌ Database init failed:", err.message);
  }
}

export default pool;
