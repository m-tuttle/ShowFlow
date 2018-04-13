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
    return ( <div id="home">

        <div className="row">
        <div className="col s9" id="trendingDiv">
        <h1>testasdkfasnfjkaskbfjkabdfaljksdb</h1>
        <h1>testasdkfasnfjkaskbfjkab</h1>
        <h1>testasdkfasnfjkaskbfjkabdfa</h1>
        </div>
          <div className="col s3">
            <div className="row">
            <div className="col s12" id="trendingDiv">
            <h4>Top Trending...</h4>
            {this.state.topTrending.map(y => (
              <div className="card horizontal" key={y._id.showid}>
                <Link to={`/show/${y._id.showtitle}`}><div className="card-title">{y._id.showtitle}</div></Link>
              </div>
            ))}
            </div>
          <div className="row">
          <div className="col s12" id="userDiv">
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
          </div>
      </div>
          

        
      </div>
      </div>
    )}
}

export default Home;