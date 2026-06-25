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
    const fotosInputId = "fotos-depoimento";
    const videosInputId = "videos-depoimento";

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
                "Depoimento enviado com sucesso! Seus comentários só serão visualizados na página do site após aprovação do administrador."
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

    function adicionarFotos(arquivos: FileList | null) {
        if (!arquivos) return;
        setFotos((atuais) => [...atuais, ...Array.from(arquivos)]);
    }

    function adicionarVideos(arquivos: FileList | null) {
        if (!arquivos) return;
        setVideos((atuais) => [...atuais, ...Array.from(arquivos)]);
    }

    function removerFoto(index: number) {
        setFotos((atuais) => atuais.filter((_, itemIndex) => itemIndex !== index));
    }

    function removerVideo(index: number) {
        setVideos((atuais) => atuais.filter((_, itemIndex) => itemIndex !== index));
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
                    Compartilhe suas experiência de Iguape e também você que esta nesse Congresso Internacional Felicidade Eterna em Curitiba, nos conte como esta sendo essa experiência incrível!
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

                <div style={uploadGroupStyle}>
                    <label htmlFor={fotosInputId} style={uploadButtonStyle}>
                        Escolher fotos
                    </label>

                    <input
                        id={fotosInputId}
                        type="file"
                        accept="image/*"
                        multiple
                        style={hiddenFileInputStyle}
                        onChange={(e) =>
                            adicionarFotos(e.target.files)
                        }
                    />
                    <p style={uploadHintStyle}>
                        {fotos.length === 0
                            ? "Nenhuma foto selecionada"
                            : `${fotos.length} foto(s) selecionada(s)`}
                    </p>
                    {fotos.length > 0 && (
                        <div style={fileListStyle}>
                            {fotos.map((foto, index) => (
                                <div key={`${foto.name}-${index}`} style={fileItemStyle}>
                                    <span>{foto.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removerFoto(index)}
                                        style={removeFileButtonStyle}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={uploadGroupStyle}>
                    <label htmlFor={videosInputId} style={uploadButtonStyle}>
                        Escolher vídeos
                    </label>

                    <input
                        id={videosInputId}
                        type="file"
                        accept="video/*"
                        multiple
                        style={hiddenFileInputStyle}
                        onChange={(e) =>
                            adicionarVideos(e.target.files)
                        }
                    />
                    <p style={uploadHintStyle}>
                        {videos.length === 0
                            ? "Nenhum vídeo selecionado"
                            : `${videos.length} vídeo(s) selecionado(s)`}
                    </p>
                    {videos.length > 0 && (
                        <div style={fileListStyle}>
                            {videos.map((video, index) => (
                                <div key={`${video.name}-${index}`} style={fileItemStyle}>
                                    <span>{video.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removerVideo(index)}
                                        style={removeFileButtonStyle}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
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
                        : "Enviar"}
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

const uploadGroupStyle = {
    marginBottom: "25px",
};

const uploadButtonStyle = {
    display: "inline-block",
    padding: "12px 18px",
    background: "#a3b18a",
    color: "#0c3d2e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
};

const hiddenFileInputStyle = {
    display: "none",
};

const uploadHintStyle = {
    color: "#555",
    fontSize: "0.95rem",
    marginTop: "10px",
    marginBottom: 0,
};

const fileListStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    marginTop: "10px",
};

const fileItemStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    color: "#555",
    fontSize: "0.9rem",
};

const removeFileButtonStyle = {
    border: "none",
    background: "#b00020",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "6px 10px",
    flexShrink: 0,
};
