import axios from "axios";

const API = {

  searchShows: (searchTerm) => {
    return axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
  },

  sayHiGif: () => {
      return axios.get("https://api.giphy.com/v1/gifs/search?q=wave&limit=1&api_key=WHGVIfZL78URbxv0O7SI3TtGEJq3e0Zi");
  }

}

export default API;
