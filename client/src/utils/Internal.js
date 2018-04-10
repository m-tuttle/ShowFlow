import axios from "axios";

const Internal = {

    checkUser: (input) => {
        console.log(input.name);
        return axios.get("/checkuser", { params: input});
    },

    createUser: (name, password, email) => {

    }

}

export default Internal;