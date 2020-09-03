import React from 'react';
import { PrincipalNavBar } from '../SubComponents/NavBar';
import { Editor } from '@tinymce/tinymce-react';

import Image from '../logo/icon-above-font.png';
import { addArticle } from '../API/article';

import { tinyApiKey } from '../API/helper';


class NewArticle extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Ajouter un article - Groupomania";
    if (localStorage.getItem('idUserGroupomania') === null || localStorage.getItem('tokenGroupomania') === null) {
      window.location.href = '/signup';
    }
    this.state= {
      title: "",
      subtitle: "",
      content: "",
      message: ""
    };
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
      idUser: localStorage.getItem('idUserGroupomania'),
      title: this.state.title,
      subtitle: this.state.subtitle,
      content: this.state.content
    };
    addArticle(toSend, localStorage.getItem('tokenGroupomania'))
      .then(data => {
        if (data.create && data.create === true) {
          window.location.href = '/application/allArticle';
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
        <PrincipalNavBar />
        <div className="container" role="main">
          <div className="text-center">
            <img alt="Logo de groupomania" title="Notre logo" aria-label="Logo de Groupomania" src={Image} width="300" height="300" />
          </div>
          <h1>Créer un article: </h1>
          <div role="form">
            <div className="form-group">
              <lable htmlFor="title">Le titre:</lable>
              <input className="form-control" onChange={this._handleTitle} minLength={2} maxLength={100} id="title" type="text" />
            </div>
            <div className="form-group">
              <lable htmlFor="subtitle">Le sous-titre:</lable>
              <input className="form-control" minLength={2} onChange={this._handleSubTitle} maxLength={70} id="subtitle" type="text" />
            </div>
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

export default NewArticle;