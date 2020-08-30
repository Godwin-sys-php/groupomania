import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';
import Image from '../logo/icon-above-font.png';
import { getOneUser, loginUser, updateOneUser2 } from '../API/users';
import passwordValidator from 'password-validator';

import '@fortawesome/fontawesome-free/css/all.min.css'

class MyProfileEditPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      view: false
    };

    this.oldPassword = "";
    this.newPassword = "";
    this.messageType = "";

    document.title = "Modifiez votre mot de passe - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    if (this.oldPassword.trim().length > 6 && this.newPassword.trim().length > 6) {
      getOneUser(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'))
        .then(response => {
          const futureUser = response.userInfo;
          if (response.get === true) {
            const toSend = {
              identifiant: response.userInfo.pseudo,
              password: this.oldPassword
            };
            loginUser(toSend)
              .then(response => {
                if (response.identifiant && response.password) {
                  const schema = new passwordValidator();
                  schema
                    .is().min(8)
                    .has().uppercase()
                    .has().lowercase()
                    .has().digits(2);
                  
                  if (schema.validate(this.newPassword)) {
                    futureUser.password = this.newPassword;
                    updateOneUser2(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'), futureUser)
                      .then(response => {
                        if (response.update) {
                          this.messageType = "success";
                          this.setState({ message: "Votre mot de passe a bien été modifié" });

                          setTimeout(() => {
                            window.location.href = "/application/myProfile";
                          }, 2500);
                        } else {
                          this.messageType = "danger";
                          this.setState({ message: "Une erreur a eu lieu" });
                        }
                      })
                  } else {
                    this.messageType = "danger";
                    this.setState({ message: "Votre nouveau mot de passe n'est pas sécurisée. Il doit contenir des majuscules, minuscule, avoir au moins 8 caractères et au moins 2 chiffres" });
                  }
                } else {
                  this.messageType = "danger";
                  this.setState({ message: "Votre ancien mot de passe n'est pas correct" });
                }
              })
          } else {
            this.messageType = "danger";
            this.setState({ message: "Une erreur a eu lieu" });
          }
        })
        .catch(() => {
          this.messageType = "danger";
          this.setState({ message: "Une erreur a eu lieu" })
        });
    }
  }

  _displayMessage = () => {
    if (this.state.message.length > 0) {
      return <div className={`alert alert-${this.messageType}`} role="alert">
        {this.state.message}
      </div>
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
        <div className="container">
          <div className="text-center">
            <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
          </div>
          <h1>Modifiez votre mot de passe:</h1>
          <form>
            <div className="form-group">
              <label htmlFor="oldPassword">Entrez votre anciens mot de passe: </label>
              <input type="password" className="form-control" placeholder="Entrez votre ancien mot de passe..." aria-label="Votre ancien mot de passe" aria-describedby="btnSubmit" required onChange={(event) => { this.oldPassword = event.target.value; }} id="oldPassword" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Votre mot de passe:</label>
              <div class="input-group mb-3">
                <input id="newPassword" className="form-control" type={this._displayType()} placeholder="Entrez votre nouveau mot de passe..." aria-label="Votre nouveau mot de passe"  required onChange={(event) => { this.newPassword = event.target.value; }} id="newPassword" aria-describedby="btnSubmit" autoComplete="off" />
                <div class="input-group-append">
                  <button class="btn btn-secondary" aria-hidden="true" aria-label="Afficher ou masquer le mot de passe" onClick={this._handleView} type="button">{this._displayEye()}</button>
                </div>
              </div>
            </div>
            <button className="btn btn-success" type="submit" id="btnSubmit" onClick={this._handleSubmit}>Confirmer</button>
          </form>
          <br />
          {this._displayMessage()}
        </div>
      </React.Fragment>  
    );
  }
}

export default MyProfileEditPassword;