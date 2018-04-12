import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
import Internal from "../utils/Internal";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      topWatched: []
    };
  }

  componentDidMount = () => {
    
    Internal.showUsers().then(response => this.setState({ users: response.data })
    );
 
  }

  render() {
    return <div id="home">
        <h1>Home</h1>

        <div className="row">
 
        
          <div className="col-sm-3 right" id="userDiv">
            {this.state.users.map(x => (
              <div className="card horizontal" key={x._id}>
                <div className="card-image">
                  <img
                    className="image-responsive"
                    src="http://via.placeholder.com/75x75"
                    alt={x.name}
                  />
                </div>
                <div className="card-stacked">
                  <center>
                    <Link to={`/profile/${x._id}`}> <span className="card-title">{x.name}</span> </Link>
                  </center>
                  <div className="card-content">
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