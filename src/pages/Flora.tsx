import flora1 from "../assets/flora/oleandro.webp";
import flora2 from "../assets/flora/manguezais.jpg";
import flora3 from "../assets/flora/ora-pro-nobis.webp";
import flora4 from "../assets/flora/plantacao-banana.jpg";
import flora5 from "../assets/flora/mata-atlantica.gif";
import flora6 from "../assets/flora/palmito.png";


type Planta = {
  nome: string;
  imagem: string;
  descricao: string;
};

export default function Flora() {
  const plantas: Planta[] = [
    {
      nome: "Oleandro",
      imagem: flora1,
      descricao: "O oleandro ( Nerium oleander ), popularmente conhecido no Brasil como espirradeira , é um arbusto rústico muito comum na região do Vale do Ribeira devido à sua alta resistência ao sol forte e ao calor",
    },
    {
      nome: "Manguezais",
      imagem: flora2,
      descricao: "Os manguezais do Vale do Ribeira,Localizado no litoral sul de São Paulo (especialmente em Cananéia, Iguape e Ilha Comprida), integra o maior trecho contínuo da Mata Atlântica preservada do Brasil. Eles abrigam uma biodiversidade gigante e são áreas de reprodução para diversas espécies marinhas e aves.",
    },
    {
      nome: "Ora-pro-nóbis",
      imagem: flora3,
      descricao: " A planta se destaca na região pelo seu alto valor nutricional — sendo rica em proteínas, ferro e fibras —, e é comercializada em feiras locais por redes de agricultura familiar, como a RAMA (Rede Agroecológica de Mulheres Agricultoras).",
    },
    {
      nome: "Plantação de Banana",
      imagem: flora4,
      descricao: "O Vale do Ribeira, no sul de São Paulo,é o maior polo produtor de banana do estado e do país, responsável por produzir cerca de 800 mil toneladas anuais em 41 mil hectares. A região movimenta cerca de R$ 1 bilhão por ano e é realizada majoritariamente pela agricultura familiar.",
    },
    {
      nome: "Mata Atlântica",
      imagem: flora5,
      descricao: "O Vale do Ribeira abriga um dos trechos mais preservados da Mata Atlântica no Brasil.A região possui uma flora riquíssima, marcada pela Floresta Ombrófila Densa (típica de encostas), incluindo espécies madeireiras imponentes, palmeiras e plantas de uso tradicional e medicinal.",
    },
    {
      nome: "Palmito Pupunha",
      imagem: flora6,
      descricao: " Ao contrário do palmito juçara nativo, que morre ao ser cortado e corre risco de extinção, a pupunha é cultivada de forma sustentável, ajudando a combater o extrativismo ilegal na Mata Atlântica.",
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
              <p style={{ margin: 0, marginTop: "10px", color: "#555", lineHeight: "1.6", fontSize: "0.95rem" }}>
                {planta.descricao}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}