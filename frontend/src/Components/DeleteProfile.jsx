import React from 'react';

import { PrincipalNavBar } from '../SubComponents/NavBar';
import Image from '../logo/icon-above-font.png';

import AutoForm from 'react-auto-form';
import { loginUser, deleteOneUser } from '../API/users';

class Delete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      identifiantGroupomania: "",
      passwordGroupomania: "",
      valid: false,
      message: "",
    };
    this.messageType = "";
    document.title = "Supprimer mon compte - Groupomania";
    if (localStorage.getItem('tokenGroupomania') === null || localStorage.getItem('idUserGroupomania') === null) {
      window.location.href = "/signup";
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
          if (window.confirm('Êtes vous sûr de supprimer votre compte, ses publications et ses commentaires de façon définitive??!!!')) {
            deleteOneUser(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'))
              .then(response => {
                if (response.data.delete  === true) {
                  localStorage.clear();
                  window.location.href = "/sorry";
                } else {
                  this.messageType = "danger";
                  this.setState({ message: 'Une erreur a eu lieu' });
                }
              });
          } else {
            window.location.href = '/application/myProfile';
          }
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
    return this.state.valid === true ? <button className="btn btn-success" role="button" id="btnSubmit">Supprimer mon compte</button> : <button role="button" className="btn btn-success disabled" id="btnSubmit" disabled>Supprimer mon compte</button>
  }
  
  render() {
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container">
          <div className="text-center">
            <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
          </div>
          <h1>Connectez-vous avant la suppression de votre compte</h1>
          <AutoForm onChange={ this._onChange } onSubmit={this._onSubmit} trimOnSubmit={true}>
            <div className="form-group">
                <label htmlFor="identifiant">Votre pseudo ou adresse email:</label>
                <input type="text" id="identifiant" name="identifiantGroupomania" value={this.state.identifiantGroupomania} placeholder="Votre pseudo ou adresse email (exemple: example@123.abc)..." className="form-control" aria-labelledby="btnSubmit" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Votre mot de passe:</label>
              <input id="password" type="password" name="passwordGroupomania" aria-labelledby="btnSubmit" value={this.state.passwordGroupomania} placeholder="Votre mot de passe..." className="form-control" />
            </div>
            {this._displayButton()}
            <br /><br />
            {this._displayMessage()}
          </AutoForm>
        </div>
      </React.Fragment>
    );
  }
}

export default Delete;