import imagemHero from "../assets/galeria/iguape-passarela-rio-ribeira.webp";

export default function Hero() {
  return (
    <section
      style={{
        height: "80vh",
        backgroundImage: `url(${imagemHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0,0,0,0.5)",
          padding: "40px",
          borderRadius: "10px",
          color: "white",
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
          }}
        >
          Iguape
        </h1>

        <p
          style={{
            fontSize: "1.4rem",
          }}
        >
          Descubra a fauna, a flora, a gastronomia típica e as paisagens
          naturais do Vale do Ribeira.
        </p>
      </div>
    </section>
  );
}