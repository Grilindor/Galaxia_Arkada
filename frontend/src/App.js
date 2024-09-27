import React from "react";
import "./App.css";
import logo from "./image/mont_fuji.png";

function App() {
  return (
    <div className="App">
      {/* En-tête */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="nav">
          <button>Magasin</button>
          <button>Bibliothèque</button>
          <button>User</button>
        </nav>
        <div className="user-actions">
          <button>Login</button>
          <button>Sign Up</button>
          <button>Langues</button>
        </div>
      </header>

      {/* Bannière */}
      <div className="banner">
        <div className="banner-content">Image ici</div>
      </div>

      {/* Barre de filtres */}
      <div className="filters">
        <select>
          <option>Genre</option>
        </select>
        <select>
          <option>Prix</option>
        </select>
        <select>
          <option>Game Langue</option>
        </select>
        <select>
          <option>Note</option>
        </select>
        <select>
          <option>Date de sortie</option>
        </select>
        <input type="text" placeholder="Recherche..." />
      </div>

      {/* Contenu principal avec publicité et jeux */}
      <div className="main-content">
        <div className="sidebar-left">
          <div className="ad">Pub </div>
        </div>

        <div className="games-list">
          {/* Les jeux seront ici */}
          <div className="game">
            <div className="game-image">Image</div>
            <div className="game-info">
              <p>Nom du jeu</p>
              <p>Note du jeu</p>
            </div>
          </div>
          {/* Répéter pour chaque jeu */}
        </div>

        <div className="sidebar-right">
          <div className="event">Événement</div>
          <div className="event">Événement</div>
        </div>
      </div>

      {/* Pied de page */}
      <footer className="footer">
        <p>Texte du pied de page ou mentions légales ici.</p>
      </footer>
    </div>
  );
}

export default App;
