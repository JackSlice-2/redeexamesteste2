import { create } from 'zustand';

interface useCreatePartnerModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCreatePartnerModal = create<useCreatePartnerModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useCreatePartnerModal;