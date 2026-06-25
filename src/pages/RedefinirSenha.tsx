import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function RedefinirSenha() {
    const navigate = useNavigate();

    const [novaSenha, setNovaSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function alterarSenha() {
        if (novaSenha.length < 6) {
            setMensagem("A senha precisa ter pelo menos 6 caracteres.");
            return;
        }

        setCarregando(true);
        setMensagem("");

        const { error } = await supabase.auth.updateUser({
            password: novaSenha,
        });

        setCarregando(false);

        if (error) {
            setMensagem(error.message);
            return;
        }

        setMensagem("Senha alterada com sucesso!");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.titulo}>Redefinir senha</h1>

                <input
                    type="password"
                    placeholder="Nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    style={styles.input}
                />

                <button onClick={alterarSenha} style={styles.botao}>
                    {carregando ? "Salvando..." : "Salvar nova senha"}
                </button>

                {mensagem && <p style={styles.mensagem}>{mensagem}</p>}
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
    },
    card: {
        width: "100%",
        maxWidth: "420px",
        background: "white",
        padding: "35px",
        borderRadius: "14px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    },
    titulo: {
        textAlign: "center" as const,
        color: "#0c3d2e",
        marginBottom: "25px",
    },
    input: {
        width: "100%",
        padding: "14px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        boxSizing: "border-box" as const,
    },
    botao: {
        width: "100%",
        padding: "14px",
        background: "#0c3d2e",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    mensagem: {
        textAlign: "center" as const,
        marginTop: "15px",
        color: "#555",
    },
};