import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../services/supabase";

import foto1 from "../assets/galeria/animais-no-campo.jpeg";
import foto2 from "../assets/galeria/barra-do-ribeira-iguape-sp.webp";
import foto3 from "../assets/galeria/cachoeira-pos-rural.jpeg";
import foto4 from "../assets/galeria/campo-rural.jpeg";
import foto5 from "../assets/galeria/Trilha-Fonte-da-Saudade.jpg.webp";
import foto6 from "../assets/galeria/Trilha-da-Pedra-Lisa.jpg.webp";
import foto7 from "../assets/galeria/estrada-iguape.jpeg";
import foto8 from "../assets/galeria/salto-bigua.jpeg";
import foto9 from "../assets/galeria/rio-rocio.jpeg";
import foto10 from "../assets/galeria/nascer-do-sol.jpeg";
import foto11 from "../assets/galeria/anoitecer.jpeg";
import foto12 from "../assets/galeria/barquinho.jpeg";
import foto13 from "../assets/galeria/caiaque.jpeg";
import foto14 from "../assets/galeria/deck-rocio.jpeg";
import foto15 from "../assets/galeria/entardecer.jpeg";
import foto16 from "../assets/galeria/estrada-rural.jpeg";
import foto17 from "../assets/galeria/iguape-vista-de-cima.jpeg";
import foto18 from "../assets/galeria/passarela-ao-amanhecer.jpeg";
import foto19 from "../assets/galeria/rio-rocio-1.jpeg";
import foto20 from "../assets/galeria/ilha-vista-longe.jpeg";
import foto21 from "../assets/galeria/passarela2.jpeg";
import foto22 from "../assets/galeria/ponte.jpeg";
import foto23 from "../assets/galeria/campo-rocio.jpeg";
import foto24 from "../assets/galeria/Costao-da-Jureia.jpg.webp";

import video1 from "../assets/galeria/cachoeira-bigua.mp4";
import video2 from "../assets/galeria/reporter-rural-peropava.mp4";
import video3 from "../assets/galeria/rural.mp4";

const fotos = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
  foto7,
  foto8,
  foto9,
  foto10,
  foto11,
  foto12,
  foto13,
  foto14,
  foto15,
  foto16,
  foto17,
  foto18,
  foto19,
  foto20,
  foto21,
  foto22,
  foto23,
  foto24,
];

type MidiaVisitante = {
  id: string;
  nome: string;
  cidade: string;
  foto_url: string | null;
  video_url: string | null;
};

