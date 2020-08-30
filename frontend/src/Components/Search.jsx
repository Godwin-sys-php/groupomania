import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';

class Search extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Rechercher - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  render() {
    console.log(window.location);
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container">
          <h1>Cette partie est en cours de développement...</h1>
        </div>
      </React.Fragment> 
    );
  }
}

export default Search;