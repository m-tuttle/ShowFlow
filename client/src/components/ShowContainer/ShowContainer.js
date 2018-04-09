import React, { Component } from "react";
import ShowDetail from "../Shows";
// import Discussion from "../Discussion"
// import API from "../utils/API";

class ShowContainer extends Component {

render() {
    return(
        <div className="AppClass">
        <Header />
            <ShowDetail />
            {/* <Discussion /> */}
        </div>
        )
}
}

export default ShowContainer;