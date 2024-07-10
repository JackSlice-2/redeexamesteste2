import { create } from 'zustand';

interface useCreateServiceModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreateServiceModal = create<useCreateServiceModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCreateServiceModal;