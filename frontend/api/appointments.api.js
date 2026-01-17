
const API_URL = process.env.API_URL;

const APPOINTMENT_URL = `${API_URL}/appointment`;

export const appointmentsApi = {
  // Получить все записи
  getAllAppointmant: async () => {
    const res = await fetch(APPOINTMENT_URL);
    if (!res.ok) throw new Error("Failed to load appointments");
    return res.json();
  },

  // Получить записи по контакту клиента
  getAppointmantByContact: async (contact) => {
    const res = await fetch(`${APPOINTMENT_URL}/byContact/${contact}`);
    if (!res.ok) throw new Error("Failed to load appointments by contact");
    return res.json();
  },

  // Получить записи по барберу
  getAppointmantByBarber: async (barberId) => {
    const res = await fetch(`${APPOINTMENT_URL}/byBarber/${barberId}`);
    if (!res.ok) throw new Error("Failed to load appointments by barber");
    return res.json();
  },

  // Создать запись
  createAppointmant: async (data) => {
    const res = await fetch(`${APPOINTMENT_URL}/createAppointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create appointment");
    return res.json();
  },

  // Обновить запись
  updateAppointmant: async (id, data) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update appointment");
    return res.json();
  },

  // Удалить запись
  removeAppointmant: async (id) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete appointment");
    return res.json();
  },
};
