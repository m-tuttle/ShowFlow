import axios from "axios";

const API = {

  searchShows: (query) => {
    return axios.get("http://api.tvmaze.com/search/shows?q=", { params: { q : query } });
  }

}

export default API;
