import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const SITE_NAME = "Iguape"; // altere aqui para o nome desejado

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon" aria-hidden>
          <img src="/logo-iguape.ico" alt="logo-iguape" />
        </span>
        <span className="logo-text">{SITE_NAME}</span>
      </div>

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
      </div>
    </nav>
  );
}