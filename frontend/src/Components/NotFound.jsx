import React from 'react';
import { NavBar } from '../SubComponents/NavBar';
import Deconnect from '../SubComponents/Deconnect';

function NotFound() {
  document.title = "404 Not Found - Groupomania";
  let a;
  if (localStorage.getItem('tokenGroupomania') == null || localStorage.getItem('idUserGroupomania') == null) {
    a = (<NavBar>
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/signup">Inscription</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">Connexion</a>
        </li>
      </ul>
    </NavBar>
    );
  } else {
    a = (<NavBar>
      <ul className="navbar-nav">
          
          <li className="nav-item">
              <a className="nav-link" href="/application/allArticle">Tout les articles</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/application/newArticle">Ajouter un article</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/application/myProfile">Mon profil</a>
          </li>
          <li className="nav-item">
              <Deconnect />
          </li>
      </ul>
  </NavBar>
    );
  }
  return (
    <React.Fragment>
      {a}
      <div className="container">
        <h1>Erreur 404🧐🕵️‍♂️</h1>
        <h2>Oups!... </h2>
        Vous êtes tomber sur une erreur 404, votre page n'existe pas 😭
      </div>
    </React.Fragment>
  );
}

export default NotFound;
