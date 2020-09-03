import React from 'react';

import { PrincipalNavBar } from '../SubComponents/NavBar';
import Image from '../logo/icon-above-font.png';

import AutoForm from 'react-auto-form';
import { loginUser } from '../API/users';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      identifiantGroupomania: "",
      passwordGroupomania: "",
      valid: false,
      view: false,
      message: "",
    };
    this.messageType = "";
    document.title = "Connexion - Groupomania";
    if (localStorage.getItem('tokenGroupomania') !== null || localStorage.getItem('idUserGroupomania') !== null) {
      window.location.href = "/application/allArticle";
    }
  }

  _onChange = (event, name, data, change) => {
    this.setState(change);
    if (this.state.identifiantGroupomania.trim().length > 0 && this.state.passwordGroupomania.trim().length > 0) {
      this.setState({ valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  _onSubmit = (event) => {
    event.preventDefault();
    const toSend = {
      identifiant: this.state.identifiantGroupomania,
      password: this.state.passwordGroupomania
    };
    loginUser(toSend)
      .then(response => {
        if (response.identifiant === true && response.password === true) {
          localStorage.setItem('tokenGroupomania', response.token);
          localStorage.setItem('idUserGroupomania', response.idUser);
          window.location.href = "/application/allArticle";
        } else if (response.identifiant === true && response.password === false) {
          this.messageType = "danger";
          this.setState({ message: "Votre mot de passe est incorrect" });
        } else if (response.identifiant === false) {
          this.messageType = "danger";
          this.setState({ message: "Votre nom d'utilisateur ou adresse email est incorrect" });
        } else {
          this.messageType = "danger";
          this.setState({ message: "Nous sommes tombés sur une erreur inconnu" });
        }
      })
      .catch(() => {
        this.messageType = "danger";
        this.setState({ message: "Nous sommes tombés sur une erreur inconnu" });
      });
  }

  _displayMessage = () => {
    if (this.messageType.length > 1) {
      let className = `alert alert-${this.messageType}`;
      return (
        <div className={className} role="alert">
          {this.state.message}
        </div>
      );
    }
  }

  _displayButton = () => {
    return this.state.valid === true ? <button className="btn btn-success" role="button" id="btnSubmit">Se connecter</button> : <button role="button" className="btn btn-success disabled" id="btnSubmit" disabled>Se connecter</button>
  }

  _handleView = () => {
    this.setState({ view: !this.state.view });
  }

  _displayType = () => {
    return this.state.view ? "text" : "password";
  }

  _displayEye = () => {
    return this.state.view ? <i class="fas fa-eye-slash"></i> : <i class="fas fa-eye"></i>;
  }
  
  render() {
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container" role="main">
          <div className="text-center">
            <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
          </div>
          <h1>Connectez-vous!</h1>
          <AutoForm onChange={this._onChange} onSubmit={this._onSubmit} trimOnSubmit={true}>
            <div role="form">
              <div className="form-group">
                  <label htmlFor="identifiant">Votre pseudo ou adresse email:</label>
                  <input type="text" id="identifiant" name="identifiantGroupomania" value={this.state.identifiantGroupomania} placeholder="Votre pseudo ou adresse email (exemple: example@123.abc)..." className="form-control" aria-label="Votre pseudo ou adresse email (exemple: example@123.abc)" aria-describedby="btnSubmit" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Votre mot de passe:</label>
                <div class="input-group mb-3">
                  <input id="password" type={this._displayType()} name="passwordGroupomania" value={this.state.passwordGroupomania} placeholder="Entrez votre mot de passe..." className="form-control" aria-label="Entrez votre mot de passe" aria-describedby="btnSubmit" />
                  <div class="input-group-append">
                    <button class="btn btn-secondary" aria-hidden="true" aria-label="Afficher ou masquer le mot de passe" onClick={this._handleView} type="button">{this._displayEye()}</button>
                  </div>
                </div>
              </div>
              {this._displayButton()}
              <br /><br />
              {this._displayMessage()}
            </div>
          </AutoForm>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;