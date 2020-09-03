import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';
import { getAllArticle } from '../API/article';
import { getOneUser } from '../API/users';

import moment from 'moment';

class AllArticle extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Tout les articles - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }

    this.state = {
      articles: [],
      users: [],
      isLoading: true
    };
  }

  componentDidMount() {
    getAllArticle(localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.empty) {
          this.setState({ isLoading: false });
        } else {
          this.setState({ articles: data.results }, () => {
            for (let index in this.state.articles) {
              getOneUser(this.state.articles[index].idUser, localStorage.getItem('tokenGroupomania'))
                .then(data => {
                  this.setState({ users: [...this.state.users, data.userInfo] }, () => {
                    if (index == this.state.articles.length - 1) {
                      this.setState({ isLoading: false });
                    }
                  });
                });
            }
          });
        }
      });
  }

  _displayArticles = () => {
    let arrayElement = [];
    if (this.state.isLoading) {
      return (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.state.articles.length < 1) {
      return (
        <i>Aucun article</i>
      );
    } else {
      for (let index in this.state.articles) {
        const a = moment(this.state.articles[index].time);
        arrayElement.push(
          <a href={`/application/article/${this.state.articles[index].idArticle}`} className="list-group-item list-group-item-action">
            <div className="row no-gutters">
              <div className="col-md-2">
                <a href={`/application/profile/${this.state.users[index].idUser}`}>
                  <img src={this.state.users[index].pdpUrl} className="img-fluid" alt={`Voici la photo de profile de ${this.state.users[index].pseudo}`} title={`Photo de profile de ${this.state.users[index].pseudo}`} />
                  <div className="text-center">
                    @{this.state.users[index].pseudo}
                  </div>
                </a>  
              </div>
              <div className="col-md-10">
                <div className="card-body">
                  <h2 className="card-title">{this.state.articles[index].title}</h2>
                  <p class="mb-1">{this.state.articles[index].subtitle}</p>
                  <p className="card-text"><small className="text-muted">Publier le {a.format('DD/MM/YYYY [à] HH:mm')}</small></p>
                </div>
              </div>
            </div>
          </a>
        );
      }
      return arrayElement;
    }
  }

  render() {
    return (
      <React.Fragment>
        <PrincipalNavBar />
        <div className="container" role="main">
          <h1>Voici tout les articles: </h1>
          {this._displayArticles()}
        </div>
      </React.Fragment>
    );  
  }
}

export default AllArticle;