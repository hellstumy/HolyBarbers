import { Client, Pool, types } from "pg";
import dotenv from "dotenv";

dotenv.config();
types.setTypeParser(1082, (value) => value); // Для дат

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = Number(process.env.DB_PORT);

// 1️⃣ Убедимся, что база существует
async function ensureDatabase() {
  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: "postgres", // стандартная база для подключения
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  await client.connect();

  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = $1`,
    [DB_NAME]
  );

  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${DB_NAME}"`);
    console.log(`Database "${DB_NAME}" created.`);
  } else {
    console.log(`Database "${DB_NAME}" already exists.`);
  }

  await client.end();
}

// 2️⃣ Создаём пул к нужной базе и создаём таблицы
async function createPoolAndTables() {
  await ensureDatabase(); // убедимся, что база есть

  const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
  });

  // Создаём таблицы, если их нет
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

  console.log("Tables are ready.");

  return pool;
}

// Экспортируем пул для использования в других частях приложения
const pool = await createPoolAndTables();
export default pool;
