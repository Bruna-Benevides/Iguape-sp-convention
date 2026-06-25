import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mostrarAjudaCadastro, setMostrarAjudaCadastro] = useState(false);
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

        setCarregando(true);
        setMensagem("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/redefinir-senha`,
        });

        setCarregando(false);

        if (error) {
            setMensagem(`Erro ao enviar email de recuperação: ${error.message}`);
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

                <div style={styles.helpWrapper}>
                    <button
                        type="button"
                        style={styles.helpButton}
                        aria-label="Ajuda para criar conta"
                        onMouseEnter={() => setMostrarAjudaCadastro(true)}
                        onMouseLeave={() => setMostrarAjudaCadastro(false)}
                        onFocus={() => setMostrarAjudaCadastro(true)}
                        onBlur={() => setMostrarAjudaCadastro(false)}
                    >
                        ?
                    </button>
                    <div
                        style={{
                            ...styles.helpTooltip,
                            opacity: mostrarAjudaCadastro ? 1 : 0,
                            visibility: mostrarAjudaCadastro ? "visible" : "hidden",
                            transform: mostrarAjudaCadastro
                                ? "translateY(0)"
                                : "translateY(-4px)",
                        }}
                    >
                        Para criar conta, informe um endereço de email válido,
                        escolha uma senha e aperte Criar conta. Será enviado um
                        email de confirmação; acesse seu email e confirme o
                        cadastro antes de continuar o login.
                    </div>
                </div>

                {/* <button onClick={entrarComGoogle} style={styles.botaoGoogle}>
                    Entrar com Google
                </button> */}

                <button
                    onClick={recuperarSenha}
                    disabled={carregando}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#0c3d2e",
                        cursor: carregando ? "default" : "pointer",
                        marginTop: "15px",
                        textDecoration: "underline",
                        opacity: carregando ? 0.6 : 1,
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
    helpWrapper: {
        position: "relative" as const,
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "-48px",
        marginBottom: "22px",
        paddingRight: "10px",
    },
    helpButton: {
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        border: "1px solid #0c3d2e",
        background: "#fff",
        color: "#0c3d2e",
        cursor: "help",
        fontWeight: "bold",
        fontSize: "0.95rem",
        pointerEvents: "auto" as const,
    },
    helpTooltip: {
        position: "absolute" as const,
        right: "0",
        top: "36px",
        width: "280px",
        maxWidth: "calc(100vw - 80px)",
        background: "#0c3d2e",
        color: "#fff",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        fontSize: "0.9rem",
        lineHeight: "1.5",
        textAlign: "left" as const,
        transition: "opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease",
        pointerEvents: "none" as const,
    },

    mensagem: {
        textAlign: "center" as const,
        marginTop: "15px",
        color: "#555",
    },
};
