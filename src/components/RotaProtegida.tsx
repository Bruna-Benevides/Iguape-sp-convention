import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../services/supabase";

type Props = {
    children: ReactNode;
};

export default function RotaProtegida({ children }: Props) {
    const [carregando, setCarregando] = useState(true);
    const [logado, setLogado] = useState(false);
    const location = useLocation();

    useEffect(() => {
        async function verificarLogin() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setLogado(!!session);
            setCarregando(false);
        }

        verificarLogin();
    }, []);

    if (carregando) {
        return <p style={{ textAlign: "center", padding: "60px" }}>Carregando...</p>;
    }

    if (!logado) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <>{children}</>;
}