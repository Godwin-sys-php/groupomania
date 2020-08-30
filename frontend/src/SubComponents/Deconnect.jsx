import React from 'react';

class Deconnect extends React.Component {
  constructor(props) {
    super(props);
  }

  _deconnect = () => {
    localStorage.clear();
    window.location.href = "/bye";
  }

  render() {
    return (
      <a className="nav-link" href="#" onClick={this._deconnect}>Déconnexion</a>
    );
  }
}

export default Deconnect;