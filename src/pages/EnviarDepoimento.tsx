import { useState } from "react";
import { supabase } from "../services/supabase";

export default function EnviarDepoimento() {
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [comentario, setComentario] = useState("");

    const [foto, setFoto] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);

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

            let fotoUrl = "";
            let videoUrl = "";

            // Upload da foto
            if (foto) {
                const nomeArquivo = `${Date.now()}-${foto.name}`;

                const { error } = await supabase.storage
                    .from("galeria")
                    .upload(`fotos/${nomeArquivo}`, foto);

                if (!error) {
                    const { data } = supabase.storage
                        .from("galeria")
                        .getPublicUrl(`fotos/${nomeArquivo}`);

                    fotoUrl = data.publicUrl;
                }
            }

            // Upload do vídeo
            if (video) {
                const nomeArquivo = `${Date.now()}-${video.name}`;

                const { error } = await supabase.storage
                    .from("galeria")
                    .upload(`videos/${nomeArquivo}`, video);

                if (!error) {
                    const { data } = supabase.storage
                        .from("galeria")
                        .getPublicUrl(`videos/${nomeArquivo}`);

                    videoUrl = data.publicUrl;
                }
            }

            const { error } = await supabase
                .from("depoimentos")
                .insert([
                    {
                        nome,
                        cidade,
                        comentario,
                        foto_url: fotoUrl,
                        video_url: videoUrl,
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
            setFoto(null);
            setVideo(null);
        } catch (erro) {
            console.error(erro);
            setMensagem("Erro ao enviar depoimento.");
        } finally {
            setCarregando(false);
        }
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
                        <strong>Enviar foto:</strong>
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setFoto(e.target.files?.[0] || null)
                        }
                    />
                </div>

                <div style={{ marginBottom: "25px" }}>
                    <label>
                        <strong>Enviar vídeo:</strong>
                    </label>

                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                            setVideo(e.target.files?.[0] || null)
                        }
                    />
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