import axios from "axios";
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const API = {

  searchShows: (query) => {
    return axios.get("http://api.tvmaze.com/search/shows?q=", { params: { q : query } });
  },

  subscribeToTimer: (cb) => {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 1000);
  },

  submitMessage: (msg) => {
    return fetch("/chatinsert", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({msg})
      }).then(res => res.json())
    },

  loadChats: (name) => {
    return fetch(`/chats/${name}`)
    .then(res => res.json())
    }
  }


export default API;
