import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
import Internal from "../utils/Internal";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      topTrending: []
    };
  }

  componentDidMount = () => {
    
    Internal.showUsers().then(response => this.setState({ users: response.data }));
    Internal.topTrending().then(response => this.setState({ topTrending: response.data }));
 
  }





  render() {
    return <div id="home">
        <h1>Home</h1>

        <div className="row">
          <div className="col-sm-3 right" id="trendingDiv">
            <h4>Top Trending...</h4>
            {this.state.topTrending.map(y => (
              <div className="card horizontal" key={y._id.showid}>
                <div className="card-title">{y._id.showtitle}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3 right" id="userDiv">
            <h4>Users</h4>
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
                    <Link to={`/profile/${x._id}`}>
                      {" "}
                      <span className="card-title">{x.name}</span>{" "}
                    </Link>
                    <br />
                    <span> I love TV shows SO much!!! </span>
                  </center>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>;
  }
}

export default Home