import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';
import ViewProfile from '../SubComponents/ViewProfile';
import ViewPosts from '../SubComponents/ViewPost';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Mon profil - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  render() {
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container" role="main">
          <ViewProfile idUser={localStorage.getItem('idUserGroupomania')} />
          <a href="/application/myProfile/edit"><button className="btn btn-primary">Modifier</button></a>&nbsp;
          <a href="/application/myProfile/editPassword"><button className="btn btn-warning">Modifier mon mot de passe</button></a>&nbsp;
          <a href="/application/myProfile/deleteIt"><button className="btn btn-danger">Supprimer mon compte</button></a>&nbsp;
          <br /><br />
          <h2>Mes articles: </h2>
          <ViewPosts idUser={localStorage.getItem('idUserGroupomania')} />
        </div>  
      </React.Fragment> 
    );
  }
}

export default MyProfile;