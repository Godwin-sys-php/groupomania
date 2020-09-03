import React from 'react';
import Image from '../logo/icon-above-font.png';

export default function Sorry() {
  document.title = "Désolé - Groupomania";
  return (
    <div className="container">
      <div className="text-center">
        <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
      </div>
      <h1>Nous sommes désolé que l'application ne vous ait pas plu <span role="img" aria-label="triste">😢</span></h1>
      <h2>Et que vous ayez mit fin à votre compte <span role="img" aria-label="triste">😪</span></h2>
      <br />

      <h3>Maintenant vous avez le choix entre créer un nouveau compte <span role="img" aria-label="presque content">🙃</span> mais vide dans ce cas c'est <a href="/signup">ici</a> ou fermer cette onglet <span role="img" aria-label="triste">🥺</span></h3>
      <br />
      <blockquote class="blockquote">
        <p class="mb-0"><b>"Tous les moyens sont bons pourvu que la fin soit bonne."</b></p>
        <footer class="blockquote-footer">Victor Cherbuliez</footer>
      </blockquote>
    </div>
  );
}