import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

type Depoimento = {
    id: string;
    nome: string;
    cidade: string;
    comentario: string;
    foto_url: string | null;
    video_url: string | null;
    created_at: string;
};

export default function Depoimentos() {
    const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarDepoimentos();
    }, []);
    const totalDepoimentos = depoimentos.length;

    const totalFotos = depoimentos.filter(
        (item) => item.foto_url
    ).length;

    const totalVideos = depoimentos.filter(
        (item) => item.video_url
    ).length;

    async function buscarDepoimentos() {
        const { data, error } = await supabase
            .from("depoimentos")
            .select("id, nome, cidade, comentario, foto_url, video_url, created_at")
            .eq("aprovado", true)
            .order("created_at", { ascending: false });

        if (!error && data) {
            setDepoimentos(data);
        }

        setCarregando(false);
    }

    return (
        <section style={styles.section}>
            <h1 style={styles.titulo}>Depoimentos</h1>

            <p style={styles.subtitulo}>
                Veja experiências compartilhadas por visitantes de Iguape.
            </p>

            <div style={styles.buttonWrapper}>
                <Link to="/enviar-depoimento" style={styles.botaoEnviar}>
                    Enviar depoimento
                </Link>
            </div>

            <div style={styles.resumo}>
                <span>{totalDepoimentos} depoimentos</span>
                <span>{totalFotos} fotos</span>
                <span>{totalVideos} vídeos</span>
            </div>

            {carregando && <p style={styles.aviso}>Carregando depoimentos...</p>}

            {!carregando && depoimentos.length === 0 && (
                <p style={styles.aviso}>
                    Ainda não há depoimentos aprovados para exibição.
                </p>
            )}

            <div style={styles.cards}>
                {depoimentos.map((item) => (
                    <div key={item.id} style={styles.card}>
                        {item.foto_url && (
                            <img
                                src={item.foto_url}
                                alt={`Foto enviada por ${item.nome}`}
                                style={styles.imagem}
                            />
                        )}

                        <p style={styles.comentario}>“{item.comentario}”</p>

                        <h3 style={styles.nome}>{item.nome}</h3>

                        <span style={styles.cidade}>{item.cidade}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: "80px 20px",
        backgroundColor: "#f5f5f5",
        minHeight: "70vh",
    },
    titulo: {
        textAlign: "center" as const,
        fontSize: "2.5rem",
        color: "#0c3d2e",
        marginBottom: "15px",
    },
    subtitulo: {
        textAlign: "center" as const,
        color: "#555",
        marginBottom: "40px",
        fontSize: "1.1rem",
    },
    aviso: {
        textAlign: "center" as const,
        color: "#555",
    },
    cards: {
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        flexWrap: "wrap" as const,
    },
    card: {
        width: "320px",
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    imagem: {
        width: "100%",
        height: "180px",
        objectFit: "cover" as const,
        borderRadius: "10px",
        marginBottom: "15px",
    },
    comentario: {
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "#444",
        marginBottom: "20px",
    },
    nome: {
        fontSize: "1.1rem",
        color: "#006666",
        marginBottom: "5px",
    },
    cidade: {
        fontSize: "0.9rem",
        color: "#777",
    },
    resumo: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        color: "#555",
        marginBottom: "25px",
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
    },
    botaoEnviar: {
        display: "inline-block",
        padding: "12px 24px",
        backgroundColor: "#0c3d2e",
        color: "white",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "background-color 0.2s ease",
    },
};