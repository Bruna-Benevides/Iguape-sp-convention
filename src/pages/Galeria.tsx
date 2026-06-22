import { useState } from "react";

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

export default function Galeria() {
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

  const videos = [video1, video2, video3];

  const [fotoAtual, setFotoAtual] = useState(0);

  function proximaFoto() {
    setFotoAtual((atual) => (atual === fotos.length - 1 ? 0 : atual + 1));
  }

  function fotoAnterior() {
    setFotoAtual((atual) => (atual === 0 ? fotos.length - 1 : atual - 1));
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "50px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0c3d2e",
          marginBottom: "15px",
        }}
      >
        Galeria de Iguape
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          lineHeight: "1.8",
        }}
      >
        Explore paisagens, áreas rurais, rios, trilhas e registros naturais que
        mostram a riqueza ambiental de Iguape e do Vale do Ribeira.
      </p>

      <h2 style={{ marginBottom: "20px" }}> Fotografias</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "15px",
        }}
      >
        <button onClick={fotoAnterior} style={styles.botaoSeta}>
          ←
        </button>

        <div style={styles.cardFoto}>
          <img
            src={fotos[fotoAtual]}
            alt={`Foto ${fotoAtual + 1}`}
            style={styles.imagem}
          />
        </div>

        <button onClick={proximaFoto} style={styles.botaoSeta}>
          →
        </button>
      </div>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "50px",
        }}
      >
        {fotoAtual + 1} de {fotos.length}
      </p>

      <h2
        style={{
          marginTop: "60px",
          marginBottom: "20px",
        }}
      >
        Vídeos
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {videos.map((video, index) => (
          <video
            key={index}
            controls
            style={{
              width: "100%",
              maxWidth: "400px",
              display: "block",
              margin: "0 auto",
              borderRadius: "12px",
            }}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
}

const styles = {
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
};