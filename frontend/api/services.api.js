const API_URL = process.env.REACT_APP_API_URLL;

const APPOINTMENT_URL = `${API_URL}/service`;

export const servicesApi = {
  // Получить все услуги
  getAllService: async () => {
    const res = await fetch(APPOINTMENT_URL);
    if (!res.ok) throw new Error("Failed to load services");
    return res.json();
  },

  // Создать услугу
  createService: async (data) => {
    const res = await fetch(`${APPOINTMENT_URL}/createService`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create service");
    return res.json();
  },

  // Обновить услугу
  updateService: async (id, data) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update service");
    return res.json();
  },

  // Удалить услугу
  removeService: async (id) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete service");
    return res.text();
  },
};
