const API_ROOT = `http://localhost:3001/api/v1`;
const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json',
  Authorization: `Bearer ${token}`
};


const create = (fullname, username, password) => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json',
    },
    body: JSON.stringify({
      user: {
        name: fullname, 
        username: username, 
        password: password
      }
    })
  })
  .then(resp => resp.json())
}
 
const login = (username, password) => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      user: { 
        username, 
        password 
      }
    })
  }).then(res => res.json())
};

const getCurrentUser = () => {
  return fetch(`${API_ROOT}/profile`, {
    headers: headers
  }).then(res => res.json());
};

export default {
  auth: {
    create,
    login,
    getCurrentUser
  }
};
