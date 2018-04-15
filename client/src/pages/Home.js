import React from 'react';
import "./Home.css";
import { Link } from "react-router-dom";
import { Row, Col } from 'react-materialize';
import Internal from "../utils/Internal";
import API from "../utils/API";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      topTrending: [],
      flow: [],
      targetImg: ''
    };
  }

  componentDidMount = () => {
    
    Internal.showUsers().then(response => this.setState({ users: response.data }));
    Internal.topTrending().then(response => this.setState({ topTrending: response.data }));
    Internal.getFlow().then(response => this.setState({ flow: response.data }));
    API.sayHiGif().then(res => this.setState({ targetImg: res.data.data[0].embed_url}));
 
  }


  render() {
    return ( <div id="home">

        <div className="row">
        <div className="col s9">
        {this.state.flow.map(x => 
        
        <div className='card horizontal row' key={x._id}>
        {/* Image */}
        <img className='circle col s2 responsive-img' src={`https://robohash.org/${x.userId}png?bgset=bg2&size=150x150`} alt={x.target} id='profpic'/>
        {/* Action and target */}
        
          <div className='col s5 white-text'>
          <p><Link to={`/profile/${x.userId}`}>{x.name}</Link> {x.action} <Link to={(x.target==='ShowFlow') ? "/" : `/show/${x.target}`}>{x.target}</Link>.</p>

          {(x.target==='ShowFlow') ? <iframe src={this.state.targetImg} width="120" height="120" frameBorder="0" className="giphy-embed right marright" allowFullScreen></iframe> : <img className='responsive-img marright right targetpic' src={x.showimg} alt={x.target} id='targetpic'/>}
          
          <p className='marpush'>{(x.target==='ShowFlow') ? "Say hi!" : `${x.target}`}</p>
          </div>
        {/* Date */}
        <div className='col s5'>
          <p className='right white-text'>{new Date(x.date).toLocaleDateString("en-us", {
                year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            })}</p>
        </div>
         
        </div>
        
        )}
        </div>
          <div className="col s3">
            <div className="row">
            <div className="col s12" id="trendingDiv">
            <h4 className="white-text">Top Trending...</h4>
            {this.state.topTrending.map(y => (
              <div className="card horizontal" key={y._id.showid}>
                <Link to={`/show/${y._id.showtitle}`}><div className="card-title">{y._id.showtitle}</div></Link>
              </div>
            ))}
            </div>
          <div className="row">
          <div className="col s12" id="userDiv">
            <h4 className="white-text">Users</h4>
            {this.state.users.map(x => (
              <div className="card horizontal" key={x._id}>
                <div className="card-image">
                  <img
                    className="image-responsive"
                    src={`https://robohash.org/${x._id}png?bgset=bg2&size=75x75`}
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
            <span className="white-text">Recently added: {(x.shows && x.shows.length) && <Link to={`show/${x.shows[x.shows.length-1].showtitle}`}>{x.shows[x.shows.length-1].showtitle}</Link>}</span>
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