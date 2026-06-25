import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    const location = useLocation();
    const from = location.state?.from || "/enviar-depoimento";

    async function entrar() {
        setCarregando(true);
        setMensagem("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });

        setCarregando(false);

        if (error) {
            setMensagem(error.message);
            return;
        }

        navigate(from);
    }

    async function cadastrar() {
        setCarregando(true);
        setMensagem("");

        const { error } = await supabase.auth.signUp({
            email,
            password: senha,
        });

        setCarregando(false);

        if (error) {
            setMensagem(error.message);
            return;
        }

        setMensagem("Cadastro realizado com sucesso!");
    }
    async function recuperarSenha() {
        if (!email) {
            setMensagem("Digite seu email para recuperar a senha.");
            return;
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/redefinir-senha`,
        });

        if (error) {
            setMensagem("Erro ao enviar email de recuperação.");
            return;
        }

        setMensagem(
            "Email de recuperação enviado. Verifique sua caixa de entrada."
        );
    }



    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.titulo}>Entrar</h1>

                <input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    style={styles.input}
                />

                <button onClick={entrar} style={styles.botao} disabled={carregando}>
                    {carregando ? "Entrando..." : "Entrar"}
                </button>

                <button onClick={cadastrar} style={styles.botaoSecundario}>
                    Criar conta
                </button>

                {/* <button onClick={entrarComGoogle} style={styles.botaoGoogle}>
                    Entrar com Google
                </button> */}

                <button
                    onClick={recuperarSenha}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#0c3d2e",
                        cursor: "pointer",
                        marginTop: "15px",
                        textDecoration: "underline",
                    }}
                >
                    Esqueci minha senha
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
        marginBottom: "10px",
    },
    botaoSecundario: {
        width: "100%",
        padding: "14px",
        background: "#a3b18a",
        color: "#0c3d2e",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        marginBottom: "10px",
    },

    mensagem: {
        textAlign: "center" as const,
        marginTop: "15px",
        color: "#555",
    },
};
