import React from 'react';
import Image from '../logo/icon-above-font.png';

export default function Bye() {
  document.title = "Aurevoir - Groupomania";
  return (
    <div className="container">
      <div className="text-center">
        <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
      </div>
      <h1>Content que ayez fait un tour</h1>
      <h2>Et maintenat Bye!!!! 👋</h2>
      <h3>Maintenant vous avez le choix entre créer un nouveau compte 🙃 mais vide dans ce cas c'est <a href="/signup">ici</a>, fermer cette onglet 🥺 ou vous reconnectez 😁 alors c'est <a href="/login">ici</a></h3>
      <br />
      <blockquote class="blockquote">
        <p class="mb-0"><b>"Il n'y a pas d'au revoir pour nous. Peu importe où tu es, tu seras toujours dans mon coeur."</b></p>
        <footer class="blockquote-footer">Gandhi</footer>
      </blockquote>
    </div>
  );
}