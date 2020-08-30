import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';
import { getOneUser, updateOneUser } from '../API/users';
import Image from '../logo/icon-above-font.png';
import validator from 'validator';

import '../CSS/myProfileEdit.css';

class MyProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Modifier mon profil - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
    this.state = { userInfo: { }, isLoading: true, valid: true, message: "" };
  }

  componentDidMount() {
    getOneUser(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'))
      .then(json => {
        this.setState({
          userInfo: json.userInfo,
          isLoading: false
        });
      })
      .catch(() => { 
        this.setState({ message: "Une erreur a eu lieu" });
        setTimeout(() => {
          window.location.href = "/application/myProfile";
        }, 1750);
      });
  }

  _displaySpinner = () => {
    return this.state.isLoading ? <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div> : null;
  }

  _displayButton = () => {
    return this.state.valid === true ? <button className="btn btn-success" onClick={this._handleSubmit} role="button" id="btnSubmit">Enregistrer</button> : <button role="button" className="btn btn-success disabled" id="btnSubmit" disabled>Enregistrer</button>
  } 

  _handle = (event) => {
    switch (event.target.name) {
      case 'name':
        this.setState({ userInfo: { ...this.state.userInfo, name: event.target.value } });

        if (event.target.value.trim().length >= 4 && this.state.userInfo.pseudo.trim().length >= 4 && validator.isEmail(this.state.userInfo.email.trim())) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
        break;
    
      case 'pseudo':
        this.setState({ userInfo: { ...this.state.userInfo, pseudo: event.target.value } });

        if (event.target.value.trim().length >= 4 && this.state.userInfo.name.trim().length >= 4 && validator.isEmail(this.state.userInfo.email.trim())) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
        break;
      
      case 'email':
        this.setState({ userInfo: { ...this.state.userInfo, email: event.target.value } });

        if (this.state.userInfo.pseudo.trim().length >= 4 && this.state.userInfo.name.trim().length >= 4 && validator.isEmail(event.target.value.trim())) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
        break;
    }
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append('pdp', this.state.userInfo.pdpUrl);
    data.append('name', this.state.userInfo.name);
    data.append('email', this.state.userInfo.email);
    data.append('pseudo', this.state.userInfo.pseudo);

    updateOneUser(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'), data)
      .then(json => {
        const response = json;
        console.log(response);
        if (response.update === true) {
          window.location.href = "/application/myProfile";
        } else if (response.existEmail === true) {
          this.setState({ message: "Cette adresse email est déjà existante" });
        } else if (response.existPseudo === true) {
          this.setState({ message: "Ce pseudo est déjà existant" });
        } else if (response.valideForm === false) {
          this.setState({ message: "Des champs ne sont pas valides" });
        } else if (response.badFile === true) {
          this.setState({ message: "Le format de fichier est invalide (*.jpg, *.jpeg, *.png)" });
        } else {
          this.setState({ message: "Une erreur inconnu a eu lieu" });
        }
      })
      
  }

  _handlePdp = (event) => {
    this.setState({ userInfo: { ...this.state.userInfo, pdpUrl: event.target.files[0] } });
  }

  _getImage = () => {
    if (typeof this.state.userInfo.pdpUrl === "object") {
      return URL.createObjectURL(this.state.userInfo.pdpUrl); 
    } else if (typeof this.state.userInfo.pdpUrl === "string") {
      return this.state.userInfo.pdpUrl;
    }
  }

  _displayMessage = () => {
    return this.state.message.length > 0 ? (
      <div className="alert alert-danger" role="alert">
        {this.state.message}
      </div>
    ): null;
  }

  render() {
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container">
          <div>
            {this._displaySpinner()}
            <div className="text-center">
              <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
            </div>
            <h1>Modifiez votre profil:</h1>
            <div role="form">
              <div className="form-group">
                <label htmlFor="name">Nom Complet: </label>
                <input type="text" className="form-control" aria-describedby="btnSubmit" placeholder="Entrez votre nouveau nom complet..." aria-label="Votre nouveau nom complet" onChange={this._handle} name="name" id="name" value={this.state.userInfo.name} />
              </div>
              <div className="form-group">
                <label htmlFor="pseudo">Pseudo: </label>
                <input type="text" className="form-control" aria-describedby="btnSubmit" placeholder="Entrez votre nouveau pseudo..." aria-label="Votre nouveau pseudo" id="pseudo" onChange={this._handle} name="pseudo" value={this.state.userInfo.pseudo} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Adresse email: </label>
                <input type="email" className="form-control" aria-describedby="btnSubmit" placeholder="Entrez votre nouvelle adresse email..." aria-label="Votre nouvelle adresse email" id="email" onChange={this._handle} name="email" value={this.state.userInfo.email} />
              </div>
              <div className="form-group">
                <label htmlFor="pdp" className="label-file">Photo de profil</label>
                <input type="file" className="input-file" aria-describedby="btnSubmit" aria-hidden="true" aria-label="Choissisez votre nouvelle photo de profile" accept="image/png, image/jpeg, image/jpg" id="pdp" onChange={this._handlePdp} />
              </div>
              <img src={this._getImage()} className="img-fluid" alt="Aperçu de votre photo de profile" title="Aperçu photo de profile" /><br /><br />
              {this._displayButton()}
              <br /><br />
              {this._displayMessage()}
              <br />
            </div>
          </div>
        </div>
      </React.Fragment> 
    );
  }
}

export default MyProfileEdit;