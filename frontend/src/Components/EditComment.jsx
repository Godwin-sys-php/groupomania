import React from 'react';
import { getOneComment, updateComment } from '../API/article';

import { NavBar } from '../SubComponents/NavBar';
import Deconnect from '../SubComponents/Deconnect';

import { Editor } from '@tinymce/tinymce-react';

import Image from '../logo/icon-above-font.png';

import { tinyApiKey } from '../API/helper';

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      message: ""
    };
    this.idComment = this.props.match.params.idComment;
    this.idArticle = "";

    document.title = "Modifier un commentaire - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  componentDidMount() {
    getOneComment(this.idComment, localStorage.getItem('tokenGroupomania'), localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.empty && data.empty === true) {
          window.location.href= '/application/allArticle'
        } else {
          this.setState({ content: data.results[0].content });
          this.idArticle = data.results[0].idArticle;
        }
      });
  }

  _handleEditorChange = (content, editor) => {
    this.setState({ content: content });
  }

  _displayButton = () => {
    if (this.state.content.length > 3) {
      return (
        <button className="btn btn-success" onClick={this._handleSubmit}>Confirmer</button>
      );
    } else {
      return (
        <button disabled className="btn btn-success disabled">Confirmer</button>
      );
    }
  }

  _handleSubmit = () => {
    const toSend = {
      content: this.state.content
    };
    updateComment(this.idComment, toSend, localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.update && data.update === true) {
          window.location.href = `/application/article/${this.idArticle}`;
          this.setState({ message: "" });
        } else if (data.invalidForm && data.invalidForm === true) {
          this.setState({ message: "Des champs ne sont pas valides" });
        } else {
          this.setState({ message: "Une erreur a eu lieu" });
        }
      })
      .catch(() => {
        this.setState({ message: "Une erreur a eu lieu" });
      });
  }

  _displayMessage = () => {
    if (this.state.message.length > 0) {
      return (
        <div role="alert" className="alert alert-danger">
          {this.state.message}
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
              <li className="nav-item">
                  <a className="nav-link" href="/application/myProfile">Mon profil</a>
              </li>
              <li className="nav-item">
                  <Deconnect />
              </li>
          </ul>
        </NavBar>
        <div className="container" role="main">
          <div className="text-center">
            <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
          </div>
          <h1>Modifier un commentaire: </h1>
          <div role="form">
            <Editor
              apiKey={tinyApiKey}
              initialValue={this.state.content}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks fullscreen',
                  'insertdatetime media table paste help wordcount codesample'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat image codesample | help'
              }}
              onEditorChange={this._handleEditorChange}
            />
            <br />
            {this._displayMessage()}
            <br />
            {this._displayButton()}
            <br />
            <br />
          </div>
        </div>
      </React.Fragment> 
    );
  }
}

export default EditComment;