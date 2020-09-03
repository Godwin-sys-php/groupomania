import React from 'react';
import { getOneArticle } from '../API/article';
import { NavBar } from '../SubComponents/NavBar';
import Deconnect from '../SubComponents/Deconnect';

import { Editor } from '@tinymce/tinymce-react';

import Image from '../logo/icon-above-font.png';
import { updateArticle } from '../API/article';

import { tinyApiKey } from '../API/helper';

class EditArticle extends React.Component {
  constructor(props) {
    super(props);
    this.idArticle = this.props.match.params.idArticle;
    this.state = {
      title: "",
      subtitle: "",
      content: "",
      message: ""
    }

    document.title = "Modifier mon article - Groupomania";

    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
  }

  componentDidMount() {
    getOneArticle(this.idArticle, localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.get && data.get === true) {
          this.setState({
            title: data.result.title,
            subtitle: data.result.subtitle,
            content: data.result.content,
          });
        } else {
          this.setState({ message: "Une erreur a eu lieu" });
        }
      })
      .catch(() => {
        this.setState({ message: "Une erreur a eu lieu" });
      })
  }

  _handleEditorChange = (content, editor) => {
    this.setState({ content: content });
  }

  _handleTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  _handleSubTitle = (event) => {
    this.setState({ subtitle: event.target.value });
  }  

  _displayButton = () => {
    if ((this.state.title.length > 2 && this.state.title.length < 100) && (this.state.subtitle.length > 2 && this.state.subtitle.length < 70) && (this.state.content.length > 15)) {
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
      title: this.state.title,
      subtitle: this.state.subtitle,
      content: this.state.content
    };
    updateArticle(this.idArticle, toSend, localStorage.getItem('tokenGroupomania'))
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
          <h1>Modifier un article: </h1>
          <div role="form">
            <div className="form-group">
              <lable htmlFor="title">Le titre:</lable>
              <input className="form-control" onChange={this._handleTitle} value={this.state.title} minLength={2} maxLength={100} id="title" type="text" />
            </div>
            <div className="form-group">
              <lable htmlFor="subtitle">Le sous-titre:</lable>
              <input className="form-control" minLength={2} onChange={this._handleSubTitle} value={this.state.subtitle} maxLength={70} id="subtitle" type="text" />
            </div>
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
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat image codesample | help'
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

export default EditArticle;