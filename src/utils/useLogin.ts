import React from "react";
import { useSession } from "next-auth/react";

export const useLogin = () => {
    const { status, data: session } = useSession();
    
    return {
        isLoggedIn: status === "authenticated",
        user: session?.user || null,
    }
};
