import fauna1 from "../assets/fauna/sarue.webp";
import fauna2 from "../assets/fauna/fauna2.png";
import fauna3 from "../assets/fauna/quero-quero.jpg";
import fauna4 from "../assets/fauna/fauna4.webp";
import fauna5 from "../assets/fauna/fauna5.png";
import fauna6 from "../assets/fauna/lagarto.jpg";

type Animal = {
  nome: string;
  imagem: string;
};

export default function Fauna() {
  const animais: Animal[] = [
    {
      nome: "Saruê",
      imagem: fauna1,
    },
    {
      nome: "Caranguejo-uçá",
      imagem: fauna2,
    },
    {
      nome: "Quero-quero",
      imagem: fauna3,
    },
    {
      nome: "Guará-Vermelho",
      imagem: fauna4,
    },
    {
      nome: "Jacaré-do-papo-amarelo",
      imagem: fauna5,
    },
    {
      nome: "Lagarto",
      imagem: fauna6,
    },
  ];

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
          marginBottom: "15px",
          color: "#0c3d2e",
        }}
      >
        Fauna de Iguape
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "40px",
          lineHeight: "1.8",
        }}
      >
        Iguape abriga uma das mais ricas biodiversidades
        do Estado de São Paulo. Cercada pela Mata Atlântica,
        rios e manguezais, a região é habitat de diversas
        espécies de aves, mamíferos, répteis e animais aquáticos.
        Sua fauna exuberante reflete a importância ambiental do
        Vale do Ribeira e torna o município um destino especial
        para quem aprecia a natureza.
<br></br>
        A fauna de Iguape reflete toda a riqueza
        natural do Vale do Ribeira. Em seus manguezais,
        rios e áreas de Mata Atlântica vivem espécies
        como a capivara, a lontra, o jacaré-de-papo-amarelo,
        o tucano-de-bico-verde, a garça-branca e diversas
        outras aves e mamíferos nativos. Essa diversidade
        transforma a região em um dos mais importantes refúgios
        da vida silvestre do Brasil, proporcionando experiências
        únicas de contato com a natureza.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 320px))",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {animais.map((animal) => (
          <div
            key={animal.nome}
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
              src={animal.imagem}
              alt={animal.nome}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
              }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#0c3d2e", marginBottom: "10px" }}>
                {animal.nome}
              </h3>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}