const API_URL = "https://holybarbers-production.up.railway.app/appointment";

export const appointmentsApi = {
  // Получить все записи
  getAllAppointmant: async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load appointments");
    return res.json();
  },

  // Получить записи по контакту клиента
  getAppointmantByContact: async (contact) => {
    const res = await fetch(`${API_URL}/byContact/${contact}`);
    if (!res.ok) throw new Error("Failed to load appointments by contact");
    return res.json();
  },

  // Получить записи по барберу
  getAppointmantByBarber: async (barberId) => {
    const res = await fetch(`${API_URL}/byBarber/${barberId}`);
    if (!res.ok) throw new Error("Failed to load appointments by barber");
    return res.json();
  },

  // Создать запись
  createAppointmant: async (data) => {
    const res = await fetch(`${API_URL}/createAppointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create appointment");
    return res.json();
  },

  // Обновить запись
  updateAppointmant: async (id, data) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update appointment");
    return res.json();
  },

  // Удалить запись
  removeAppointmant: async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete appointment");
    return res.json();
  },
};
