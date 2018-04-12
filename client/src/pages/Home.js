import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount = () => {
    return fetch(`/showallusers`)
    .then(response => response.json().then(json => this.setState({ users: json }))
    //   response => response.json().then(json => this.setState({ users: json }))
    );
  }

//   showUsers = event => {
//     event.preventDefault();
//     // var searchTerm = document.getElementById("showUserButton");
//     alert("hit");
//     return fetch(`/showallusers`)
//     .then(response => response.json().then(json => this.setState({ users: json }))
//     //   response => response.json().then(json => this.setState({ users: json }))
//     );
//   };

  render() {
    return <div id="home">
        <h1>Home</h1>

        <div className="row">
 

          <div className="col-sm-3 right">
            {this.state.users.map(x => (
              <div class="card horizontal" key={x._id}>
                <div class="card-image">
                  <img
                    className="image-responsive"
                    src="http://via.placeholder.com/75x75"
                    alt={x.name}
                  />
                </div>
                <div class="card-stacked">
                  <center>
                    <Link to={`/profile/${x._id}`}> <span className="card-title">{x.name}</span> </Link>
                  </center>
                  <div class="card-content">
                    <p>The activity will go here: Jeremy just joined!</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>;
  }
}

export default Home