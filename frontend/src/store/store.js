import { create } from "zustand";
import AdminPage from "../pages/Admin/AdminPage";

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

    AdminState: 'Service',
    setAdminService: ()=>set(()=>({
      AdminState: 'Service'
    })),
    setAdminBarbers: ()=>set(()=>({
      AdminState: 'Barbers'
    })),
    setAdminAppointmen: ()=>set(()=>({
      AdminState: 'Appointmen'
    }))
}));

export default useStore;
