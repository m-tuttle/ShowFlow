import React, { Component } from "react";
import Header from "../Header";
import ShowDetail from "../Shows";
// import API from "../utils/API";

class ShowContainer extends Component {

render() {
    return(
        <div className="AppClass">
        <Header />
            <ShowDetail />
        </div>
        )
}
}

export default ShowContainer;