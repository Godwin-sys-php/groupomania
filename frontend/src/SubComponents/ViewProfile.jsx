import React from 'react';
import { getOneUser } from '../API/users';

import moment from 'moment';

class ViewProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInfo: { }, isLoading: true, error: false };
  }

  componentDidMount() {
    getOneUser(this.props.idUser, localStorage.getItem('tokenGroupomania'))
      .then(json => {
        console.log(json);
        if (json.get === true) {
          this.setState({ userInfo: json.userInfo, isLoading: false, error: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => { this.setState({ error: true }) });
  }

  _displayAdmin = () => {
    return this.state.userInfo.isAdmin ? <b>Cette utilisateur est un administrateur</b> : null;
  }

  _displaySpinner = () => {
    return this.state.isLoading ? <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div> : null;
  }

  _displayAll = () => {
    if (!this.state.error) {
      var a= moment(parseInt(this.state.userInfo.createAt))
    }
    return !this.state.error ? (
      <React.Fragment>
        <br />
        <div class="card mb-3">
          <div class="row no-gutters">
            {this._displaySpinner()}
            <div class="col-md-4">
              <img src={this.state.userInfo.pdpUrl} class="card-img-top" alt={`Voici la photo de profile de ${this.state.userInfo.pseudo}`} title={`Photo de profile de ${this.state.userInfo.pseudo}`} />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h1 class="card-title">@{this.state.userInfo.pseudo}</h1>
                <p class="card-text">
                  <b>Nom</b>: {this.state.userInfo.name}<br />
                  <b>Adresse email</b>: {this.state.userInfo.email}<br />
                  <br />
                  {this._displayAdmin()}
                </p>
                <p class="card-text"><small class="text-muted">Membre depuis le {a.format('DD/MM/YYYY [à] HH:mm')}</small></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    ) : (
        <div className="alert alert-danger">
          Une erreur a eu lieu. Réssayer plus tard
        </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this._displayAll()}
      </React.Fragment>
    );
  }
}

export default ViewProfile;
