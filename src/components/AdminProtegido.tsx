import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../services/supabase";

type Props = {
    children: React.ReactNode;
};

const EMAIL_ADMIN = "bruninhabene17@hotmail.com";

export default function AdminProtegido({ children }: Props) {
    const [carregando, setCarregando] = useState(true);
    const [autorizado, setAutorizado] = useState(false);

    useEffect(() => {
        verificarAdmin();
    }, []);

    async function verificarAdmin() {
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session?.user?.email === EMAIL_ADMIN) {
            setAutorizado(true);
        }

        setCarregando(false);
    }

    if (carregando) {
        return (
            <p
                style={{
                    textAlign: "center",
                    padding: "60px",
                }}
            >
                Verificando acesso...
            </p>
        );
    }

    if (!autorizado) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}