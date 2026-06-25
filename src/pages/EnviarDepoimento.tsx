import { useState } from "react";
import { supabase } from "../services/supabase";

export default function EnviarDepoimento() {
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [comentario, setComentario] = useState("");

    const [fotos, setFotos] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);

    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function enviarDepoimento() {
        try {
            setCarregando(true);
            setMensagem("");

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setMensagem("Faça login para enviar um depoimento.");
                return;
            }

            const fotoUrls = await enviarArquivos(fotos, "fotos");
            const videoUrls = await enviarArquivos(videos, "videos");

            if (fotoUrls.length !== fotos.length || videoUrls.length !== videos.length) {
                setMensagem("Alguns arquivos não puderam ser enviados. Tente novamente.");
                return;
            }

            const { error } = await supabase
                .from("depoimentos")
                .insert([
                    {
                        nome,
                        cidade,
                        comentario,
                        foto_url: fotoUrls[0] || "",
                        video_url: videoUrls[0] || "",
                        foto_urls: fotoUrls,
                        video_urls: videoUrls,
                        user_id: user.id,
                        aprovado: false,
                    },
                ]);

            if (error) {
                setMensagem(error.message);
                return;
            }

            setMensagem(
                "Depoimento enviado com sucesso! Aguardando aprovação."
            );

            setNome("");
            setCidade("");
            setComentario("");
            setFotos([]);
            setVideos([]);
        } catch (erro) {
            console.error(erro);
            setMensagem("Erro ao enviar depoimento.");
        } finally {
            setCarregando(false);
        }
    }

    async function enviarArquivos(arquivos: File[], pasta: "fotos" | "videos") {
        const urls: string[] = [];

        for (const arquivo of arquivos) {
            const nomeArquivo = `${Date.now()}-${crypto.randomUUID()}-${arquivo.name}`;
            const caminho = `${pasta}/${nomeArquivo}`;

            const { error } = await supabase.storage
                .from("galeria")
                .upload(caminho, arquivo);

            if (error) {
                continue;
            }

            const { data } = supabase.storage
                .from("galeria")
                .getPublicUrl(caminho);

            urls.push(data.publicUrl);
        }

        return urls;
    }

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "50px auto",
                padding: "30px",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                }}
            >
                <h1
                    style={{
                        textAlign: "center",
                        color: "#0c3d2e",
                        marginBottom: "25px",
                    }}
                >
                    Compartilhe sua experiência em Iguape
                </h1>

                <input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="text"
                    placeholder="Sua cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    style={inputStyle}
                />

                <textarea
                    placeholder="Conte sua experiência..."
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    style={{
                        ...inputStyle,
                        minHeight: "150px",
                        resize: "vertical",
                    }}
                />

                <div style={{ marginBottom: "15px" }}>
                    <label>
                        <strong>Enviar fotos:</strong>
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) =>
                            setFotos(Array.from(e.target.files || []))
                        }
                    />
                    {fotos.length > 0 && (
                        <p style={fileInfoStyle}>{fotos.length} foto(s) selecionada(s)</p>
                    )}
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <label>
                        <strong>Enviar vídeos:</strong>
                    </label>

                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={(e) =>
                            setVideos(Array.from(e.target.files || []))
                        }
                    />
                    {videos.length > 0 && (
                        <p style={fileInfoStyle}>{videos.length} vídeo(s) selecionado(s)</p>
                    )}
                </div>

                <button
                    onClick={enviarDepoimento}
                    disabled={carregando}
                    style={{
                        width: "100%",
                        padding: "15px",
                        background: "#0c3d2e",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "1rem",
                    }}
                >
                    {carregando
                        ? "Enviando..."
                        : "Enviar Depoimento"}
                </button>

                {mensagem && (
                    <p
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >
                        {mensagem}
                    </p>
                )}
            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    boxSizing: "border-box" as const,
};

const fileInfoStyle = {
    color: "#555",
    fontSize: "0.9rem",
    marginTop: "8px",
    marginBottom: 0,
};
