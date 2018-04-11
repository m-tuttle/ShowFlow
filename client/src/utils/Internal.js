import axios from "axios";

const Internal = {

    checkUser: (input) => {
        return axios.get("/checkuser", { params: input});
    },

    getUser: (id) => {
        return axios.get(`/getUser/${id}`);
    },
    
    createUser: (name, password, email) => {

    }

}

export default Internal;