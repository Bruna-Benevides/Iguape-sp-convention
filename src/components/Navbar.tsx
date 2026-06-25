import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../services/supabase";
import "./Navbar.css";

const SITE_NAME = "Iguape"; // altere aqui para o nome desejado

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [logoAberto, setLogoAberto] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [emailUsuario, setEmailUsuario] = useState("");

  useEffect(() => {
    verificarUsuario();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuarioLogado(!!session);

      if (session?.user?.email) {
        setEmailUsuario(session.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function verificarUsuario() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUsuarioLogado(!!session);

    if (session?.user?.email) {
      setEmailUsuario(session.user.email);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <>
      <nav className="navbar">
        <button
          type="button"
          className="navbar-logo"
          onClick={() => setLogoAberto(true)}
          aria-label="Ver logo de Iguape ampliado"
        >
          <span className="logo-icon" aria-hidden>
            <img src="/logo-iguape.ico" alt="" />
          </span>
          <span className="logo-text">{SITE_NAME}</span>
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuAberto(true)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <div className={`nav-links ${menuAberto ? "ativo" : ""}`}>
          <button
            className="close-button"
            onClick={fecharMenu}
            aria-label="Fechar menu"
          >
            ×
          </button>

          <NavLink to="/" onClick={fecharMenu}>
            Home
          </NavLink>

          <NavLink to="/sobre" onClick={fecharMenu}>
            Sobre
          </NavLink>

          <NavLink to="/fauna" onClick={fecharMenu}>
            Fauna
          </NavLink>

          <NavLink to="/flora" onClick={fecharMenu}>
            Flora
          </NavLink>

          <NavLink to="/gastronomia" onClick={fecharMenu}>
            Gastronomia
          </NavLink>

          <NavLink to="/galeria" onClick={fecharMenu}>
            Galeria
          </NavLink>

          <NavLink to="/depoimentos" onClick={fecharMenu}>
            Depoimentos
          </NavLink>

          <>
            {usuarioLogado && (
              <span
                style={{
                  color: "#d8e2c4",
                  fontSize: "0.85rem",
                }}
              >
                {emailUsuario}
              </span>
            )}

            {usuarioLogado ? (
              <button
                onClick={sair}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Sair
              </button>
            ) : (
              <NavLink to="/login" onClick={fecharMenu}>
                Login
              </NavLink>
            )}
          </>

        </div>
      </nav>

      {logoAberto && (
        <div
          className="logo-modal"
          onClick={() => setLogoAberto(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Logo de Iguape ampliado"
        >
          <button
            className="logo-modal-close"
            onClick={() => setLogoAberto(false)}
            aria-label="Fechar logo ampliado"
          >
            ×
          </button>
          <img
            src="/logo-iguape.ico"
            alt="Logo de Iguape"
            className="logo-modal-image"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
