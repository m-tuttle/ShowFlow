import axios from "axios";

export default {
  searchShows: function(query) {
    return axios.get("http://api.tvmaze.com/search/shows?q=", { params: { q : query } });
  }
};