export default function Galeria() {
  const videos = [video1, video2, video3];
  const videoTitles = [
    "Cachoeira Biguá",
    "Repórter Rural em Peropava",
    "Campo Rural em Iguape | Rocio",
  ];

  const [fotoAtual, setFotoAtual] = useState(0);
  const [envioAtual, setEnvioAtual] = useState(0);
  const [midiasVisitantes, setMidiasVisitantes] = useState<MidiaVisitante[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [imagemModal, setImagemModal] = useState("");
  const [indiceModal, setIndiceModal] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    buscarMidiasVisitantes();
  }, []);

  async function buscarMidiasVisitantes() {
    const { data, error } = await supabase
      .from("depoimentos")
      .select("id, nome, cidade, foto_url, video_url")
      .eq("aprovado", true)
      .or("foto_url.not.is.null,video_url.not.is.null")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setMidiasVisitantes(data);
    }
  }

  function proximaFoto() {
    setFotoAtual((atual) => (atual === fotos.length - 1 ? 0 : atual + 1));
  }

  function fotoAnterior() {
    setFotoAtual((atual) => (atual === 0 ? fotos.length - 1 : atual - 1));
  }

  function proximoEnvio() {
    setEnvioAtual((atual) =>
      atual === midiasVisitantes.length - 1 ? 0 : atual + 1
    );
  }

  function envioAnterior() {
    setEnvioAtual((atual) =>
      atual === 0 ? midiasVisitantes.length - 1 : atual - 1
    );
  }

  function pausarOutrosVideos(videoAtual: HTMLVideoElement) {
    videoRefs.current.forEach((video) => {
      if (video && video !== videoAtual) {
        video.pause();
      }
    });
  }
  function abrirModal(imagem: string, indice: number) {
    setImagemModal(imagem);
    setIndiceModal(indice);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setImagemModal("");
  }

  const proximaImagemModal = useCallback(() => {
    setIndiceModal((atual) => {
      const novoIndice = atual === fotos.length - 1 ? 0 : atual + 1;
      setImagemModal(fotos[novoIndice]);
      return novoIndice;
    });
  }, []);

  const imagemAnteriorModal = useCallback(() => {
    setIndiceModal((atual) => {
      const novoIndice = atual === 0 ? fotos.length - 1 : atual - 1;
      setImagemModal(fotos[novoIndice]);
      return novoIndice;
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!modalAberto) return;

      if (event.key === "Escape") {
        fecharModal();
      }

      if (event.key === "ArrowRight") {
        proximaImagemModal();
      }

      if (event.key === "ArrowLeft") {
        imagemAnteriorModal();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalAberto, indiceModal, imagemAnteriorModal, proximaImagemModal]);

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>Galeria de Iguape</h1>

      <p style={styles.texto}>
        Explore paisagens, áreas rurais, rios, trilhas e registros naturais que
        mostram a riqueza ambiental de Iguape e do Vale do Ribeira.
      </p>

      <h2 style={styles.subtitulo}>Fotografias</h2>

      <div style={styles.carrossel}>
        <button onClick={fotoAnterior} style={styles.botaoSeta}>
          ←
        </button>

        <div style={styles.cardFoto}>
          <img
            src={fotos[fotoAtual]}
            alt={`Foto ${fotoAtual + 1}`}
            style={styles.imagem}
            onClick={() => abrirModal(fotos[fotoAtual], fotoAtual)}
          />
        </div>

        <button onClick={proximaFoto} style={styles.botaoSeta}>
          →
        </button>
      </div>

      <p style={styles.contador}>
        {fotoAtual + 1} de {fotos.length}
      </p>
      <div style={styles.miniaturas}>
        {fotos.map((foto, index) => (
          <img
            key={index}
            src={foto}
            alt={`Miniatura ${index + 1}`}
            onClick={() => setFotoAtual(index)}
            style={{
              ...styles.miniatura,
              border:
                fotoAtual === index
                  ? "3px solid #0c3d2e"
                  : "2px solid transparent",
            }}
          />
        ))}
      </div>

      <h2 style={styles.subtitulo}>Vídeos</h2>

      <div style={styles.videoGrid}>
        {videos.map((video, index) => (
          <div key={index} style={styles.videoCard}>
            <video
              ref={(elemento) => {
                videoRefs.current[index] = elemento;
              }}
              controls
              style={
                index === 1
                  ? { ...styles.video, height: "190px", maxHeight: "190px" }
                  : styles.video
              }
              onPlay={(event) => pausarOutrosVideos(event.currentTarget)}
            >
              <source src={video} type="video/mp4" />
            </video>

            <div style={styles.videoInfo}>
              <h3 style={styles.videoTitulo}>{videoTitles[index]}</h3>
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.subtitulo}>Envios dos Visitantes</h2>

      {midiasVisitantes.length === 0 ? (
        <p style={styles.aviso}>
          Ainda não há fotos ou vídeos aprovados enviados por visitantes.
        </p>
      ) : (
        <>
          <div style={styles.carrossel}>
            <button onClick={envioAnterior} style={styles.botaoSeta}>
              ←
            </button>

            <div style={styles.uploadCard}>
              {midiasVisitantes[envioAtual].foto_url && (
                <img
                  src={midiasVisitantes[envioAtual].foto_url || ""}
                  alt={midiasVisitantes[envioAtual].nome}
                  style={styles.uploadImagem}
                  onClick={() =>
                    abrirModal(
                      midiasVisitantes[envioAtual].foto_url || "",
                      0
                    )
                  }
                />
              )}

              {midiasVisitantes[envioAtual].video_url && (
                <video
                  controls
                  style={styles.uploadVideo}
                  onPlay={(event) => pausarOutrosVideos(event.currentTarget)}
                >
                  <source
                    src={midiasVisitantes[envioAtual].video_url || ""}
                    type="video/mp4"
                  />
                </video>
              )}

              <div style={styles.videoInfo}>
                <h3 style={styles.videoTitulo}>
                  {midiasVisitantes[envioAtual].nome}
                </h3>

                <p style={styles.cidade}>
                  {midiasVisitantes[envioAtual].cidade}
                </p>
              </div>
            </div>

            <button onClick={proximoEnvio} style={styles.botaoSeta}>
              →
            </button>
          </div>

          <p style={styles.contador}>
            {envioAtual + 1} de {midiasVisitantes.length}
          </p>
        </>
      )}
      {modalAberto && (
        <div style={styles.modal}>
          <button style={styles.fecharModal} onClick={fecharModal}>
            ×
          </button>
          <p style={styles.contadorModal}>
            Foto {indiceModal + 1} de {fotos.length}
          </p>

          <button
            style={styles.setaModalEsquerda}
            onClick={imagemAnteriorModal}
          >
            ←
          </button>

          <img
            src={imagemModal}
            alt="Imagem ampliada"
            style={styles.imagemModal}
          />

          <button
            style={styles.setaModalDireita}
            onClick={proximaImagemModal}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "50px 20px",
  },
  titulo: {
    textAlign: "center" as const,
    color: "#0c3d2e",
    marginBottom: "15px",
  },
  texto: {
    textAlign: "center" as const,
    marginBottom: "40px",
    lineHeight: "1.8",
  },
  subtitulo: {
    marginTop: "60px",
    marginBottom: "20px",
    color: "#0c3d2e",
  },
  carrossel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginBottom: "15px",
  },
  cardFoto: {
    width: "700px",
    maxWidth: "100%",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  imagem: {
    width: "100%",
    height: "450px",
    objectFit: "cover" as const,
    display: "block",
    backgroundColor: "#f5f5f5",
    cursor: "pointer",
  },
  botaoSeta: {
    fontSize: "2rem",
    border: "none",
    background: "#0c3d2e",
    color: "white",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  contador: {
    textAlign: "center" as const,
    color: "#666",
    marginBottom: "50px",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 320px))",
    justifyContent: "center",
    gap: "25px",
  },
  videoCard: {
    width: "320px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  video: {
    width: "100%",
    height: "230px",
    objectFit: "cover" as const,
    display: "block",
    backgroundColor: "#000",
  },
  videoInfo: {
    padding: "15px",
  },
  videoTitulo: {
    color: "#0c3d2e",
    margin: 0,
  },
  uploadCard: {
    width: "700px",
    maxWidth: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  uploadImagem: {
    width: "100%",
    height: "450px",
    objectFit: "cover" as const,
    display: "block",
    cursor: "pointer",
  },
  uploadVideo: {
    width: "100%",
    height: "450px",
    objectFit: "cover" as const,
    display: "block",
    backgroundColor: "#000",
  },
  cidade: {
    color: "#666",
    marginTop: "5px",
    marginBottom: 0,
  },
  aviso: {
    textAlign: "center" as const,
    color: "#666",
  },
  modal: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
    padding: "20px",
  },

  fecharModal: {
    position: "absolute" as const,
    top: "20px",
    right: "30px",
    background: "transparent",
    border: "none",
    color: "white",
    fontSize: "3rem",
    cursor: "pointer",
  },

  imagemModal: {
    maxWidth: "90%",
    maxHeight: "90%",
    borderRadius: "12px",
    objectFit: "contain" as const,
  },
  setaModalEsquerda: {
    position: "absolute" as const,
    left: "20px",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    fontSize: "3rem",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    cursor: "pointer",
  },

  setaModalDireita: {
    position: "absolute" as const,
    right: "20px",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    fontSize: "3rem",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  contadorModal: {
    position: "absolute" as const,
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    color: "white",
    fontSize: "1rem",
    background: "rgba(0,0,0,0.5)",
    padding: "8px 16px",
    borderRadius: "20px",
  },
  miniaturas: {
  display: "flex",
  gap: "10px",
  overflowX: "auto" as const,
  padding: "15px 0",
  marginBottom: "40px",
},

miniatura: {
  width: "90px",
  height: "60px",
  objectFit: "cover" as const,
  borderRadius: "8px",
  cursor: "pointer",
  flexShrink: 0,
},
};