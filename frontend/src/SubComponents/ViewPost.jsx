import React from 'react';
import { getPostsOfOneUser } from '../API/users';

class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true, 
      error: false
    }
  }

  componentDidMount() {
    getPostsOfOneUser(this.props.idUser, localStorage.getItem('tokenGroupomania'))
      .then(json => {
        if (json.get === true) {
          this.setState({ posts: json.results, isLoading: false, error: false });
        } else {
          this.setState({ error: true });
        }
      })
      .catch(() => { this.setState({ error: true }); });
  }

  _displayPosts = () => {
    let arrayElement = [];
    for (let index in this.state.posts) {
      arrayElement.push(
        <a href={`/application/article/${this.state.posts[index].idArticle}`} class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1">{this.state.posts[index].title}</h3>
          </div>
          <p class="mb-1">{this.state.posts[index].subtitle}</p>
        </a>
      )
    }
    return arrayElement.length <= 0 ? <i>Aucun article</i> : arrayElement;
  }

  _displaySpinner = () => {
    return this.state.isLoading ? <div className="spinner-border text-danger" role="status">
      <span className="sr-only">Loading...</span>
    </div> : null;
  }

  _displayAll = () => {
    return !this.state.error ? (
      <React.Fragment>
        <div class="list-group" role="complimentary">
          {this._displaySpinner()}
          {this._displayPosts()}
        </div> 
        <br />
        <br />
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

export default ViewPost;