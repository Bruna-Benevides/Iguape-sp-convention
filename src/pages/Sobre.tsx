function Sobre() {
  return (
    <section
      id="sobre"
      style={{
        padding: "80px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            color: "#008b8b",
            marginBottom: "25px",
          }}
        >
          Sobre Iguape
        </h2>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Iguape é uma das cidades mais antigas do estado de São Paulo e faz
          parte do Vale do Ribeira, região reconhecida por sua rica
          biodiversidade e importância histórica.
        </p>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#333",
          }}
        >
          Cercada por rios, manguezais e áreas preservadas da Mata Atlântica, a
          cidade oferece atrações naturais, culturais e gastronômicas que
          encantam moradores e visitantes.
        </p>

        <div
          style={{
            marginTop: "40px",
            maxWidth: "700px",
            height: "300px",
            margin: "40px auto 0",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <iframe
            title="Mapa de Iguape"
            src="https://www.google.com/maps?q=Iguape,%20SP&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default Sobre;