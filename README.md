# HolyBarbers — Backend

Beautiful and comprehensive guide for the HolyBarbers backend (Express + PostgreSQL).

**At a glance**
- Server: `index.js` — entry point (Express)
- DB connection: `db/db.js` (uses `pg` and environment variables)
- Routes: `routes/` — `barber.js`, `servise.js`, `appointment.js` (note: `user.js` exists but is not yet mounted in `index.js`)

**Requirements**
- Node.js v16+ (recommended)
- npm
- PostgreSQL

Install dependencies (from the `backend` folder):

```bash
npm install
```

Environment variables (`.env`)
Create a `.env` file in the `backend` folder and set:

```
PORT=5000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret   # if you add authentication
```

`db/db.js` expects `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, and `DB_PORT`.

Run (development):

```bash
npm start
```

The `start` script in `package.json` runs `nodemon index.js`.

---

**Database — recommended schema (example SQL)**
Below is a minimal schema; adapt it for migrations or seed data as needed.

```sql
CREATE TABLE barbers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  experiance TEXT,
  rating NUMERIC,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  duration INTEGER, -- minutes
  price NUMERIC
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  barber_id INTEGER REFERENCES barbers(id),
  service_id INTEGER REFERENCES service(id),
  appointment_date DATE,
  appointment_time TIME,
  client_name TEXT,
  client_contact TEXT,
  status TEXT DEFAULT 'pending'
);
```
---

**API: detailed documentation**

Base URL (local): `http://localhost:<PORT>` (default `3000` in `index.js`, or the value from `.env`).

General notes:
- All endpoints return JSON unless otherwise noted.
- Field naming varies between `snake_case` and `camelCase` in code; pay attention to examples (`appointment_date` and `appointment_time` exist in DB, while some route payloads use `appointmentDate`/`appointment_time`).

1) Barbers — `GET /barber`, `GET /barber/:id`, `POST /barber/createBarber`, `PUT /barber/:id`, `DELETE /barber/:id`

- GET /barber
  - Description: return a list of all barbers
  - Example response:
  ```json
  [ { "id":1, "name":"Ivan", "experiance":"5 years", "rating":4.8, "is_active":true } ]
  ```

- GET /barber/:id
  - Description: get barber details by `id`
  - Status codes: `200` found, `404` not found

- POST /barber/createBarber
  - Description: create a new barber
  - Body (JSON):
    ```json
    { "name": "Ivan", "experiance": "5 years", "rating": 4.8 }
    ```
  - Response: created object (with `id`)

- PUT /barber/:id
  - Description: update barber data
  - Body (JSON):
    ```json
    { "name":"Ivan", "experiance":"6 years", "rating":4.9, "is_active": true }
    ```
  - Response: updated object

- DELETE /barber/:id
  - Description: delete barber by `id`
  - Response: current implementation returns plain text "Barber deleted successfully".

2) Services — `GET /servise`, `POST /servise/createService`, `PUT /servise/:id`, `DELETE /servise/:id`

- GET /servise
  - Description: list all services
  - Example response:
    ```json
    [ { "id":1, "name":"Haircut", "duration":30, "price":15.0 } ]
    ```

- POST /servise/createService
  - Body (JSON): `{ "name":"Beard trim", "duration":15, "price":7.5 }`
  - Response: created object

- PUT /servise/:id
  - Body: `{ "name":"...", "duration":..., "price":... }`
  - Response: updated object

- DELETE /servise/:id
  - Description: delete a service

3) Appointments — `GET /appointment`, `GET /appointment/byContact/:contact`, `GET /appointment/byBarber/:barberId`, `POST /appointment/createAppointment`, `PUT /appointment/:id`, `DELETE /appointment/:id`

- GET /appointment
  - Description: return all appointments

- GET /appointment/byContact/:contact
  - Description: find appointments by client contact (returns JOIN with barber name and service name)

- GET /appointment/byBarber/:barberId
  - Description: appointments for a specific barber (JOINs with service and barber tables)

- POST /appointment/createAppointment
  - Description: create an appointment
  - Body (JSON):
    ```json
    {
      "barberId": 1,
      "serviceId": 2,
      "appointmentDate": "2026-01-15",
      "appointment_time": "14:30",
      "name": "Ivan Petrov",
      "contact": "+71234567890"
    }
    ```
  - Response: created record

- PUT /appointment/:id
  - Description: update an appointment (date/time, status, etc.)
  - Body (JSON) example:
    ```json
    {
      "barberId": 1,
      "serviceId": 2,
      "appointmentDate": "2026-01-16",
      "appointment_time": "15:00",
      "name": "Ivan Petrov",
      "contact": "+71234567890",
      "status": "completed"
    }
    ```
  - Behavior: if `status` becomes `cancelled` or `completed`, the route code schedules automatic deletion after 24 hours (the route uses `setTimeout` with `86400*1000` ms). Logs will show auto-deletion messages.

- DELETE /appointment/:id
  - Deletes the appointment and returns a success message.

---

Примеры cURL

```bash
# Получить список барберов
curl http://localhost:3000/barber

# Создать услугу
curl -X POST http://localhost:3000/servise/createService \
  -H "Content-Type: application/json" \
  -d '{"name":"Haircut","duration":30,"price":20}'

# Создать запись
curl -X POST http://localhost:3000/appointment/createAppointment \
  -H "Content-Type: application/json" \
  -d '{"barberId":1,"serviceId":1,"appointmentDate":"2026-01-20","appointment_time":"10:00","name":"Ivan","contact":"+7..."}'
```

Пояснения и рекомендации
- Файл `routes/user.js` есть в репозитории, но в `index.js` он пока не подключён — подключите `app.use('/user', userRoutes)` если добавляете регистрацию/логин.
- Поля и формат дат/времени согласуйте между фронтендом и бэкендом: в примерах используются `YYYY-MM-DD` и `HH:MM`.
- Рассмотрите добавление валидации (Joi/express-validator) и обработчика ошибок для унифицированных ответов.
- Для миграций и сидов рекомендую добавить `node-pg-migrate` или `knex`.



