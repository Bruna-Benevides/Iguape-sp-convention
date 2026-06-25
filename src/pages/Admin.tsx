import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

type Depoimento = {
    id: string;
    nome: string;
    cidade: string;
    comentario: string;
    foto_url: string | null;
    video_url: string | null;
    foto_urls: string[] | null;
    video_urls: string[] | null;
    aprovado: boolean;
    created_at: string;
};

export default function Admin() {
    const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [filtro, setFiltro] = useState("todos");

    useEffect(() => {
        buscarDepoimentos();
    }, []);

    async function buscarDepoimentos() {
        const { data, error } = await supabase
            .from("depoimentos")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setDepoimentos(data);
        }

        setCarregando(false);
    }

    async function aprovarDepoimento(id: string) {
        await supabase.from("depoimentos").update({ aprovado: true }).eq("id", id);
        buscarDepoimentos();
    }

    async function excluirDepoimento(depoimento: Depoimento) {
        const confirmar = window.confirm("Deseja excluir este depoimento?");
        if (!confirmar) return;

        try {
            const caminhos = [
                ...obterFotos(depoimento),
                ...obterVideos(depoimento),
            ]
                .map(obterCaminhoStorage)
                .filter((caminho): caminho is string => !!caminho);

            if (caminhos.length > 0) {
                await supabase.storage.from("galeria").remove(caminhos);
            }

            await supabase.from("depoimentos").delete().eq("id", depoimento.id);

            buscarDepoimentos();
        } catch (erro) {
            console.error(erro);
            alert("Erro ao excluir depoimento.");
        }
    }

    const pendentes = depoimentos.filter((item) => !item.aprovado);
    const aprovados = depoimentos.filter((item) => item.aprovado);

    const depoimentosFiltrados =
        filtro === "todos"
            ? depoimentos
            : filtro === "pendentes"
                ? pendentes
                : aprovados;

    if (carregando) {
        return <p style={{ textAlign: "center", padding: "60px" }}>Carregando...</p>;
    }

    return (
        <section style={styles.section}>
            <h1 style={styles.titulo}>Painel Administrativo</h1>

            <div style={styles.contadores}>
                <div style={styles.infoCard}>Pendentes: {pendentes.length}</div>
                <div style={styles.infoCard}>Aprovados: {aprovados.length}</div>
            </div>

            <div style={styles.filtros}>
                <button style={styles.filtro} onClick={() => setFiltro("todos")}>
                    Todos
                </button>

                <button style={styles.filtro} onClick={() => setFiltro("pendentes")}>
                    Pendentes
                </button>

                <button style={styles.filtro} onClick={() => setFiltro("aprovados")}>
                    Aprovados
                </button>
            </div>

            <div style={styles.cards}>
                {depoimentosFiltrados.map((item) => (
                    <div key={item.id} style={styles.card}>
                        <p>
                            <strong>Status:</strong>{" "}
                            {item.aprovado ? "Aprovado" : "Pendente"}
                        </p>

                        <h3 style={styles.nome}>{item.nome}</h3>
                        <p style={styles.cidade}>{item.cidade}</p>
                        <p style={styles.comentario}>“{item.comentario}”</p>

                        {obterFotos(item).map((foto, index) => (
                            <img
                                key={foto}
                                src={foto}
                                alt={`Foto enviada ${index + 1}`}
                                style={styles.imagem}
                            />
                        ))}

                        {obterVideos(item).map((video, index) => (
                            <video key={video} controls style={styles.video}>
                                <source src={video} type="video/mp4" />
                                Vídeo enviado {index + 1}
                            </video>
                        ))}

                        {!item.aprovado && (
                            <button
                                onClick={() => aprovarDepoimento(item.id)}
                                style={styles.botaoAprovar}
                            >
                                Aprovar
                            </button>
                        )}

                        <button
                            onClick={() => excluirDepoimento(item)}
                            style={styles.botaoExcluir}
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

function obterFotos(depoimento: Depoimento) {
    return depoimento.foto_urls?.length
        ? depoimento.foto_urls
        : depoimento.foto_url
            ? [depoimento.foto_url]
            : [];
}

function obterVideos(depoimento: Depoimento) {
    return depoimento.video_urls?.length
        ? depoimento.video_urls
        : depoimento.video_url
            ? [depoimento.video_url]
            : [];
}

function obterCaminhoStorage(url: string) {
    return url.split("/storage/v1/object/public/galeria/").pop();
}

const styles = {
    section: {
        padding: "60px 20px",
        backgroundColor: "#f5f5f5",
        minHeight: "80vh",
    },
    titulo: {
        textAlign: "center" as const,
        color: "#0c3d2e",
    },
    contadores: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
        flexWrap: "wrap" as const,
    },
    infoCard: {
        background: "#0c3d2e",
        color: "white",
        padding: "15px 25px",
        borderRadius: "10px",
        fontWeight: "bold",
    },
    filtros: {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px",
        flexWrap: "wrap" as const,
    },
    filtro: {
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        background: "#a3b18a",
        cursor: "pointer",
        fontWeight: "bold",
    },
    cards: {
        display: "flex",
        flexWrap: "wrap" as const,
        gap: "25px",
        justifyContent: "center",
        marginTop: "40px",
    },
    card: {
        width: "330px",
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    nome: {
        color: "#0c3d2e",
    },
    cidade: {
        color: "#666",
    },
    comentario: {
        lineHeight: "1.6",
        color: "#444",
    },
    imagem: {
        width: "100%",
        height: "180px",
        objectFit: "cover" as const,
        borderRadius: "8px",
        marginBottom: "10px",
    },
    video: {
        width: "100%",
        borderRadius: "8px",
        marginBottom: "10px",
    },
    botaoAprovar: {
        width: "100%",
        padding: "12px",
        background: "#0c3d2e",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "10px",
    },
    botaoExcluir: {
        width: "100%",
        padding: "12px",
        background: "#b00020",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
};
