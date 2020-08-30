import React from 'react';
import Image from '../logo/icon-left-font-monochrome-white.svg';
import Deconnect from '../SubComponents/Deconnect';

export function NavBar({ children }) {
  return (
    <header className="bg-danger" role="banner">
        <div className="container">
            <div className="row">
                <nav className="col navbar navbar-expand-lg navbar-dark" role="navigation">
                    <a className="navbar-brand" href="/"><img width="250" src={Image} alt="Logo de groupomania" title="Groupomania" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navbarContent" className="collapse navbar-collapse">
                        {children}
                    </div>
                </nav>
            </div>
        </div>
    </header>
  );
}

export function PrincipalNavBar() {
    switch (window.location.pathname) {
        case '/signup':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/signup">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Connexion</a>
                        </li>
                    </ul> 
                </NavBar>
            );
        case '/login':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/signup">Inscription</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/login">Connexion</a>
                        </li>
                    </ul> 
                </NavBar>
            );
        case '/':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/signup">Inscription</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Connexion</a>
                        </li>
                    </ul> 
                </NavBar>
            );
        case '/application/home':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
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
        case '/application/allArticle':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
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
        case '/application/search':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/search">Rechercher</a>
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
        
        case '/application/myProfile':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/myProfile">Mon profil</a>
                        </li>
                        <li className="nav-item">
                            <Deconnect />
                        </li>
                    </ul>
                </NavBar>
            );
        
        case '/application/myProfile/edit':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/myProfile">Mon profil</a>
                        </li>
                        <li className="nav-item">
                            <Deconnect />
                        </li>
                    </ul>
                </NavBar>
            );
        
        case '/application/myProfile/editPassword':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/myProfile">Mon profil</a>
                        </li>
                        <li className="nav-item">
                            <Deconnect />
                        </li>
                    </ul>
                </NavBar>
            );
        
        case '/application/myProfile/deleteIt':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/application/home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/application/search">Rechercher</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/application/myProfile">Mon profil</a>
                        </li>
                        <li className="nav-item">
                            <Deconnect />
                        </li>
                    </ul>
                </NavBar>
            );
        
        case '/application/deconnect':
            return (
                <NavBar>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="home">Derniers articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="allArticle">Tout les articles</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="search">Rechercher</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="myProfile">Mon profil</a>
                        </li>
                        <li className="nav-item active">
                            <Deconnect />
                        </li>
                    </ul>
                </NavBar>
            );
    }
}