import React from 'react';
import ViewProfile from '../SubComponents/ViewProfile';
import Deconnect from '../SubComponents/Deconnect';
import { NavBar } from '../SubComponents/NavBar';
import ViewPost from '../SubComponents/ViewPost';
import { getOneUser } from '../API/users';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid: null
    }

    document.title = `Profil - Groupomania`;

    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  componentDidMount() {
    getOneUser(this.props.match.params.idUser, localStorage.getItem('tokenGroupomania')) 
      .then(user => {
        if (user.get && user.get === true) {
          document.title = `${user.userInfo.pseudo} - Groupomania`; 
          this.setState({
            valid: true
          });
        } else {
          this.setState({
            valid: false
          });
        }
      });
  }

  _displayButton = () => {
    if (this.props.match.params.idUser == localStorage.getItem('idUserGroupomania')) {
      return (
        <React.Fragment>
          <a href="/application/myProfile/edit"><button role="button" className="btn btn-primary">Modifier</button></a>&nbsp;
          <a href="/application/myProfile/editPassword"><button role="button" className="btn btn-warning">Modifier mon mot de passe</button></a>&nbsp;
          <a href="/application/myProfile/deleteIt"><button role="button" className="btn btn-danger">Supprimer mon compte</button></a>&nbsp;
          <br /><br />
        </React.Fragment>
      )
    }
  }

  _displayAll = () => {
    if (this.state.valid === true) {
      return (
        <React.Fragment>
          <ViewProfile idUser={this.props.match.params.idUser} />
          {this._displayButton()}
          <h2>Articles:</h2>
          <ViewPost idUser={this.props.match.params.idUser} />
        </React.Fragment>
      );
    } else if (this.state.valid === false) {
      return (
        <div className="text-center">
          <h1>L'utilisateur que vous cherchez est introuvable</h1>
        </div>
      );
    } else {
      return (
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <NavBar>
          <ul className="navbar-nav"> 
            <li className="nav-item">
              <a className="nav-link" href="/application/allArticle">Tout les articles</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/application/newArticle">Ajouter un article</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/application/myProfile">Mon profil</a>
            </li>
            <li className="nav-item">
              <Deconnect />
            </li>
          </ul>
        </NavBar>
        <div className="container" role="main">
          {this._displayAll()}
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;