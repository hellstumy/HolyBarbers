import { create } from 'zustand';

const useStore = create((set) => ({
    modalSate: {
        isOpen: false,
    },
    openModal: () => set(() => ({
        modalSate: {
            isOpen: true,
        },
    })),
    closeModal: () => set(() => ({
        modalSate: {
            isOpen: false,
        },
    })),
}));
export default useStore;