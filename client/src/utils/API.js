import axios from "axios";

const API = {

  searchShows: (searchTerm) => {
    return axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
  }

}

export default API;
