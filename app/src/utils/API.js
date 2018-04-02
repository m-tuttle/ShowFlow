import axios from "axios";
const BASEURL = "http://api.tvmaze.com/search/shows?q=";

export default {
  search: function(query) {
    return axios.get(BASEURL + query);
  }
};
