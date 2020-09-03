import { url } from './helper';

export function addArticle(toSend, token) {
  let init = {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/api/articles`, init)
    .then(response => response.json());
}

export function getAllArticle(token) {
  let init = {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles`, init)
    .then(response => response.json());
}

export function getOneArticle(idArticle, token) {
  let init = {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles/${idArticle}`, init)
    .then(response => response.json());
}

export function updateArticle(idArticle, toSend, token) {
  let init = {
    method: 'PUT',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/api/articles/${idArticle}`, init)
    .then(response => response.json());
}

export function deleteArticle(idArticle, token) {
  let init = {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles/${idArticle}`, init)
    .then(response => response.json());
}


export function getComment(idArticle, token) {
  let init = {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles/${idArticle}/comments`, init)
    .then(response => response.json());
}

export function addComment(idArticle, toSend, token) {
  let init = {
    method: 'POST',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/api/articles/${idArticle}/comments`, init)
    .then(response => response.json());
}

export function deleteComment(idComment, token) {
  let init = {
    method: 'DELETE',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles/comments/${idComment}`, init)
    .then(response => response.json());
}

export function getOneComment(idComment, token) {
  let init = {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer ' + token
    })
  };

  return fetch(`${url}/api/articles/comments/${idComment}`, init)
    .then(response => response.json());
}

export function updateComment(idComment, toSend, token) {
  let init = {
    method: 'PUT',
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      "Content-type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`${url}/api/articles/comments/${idComment}`, init)
    .then(response => response.json());
}