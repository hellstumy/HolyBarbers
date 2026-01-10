import { create } from "zustand";

const useStore = create((set) => ({
  modalState: {
    isOpen: false,
  },

  openModal: () =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        isOpen: true,
      },
    })),

  closeModal: () =>
    set((state) => ({
      modalState: {
        ...state.modalState,
        isOpen: false,
      },
    })),

  pageState: "Main",

  setMainPage: () =>
    set(() => ({
      pageState: "Main",
    })),

  setAppointmentPage: () =>
    set(() => ({
      pageState: "Appointment",
    })),

  setFindAppointmentPage: () =>
    set(() => ({
      pageState: "FindAppointment",
    })),
}));

export default useStore;
