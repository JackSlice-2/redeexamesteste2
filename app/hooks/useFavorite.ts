import axios from "axios";
import { SafeUser } from "../types";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import React, { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const isInactive = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [listingId, currentUser])


const toggleActive = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }
        try {
            let request;

            if (isInactive) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            toast.success('Serviço Reativado com Sucesso!');
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            toast.success('Serviço Desativado com Sucesso!');
            }

            await request();
            router.refresh();

        }   catch (error) {
            toast.error('Um Erro Occoreu. Se Persistir Entre em Contato com o Adminsitrador')
        }
    }, [currentUser, isInactive, listingId, loginModal, router]);
    
    return {
        isInactive,
        toggleActive
    }
}

export default useFavorite;