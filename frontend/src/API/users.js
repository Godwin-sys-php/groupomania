import axios from "axios";
import { url } from './helper';

console.log(url);

export function signUpUser(toSend) {
  let init = {
    method: "POST",
    body: JSON.stringify(toSend),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  };
  
  return fetch(`${url}/api/auth/signup`, init)
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

  return fetch(`${url}/api/auth/login`, init)
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

  return fetch(`${url}/api/users/${idUser}`, init)
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

  return fetch(`${url}/api/users/${idUser}/articles`, init)
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

  return fetch(`${url}/api/users/${idUser}`, init)
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

  return fetch(`${url}/api/users/${idUser}`, init)
    .then(response => response.json());
}

export function deleteOneUser(idUser, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  
  return axios.delete(
    `${url}/api/users/${idUser}`,
    config
  );
}