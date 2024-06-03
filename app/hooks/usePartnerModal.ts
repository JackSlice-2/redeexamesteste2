import { create } from 'zustand';

interface PartnerModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const usePartnerModal = create<PartnerModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePartnerModal;