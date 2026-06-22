import Hero from "../components/Hero";
// removed Firebase/Test components
import faunaImg from "../assets/fauna/fauna-card.png";
import floraImg from "../assets/flora/flora-card.png";
import gastroImg from "../assets/gastronomia/gastro-card.png";

export default function Home() {
    return (
        <>
            <Hero />

            <section
                style={{
                    padding: "60px 20px",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <h2>Conheça Iguape</h2>

                <p>
                    Bem-vindo a Iguape, uma das cidades mais
                    antigas do Estado de São Paulo.
                    Localizada no coração do Vale do Ribeira,
                    a cidade reúne história, cultura e
                    natureza em um cenário único. Entre o mar,
                    os rios e a exuberante Mata Atlântica,
                    Iguape encanta por seu centro histórico
                    preservado, suas tradições caiçaras e sua
                    rica biodiversidade. Conhecer Iguape é
                    mergulhar na história do Vale do Ribeira
                    e descobrir um dos mais importantes patrimônios
                    ambientais e culturais do Brasil, onde
                    paisagens naturais de rara beleza e um legado
                    histórico centenário proporcionam experiências
                    inesquecíveis aos visitantes.
                </p>
            </section>

            <section
                style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    padding: "40px",
                }}
            >
                <div
                    style={{
                        width: "300px",
                        padding: "20px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Fauna</h3>
                    <img
                        src={faunaImg}
                        alt="Fauna"
                        style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "contain",
                            backgroundColor: "white",
                            borderRadius: 0,
                            marginBottom: "12px",
                        }}
                    />
                    <p>
                        Conheça aves, mamíferos e espécies
                        típicas da Mata Atlântica e dos
                        manguezais do Vale do Ribeira.
                    </p>
                </div>

                <div
                    style={{
                        width: "300px",
                        padding: "20px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Flora</h3>
                    <img
                        src={floraImg}
                        alt="Flora"
                        style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "contain",
                            backgroundColor: "white",
                            borderRadius: 0,
                            marginBottom: "12px",
                        }}
                    />
                    <p>
                        Descubra a riqueza vegetal da Mata Atlântica,
                        um dos ecossistemas mais preservados do Brasil.
                    </p>
                </div>

                <div
                    style={{
                        width: "300px",
                        padding: "20px",
                        borderRadius: "14px",
                        overflow: "hidden",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Gastronomia</h3>
                    <img
                        src={gastroImg}
                        alt="Gastronomia"
                        style={{
                            width: "100%",
                            height: "160px",
                            objectFit: "contain",
                            backgroundColor: "white",
                            borderRadius: 0,
                            marginBottom: "12px",
                        }}
                    />
                    <p>
                      Conheça pratos tradicionais que refletem a cultura
                      caiçara e os sabores do Vale do Ribeira.
                    </p>
                </div>
            </section>
                
        </>
    );
}