import flora1 from "../assets/flora/oleandro.webp";
import flora2 from "../assets/flora/manguezais.jpg";
import flora3 from "../assets/flora/ora-pro-nobis.webp";
import flora4 from "../assets/flora/plantacao-banana.jpg";
import flora5 from "../assets/flora/mata-atlantica.gif";
import flora6 from "../assets/flora/palmito.png";


type Planta = {
  nome: string;
  imagem: string;
};

export default function Flora() {
  const plantas: Planta[] = [
    {
      nome: "Oleandro",
      imagem: flora1,
    },
    {
      nome: "Manguezais",
      imagem: flora2,
    },
    {
      nome: "Ora-pro-nóbis",
      imagem: flora3,
    },
    {
      nome: "Plantação de Banana",
      imagem: flora4,
    },
    {
      nome: "Mata Atlântica",
      imagem: flora5,
    },
    {
      nome: "Palmito Pupunha",
      imagem: flora6,
    },

  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "15px", color: "#0c3d2e" }}>
        Flora de Iguape
      </h1>

      <p style={{ textAlign: "center", marginBottom: "40px", lineHeight: "1.8" }}>
        A flora de Iguape, no litoral sul de São Paulo,
        é extremamente rica e diversificada, inserida em
        um dos maiores contínuos preservados de Mata
        Atlântica do Brasil. O município abriga ecossistemas
        como manguezais, restingas, florestas de encosta e várzeas.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 320px))",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {plantas.map((planta) => (
          <div
            key={planta.nome}
            style={{
              width: "320px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: "#fff",
              margin: "0 auto",
            }}
          >
            <img
              src={planta.imagem}
              alt={planta.nome}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#0c3d2e", marginBottom: "10px" }}>
                {planta.nome}
              </h3>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}