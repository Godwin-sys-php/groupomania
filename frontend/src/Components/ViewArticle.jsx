import React from 'react';
import { NavBar } from '../SubComponents/NavBar';
import Deconnect from '../SubComponents/Deconnect';
import { getOneArticle, getComment, addComment, deleteArticle, deleteComment } from '../API/article';
import { getOneUser } from '../API/users';

import { tinyApiKey } from '../API/helper';
import { Editor } from '@tinymce/tinymce-react';

import moment from 'moment';

import '../CSS/ViewArticle.css';

class ViewArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      article: {},
      articleComment: null,
      message: "",
      comment: "",
      isReady: false,
      users: [],
      isAdmin: false
    };
    this.idArticle = this.props.match.params.idArticle;

    document.title = "Article - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  componentDidMount() {
    getOneArticle(this.idArticle, localStorage.getItem('tokenGroupomania'))
      .then(article => {
        if (article.empty && article.empty === true) {
          this.setState({ message: "L'article que vous chercher est inexistant" });
        } else {
          if (article && article.get === true) {
            this.setState({ article: article.result, message: "" });
            getOneUser(article.result.idUser, localStorage.getItem('tokenGroupomania'))
              .then(user => {
                this.setState({ userInfo: user.userInfo, message: "" });
              })
              .catch(() => {
                this.setState({ message: "Une erreur a eu lieu" });
              })
            getComment(this.idArticle, localStorage.getItem('tokenGroupomania'))
              .then(data => {
                if (data.get && data.get === true) {
                  if (data.empty && data.empty === true) {
                    this.setState({ articleComment: false });
                  } else {
                    this.setState({ articleComment: data.results }, () => {
                      for (let index in this.state.articleComment) {
                        getOneUser(this.state.articleComment[index].idUser, localStorage.getItem('tokenGroupomania'))
                          .then(data => {
                            if (data.get && data.get === true) {
                              this.setState({ users: [...this.state.users, data.userInfo] }, () => {
                                if (index == this.state.articleComment.length - 1) {
                                  this.setState({ isReady: true });
                                }
                              });
                            }
                          });
                      }
                    });
                  }
                } else {
                  this.setState({ message: "Une erreur a eu lieu" });
                }
              })
              .catch(() => {
                this.setState({ message: "Une erreur a eu lieu" });
              });
          } else {
            this.setState({ message: "Une erreur a eu lieu" });
          }
        }
      })
      .catch(() => {
        this.setState({ message: "Une erreur a eu lieu" });
      });
    getOneUser(localStorage.getItem('idUserGroupomania'), localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.userInfo.isAdmin == 1) {
          this.setState({ isAdmin: true });
        } else {
          this.setState({ isAdmin: false });
        }
      })
      .catch(() => {
        this.setState({ message: "Une erreur a eu lieu" });
      });
  }

  _getProfile = () => {
    const a = moment(parseInt(this.state.userInfo.createAt));
    return (
      <React.Fragment>
        <br />
        <div className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-2">
              <img src={this.state.userInfo.pdpUrl} className="img-fluid" alt={`Voici la photo de profile de ${this.state.userInfo.pseudo}`} title={`Photo de profile de ${this.state.userInfo.pseudo}`} />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <h3 className="card-title">Par: <a href={`/application/profile/${this.state.userInfo.idUser}`}>@{this.state.userInfo.pseudo}</a></h3>
                <p className="card-text"><small className="text-muted">Publier le {a.format('DD/MM/YYYY [à] HH:mm')}</small></p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _deleteArticle = () => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer cet article et tout ses commentaires')) {
      deleteArticle(this.idArticle, localStorage.getItem('tokenGroupomania'))
        .then(data => {
          if (data.delete && data.delete === true) {
            window.location.href = "/application/allArticle";
          }
        })
    }
  }

  _deleteComment = (idComment) => {
    if (window.confirm('Êtes vous sûr de vouloir supprimer ce commentaire')) {
      deleteComment(idComment, localStorage.getItem('tokenGroupomania'))
        .then(data => {
          if (data.delete && data.delete === true) {
            window.location.reload();
          }
        });
    }
  }

  _displayButton = () => {
    if (this.state.article.idUser === parseInt(localStorage.getItem('idUserGroupomania')) || this.state.isAdmin) {
      return (
        <div>
          <a href={`/application/article/${this.idArticle}/edit`}><button className="btn btn-warning">Modifier</button></a>
          &nbsp;&nbsp;&nbsp;
          <button className="btn btn-danger" onClick={this._deleteArticle}>Supprimer</button>
        </div>
      );
    }
  }

  _displayButtonSecondary = () => {
    if (this.state.comment.length >= 2) {
      return (
        <button onClick={this._handleSubmit} className="btn btn-success">Confirmer</button>
      );
    } else {
      return (
        <button className="btn btn-success disabled" disabled>Confirmer</button>
      );
    }
  }

  _handleEditorChange = (content, editor) => {
    this.setState({ comment: content });
  }

  _displayComment = () => {
    if (this.state.articleComment == null) {
      return (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.state.articleComment == false) {
      return (
        <div className="text-center">
          Aucun commentaire n'a été publié
        </div>
      );
    } else {
      if (this.state.isReady) {
        let arrayElement = [];
        for (let index in this.state.articleComment) {
          const a = moment(parseInt(this.state.articleComment[index].time));
          if (this.state.articleComment[index].idUser == localStorage.getItem('idUserGroupomania') || this.state.isAdmin) {
            arrayElement.push(
              <React.Fragment>
                <div className="card" key={this.state.articleComment[index].idComment}>
                  <div className="row no-gutters">
                    <div className="col-md-2">
                      <div className="border">
                        <a href={`/application/profile/${this.state.users[index].idUser}`}>
                          <img src={this.state.users[index].pdpUrl} className="img-fluid" alt={`Voici la photo de profile de ${this.state.users[index].pseudo}`} title={`Photo de profile de ${this.state.users[index].pseudo}`} />
                          <div className="text-center">
                            @{this.state.users[index].pseudo}
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <p className="card-text">
                          <small className="text-muted">Publier le {a.format('DD/MM/YYYY [à] HH:mm')}</small>
                          &nbsp;&nbsp;
                          <a href={`/application/comment/${this.state.articleComment[index].idComment}/edit`}>Modifier</a>
                          &nbsp;&nbsp;
                          <span className="Link" onClick={() => { this._deleteComment(this.state.articleComment[index].idComment); }}>Supprimer</span>
                        </p>
                        <p className="mb-1" dangerouslySetInnerHTML={{__html: this.state.articleComment[index].content}}></p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </React.Fragment>
            );
          } else {
            arrayElement.push(
              <React.Fragment>
                <div className="card">
                  <div className="row no-gutters">
                    <div className="col-md-2">
                      <div className="border">
                        <a href={`/application/profile/${this.state.users[index].idUser}`}>
                          <img src={this.state.users[index].pdpUrl} className="img-fluid" alt={`Voici la photo de profile de ${this.state.users[index].pseudo}`} title={`Photo de profile de ${this.state.users[index].pseudo}`} />
                          <div className="text-center">
                            @{this.state.users[index].pseudo}
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <p className="card-text"><small className="text-muted">Publier le {a.format('DD/MM/YYYY [à] HH:mm')}</small></p>
                        <p className="mb-1" dangerouslySetInnerHTML={{__html: this.state.articleComment[index].content}}></p>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </React.Fragment>
            );
          }
        }
        return arrayElement;
      } else {
        return (
          <div className="spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        );
      }
    }
  }

  _handleSubmit = () => {
    const toSend = {
      idUser: localStorage.getItem('idUserGroupomania'),
      content: this.state.comment
    }
    addComment(this.idArticle, toSend, localStorage.getItem('tokenGroupomania'))
      .then(result => {
        window.location.reload();
      })
  }

  _displayAll = () => {
    if (this.state.message.length > 0) {
      document.title = `Erreur - Groupomania`;
      return (
        <div className="text-center">
          <br />
          <h1><em>{this.state.message}</em></h1>
        </div>
      );
    } else {
      document.title = `${this.state.article.title} - Groupomania`;
      return (
        <React.Fragment>
          <h1>{this.state.article.title}</h1>
          <h2 className="text-muted">{this.state.article.subtitle}</h2>
          {this._getProfile()}
          {this._displayButton()}
          <br />
          <div className="card" role="article">
            <div className="card-body" dangerouslySetInnerHTML={{__html: this.state.article.content}}></div>
          </div>
          <br />
          <h2>Commentaire: </h2>
          <Editor
              apiKey={tinyApiKey}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks fullscreen',
                  'insertdatetime media table paste help wordcount codesample'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat image codesample | help'
              }}
              onEditorChange={this._handleEditorChange}
          />
          <br />
          {this._displayButtonSecondary()}
          <br /><br />
          {this._displayComment()}
          <br /><br /><br />
        </React.Fragment>
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
            <li className="nav-item">
              <a className="nav-link" href="/application/myProfile">Mon profil</a>
            </li>
            <li className="nav-item">
              <Deconnect />
            </li>
          </ul>
        </NavBar>
        <div className="container" role="main">
          {this._displayAll()}
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default ViewArticle;