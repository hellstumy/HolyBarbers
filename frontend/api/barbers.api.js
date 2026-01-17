

const APPOINTMENT_URL = `https://holybarbers-production.up.railway.app/barber`;

export const barbersApi = {
  getAllBarbers: async () => {
    const res = await fetch(APPOINTMENT_URL);
    if (!res.ok) throw new Error("Failed to load barbers");
    return res.json();
  },

  getBarberById: async (id) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`);
    if (!res.ok) throw new Error("Barber not found");
    return res.json();
  },

  createBarber: async (data) => {
    const res = await fetch(`${APPOINTMENT_URL}/createBarber`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create barber");
    return res.json();
  },

  updateBarber: async (id, data) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update barber");
    return res.json();
  },

  removeBarber: async (id) => {
    const res = await fetch(`${APPOINTMENT_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete barber");
    return res.text();
  },
};
