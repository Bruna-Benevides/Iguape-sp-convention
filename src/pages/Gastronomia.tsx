import gastro1 from "../assets/gastronomia/arroz-com-linguica.png";
import gastro2 from "../assets/gastronomia/pirao-de-peixe.png";
import gastro3 from "../assets/gastronomia/moqueca-de-camarao.png";
import gastro4 from "../assets/gastronomia/bala-de-banana.jpg";
import gastro5 from "../assets/gastronomia/Manjuba-frita.png";


type Prato = {
  nome: string;
  imagem: string;
};

export default function Gastronomia() {
  const pratos: Prato[] = [
    {
      nome: "Arroz com linguiça",
      imagem: gastro1,
    },

    {
      nome: "Pirão de Peixe",
      imagem: gastro2,

    },

    {
      nome: "Moqueca de Camarão",
      imagem: gastro3,
    },
    {
      nome: "Bala de Banana",
      imagem: gastro4,
    },

    {
      nome: "Manjuba frita",
      imagem: gastro5,
    },

  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "15px", color: "#0c3d2e" }}>
        Gastronomia
      </h1>

      <p style={{ textAlign: "center", marginBottom: "40px", lineHeight: "1.8" }}>
        A gastronomia típica de Iguape é um dos grandes tesouros
        culturais do Vale do Ribeira. Influenciada pelas
        tradições caiçaras, indígenas e pela riqueza natural
        da Mata Atlântica, a culinária local combina sabores
        autênticos e ingredientes típicos da região.
        Peixes frescos, frutos do mar, banana, mandioca
        e receitas transmitidas de geração em geração fazem
        parte da identidade gastronômica iguapense,
        proporcionando uma experiência única para moradores
        e visitantes que desejam conhecer a essência do
        litoral sul paulista.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 320px))",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {pratos.map((prato) => (
          <div
            key={prato.nome}
            style={{
              width: "320px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={prato.imagem}
              alt={prato.nome}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />

            <div style={{ padding: "15px" }}>
              <h3 style={{ color: "#0c3d2e", marginBottom: "10px" }}>
                {prato.nome}
              </h3>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}