import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';

import AutoForm from 'react-auto-form';
import passwordValidator from 'password-validator';
import validator from 'validator';

import '@fortawesome/fontawesome-free/css/all.min.css'

import { signUpUser, loginUser } from '../API/users';
import Image from '../logo/icon-above-font.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Inscription — Groupomania";
    this.state = {
      nameGroupomania: "",
      pseudoGroupomania: "",
      emailGroupomania: "",
      passwordGroupomania: "",
      valid: false,
      view: false,
      message: "",
      messageType: ""
    };
    if (localStorage.getItem('tokenGroupomania') !== null || localStorage.getItem('idUserGroupomania') !== null) {
      window.location.href = "/application/home";
    }
  }

  _onChange = (event, name, data, change) => {
    this.setState(change);
    const schema = new passwordValidator();
    schema
      .is().min(8)
      .has().uppercase()
      .has().lowercase()
      .has().digits(2);
    let i = 0;
    const state = [this.state.nameGroupomania.trim(), this.state.pseudoGroupomania.trim(), this.state.emailGroupomania.trim(), this.state.passwordGroupomania.trim()];
    for (let index in state) {
      if (state[index].trim().length >= 4) {
        i++;
      }
    }
    if (schema.validate(this.state.passwordGroupomania) && validator.isEmail(this.state.emailGroupomania)) {
      i++;
    }
    i === 5 ? this.setState({ valid: true }) : this.setState({ valid: false });
  }

  _displayButton = () => {
    return this.state.valid === true ? <button className="btn btn-success" role="button" id="btnSubmit">S'inscrire</button> : <button role="button" className="btn btn-success disabled" id="btnSubmit" disabled>S'inscrire</button>
  } 

  _onSubmit = (event) => {
    event.preventDefault();
    const toSend = {
      pseudo: this.state.pseudoGroupomania,
      name: this.state.nameGroupomania,
      email: this.state.emailGroupomania,
      password: this.state.passwordGroupomania
    };
    signUpUser(toSend)
      .then(json => {
        if (json.create === true) {
          console.log('Ici');
          const toSend = {
            identifiant: this.state.emailGroupomania,
            password: this.state.passwordGroupomania
          }
          loginUser(toSend)
            .then(response => {
              if (response.identifiant === true && response.password === true) {
                localStorage.setItem('tokenGroupomania', response.token);
                localStorage.setItem('idUserGroupomania', response.idUser);
                window.location.href = "/application/home";
              } else {
                this.setState({ message: "Une erreur inconnu a eu lieu réssayer un peu plus tard", messageType: "danger" });
              }
            })
        } else if (json.valideForm === false) {
          this.setState({ message: "Des champs ne sont pas valide !!!", messageType: "danger" });
        } else if (json.existEmail === true) {
          this.setState({ message: "L'adresse email est déjà existante", messageType: "warning" });
        } else if (json.existPseudo === true) {
          this.setState({ message: "Le pseudo est déjà existant", messageType: "warning" });
        } else {
          this.setState({ message: "Une erreur inconnu a eu lieu réssayer un peu plus tard", messageType: "danger" });
        }
      })
      .catch(() => this.setState({ message: "Une erreur inconnu a eu lieu réssayer un peu plus tard", messageType: "danger" }));
  }

  _displayMessage = () => {
    if (this.state.messageType.length > 1) {
      let className = `alert alert-${this.state.messageType}`;
      if (className === "alert alert-warning") {
        return (
          <div className={className} role="alert">
            {this.state.message}  est-ce vous? <a href='login' title="Aller se connecter">Connectez-vous</a>
          </div>
        );
      } else {
        return (
          <div className={className} role="alert">
            {this.state.message}
          </div>
        );
      }
    }
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
          <h1>Inscrivez-vous!</h1>
          <AutoForm onChange={ this._onChange } onSubmit={this._onSubmit} trimOnSubmit={true}>
            <div role="form">
              <div className="form-group">
                <label htmlFor="name">Votre nom complet: :</label>
                <input type="text" id="name" name="nameGroupomania" value={this.state.nameGroupomania} placeholder="Votre nom complet..." aria-label="Votre nom complet" className="form-control" aria-describedby="btnSubmit" />
              </div>
              <div className="form-group">
                <label htmlFor="pseudo">Votre pseudo:</label>
                <input type="text" id="pseudo" name="pseudoGroupomania" value={this.state.pseudoGroupomania} placeholder="Votre pseudo..." className="form-control" aria-label="Votre pseudo" aria-describedby="btnSubmit" autoComplete="username" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Votre adresse email:</label>
                <input type="text" id="email" name="emailGroupomania" value={this.state.emailGroupomania} placeholder="Votre email (exemple: example@123.abc)..." className="form-control" aria-label="Votre adresse email" aria-describedby="btnSubmit" autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Votre mot de passe:</label>
                <div class="input-group mb-3">
                  <input id="password" type={this._displayType()} name="passwordGroupomania" value={this.state.passwordGroupomania} placeholder="Doit avoir au moins 8 caractères, contenir des majuscules et minuscules et doit avoir au moins 2 chiffres..." className="form-control" aria-label="Doit avoir au moins 8 caractères, contenir des majuscules et minuscules et doit avoir au moins 2 chiffres" aria-describedby="btnSubmit" autoComplete="off" />
                  <div class="input-group-append">
                    <button class="btn btn-secondary" aria-hidden="true" aria-label="Afficher ou masquer le mot de passe" onClick={this._handleView} type="button">{this._displayEye()}</button>
                  </div>
                </div>
              </div>
              {this._displayButton()}<br /><br />
              {this._displayMessage()}
            </div>
          </AutoForm>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUp;