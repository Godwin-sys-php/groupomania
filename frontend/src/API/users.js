const axios = require('axios');

export function signUpUser(toSend) {
  let init = {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };

  return fetch('http://localhost:4200/api/auth/signup', init)
    .then(response => response.json());
}

export function loginUser(toSend) {
  let init = {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };

  return fetch('http://localhost:4200/api/auth/login', init)
    .then(response => response.json());
}

export function getOneUser(idUser, token) {
  let init = {
    method: "GET",
    headers: new Headers({
      'Authorization': 'Bearer '+token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  return fetch(`http://localhost:4200/api/users/${idUser}`, init)
    .then(response => response.json());
}

export function getPostsOfOneUser(idUser, token) {
  let init = {
    method: "GET",
    headers: new Headers({
      'Authorization': 'Bearer '+token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  return fetch(`http://localhost:4200/api/users/${idUser}/articles`, init)
    .then(response => response.json());
}

export function updateOneUser(idUser, token, toSend) {
  let init = {
    method: "PUT",
    body: toSend,
    headers: new Headers({
      'Authorization': 'Bearer '+token
    })
  };

  return fetch(`http://localhost:4200/api/users/${idUser}`, init)
    .then(response => response.json());
}

export function updateOneUser2(idUser, token, toSend) {
  let init = {
    method: "PUT",
    body: JSON.stringify(toSend),
    headers: new Headers({
      'Authorization': 'Bearer '+token, 
      "Content-Type": "application/json; charset=UTF-8"
    })
  };

  return fetch(`http://localhost:4200/api/users/${idUser}`, init)
    .then(response => response.json());
}

export function deleteOneUser(idUser, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  return axios.delete(
    `http://localhost:4200/api/users/${idUser}`,
    config
  );
}