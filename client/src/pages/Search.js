import React from 'react';
import API from '../utils/API';
import Internal from '../utils/Internal'
import { Link } from 'react-router-dom';
import "./Search/Search.css";

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
    }
  }

  componentDidMount() {
    var searchTerm = document.getElementById('search').value;
    API.searchShows(searchTerm)
      .then(res => this.setState({ shows: res.data }))
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.query !== this.props.match.params.query) {
      var searchTerm = document.getElementById('search').value;
      API.searchShows(searchTerm)
        .then(res => this.setState({ shows: res.data }))
    }

  }

  addShow = event => {
    event.preventDefault();
    
    let userId = this.props.userId;
    let saveId = event.target.parentElement.getAttribute("data-id");
    let saveTitle = event.target.parentElement.getAttribute("data-title");
    let saveImage = event.target.parentElement.getAttribute("data-image");
    let saveStatus = event.target.getAttribute("data-status");
    let userName = this.props.userName;

    Internal.getUsersByShow(saveTitle).then(res => { 
      if(res.data.filter( e => e._id === userId).length === 0) {
    
      Internal.saveShow({userId, saveId, saveTitle, saveImage, saveStatus, userName}).then(res => {
        alert(`Show updated successfully!`)
      })

      } else {
        alert('You have already added this show.')

      } 
    })
  }
  
    render() {
      return (
      <div>

        <div id="resultsDiv" className="scrollmenu">
          <div className="row">
            {this.state.shows.map(x => (
              <div className="stuff" key={x.show.id}>
                <div className="card">
                  <div className="card-image">
                    <center>
                      <Link to="/show"><img src={(x.show.image) ? x.show.image.medium : 'http://via.placeholder.com/210x295'} alt={x.show.name} /></Link>
                    </center>
                    <br />
                  </div>
                  <Link to={`/show/${x.show.name}`}><span className="card-title">{x.show.name}</span></Link>
                  <br />
                  <span className='white-text'>Premier: {x.show.premiered}</span>
                  <br /> <br />
                  
                  <div className='card-content'>
                  <button
                    className="btn-floating waves-effect waves-light red activator"
                  >
                    <i className="material-icons">add</i>
                  </button>
                  </div>

                  <div className="card-reveal"
                  data-id={x.show.id}
                  data-title={x.show.name}
                  data-image={(x.show.image) ? x.show.image.medium : 'http://via.placeholder.com/210x295'}>
                  <span className="card-title grey-text text-darken-4 mbot">{x.show.name}<i className="material-icons right">close</i></span>
                  <button
                    onClick={this.addShow}
                    className="btn waves-effect waves-light red mbot"
                    data-status="queued"
                  >
                    Add to Watchlist
                    
                  </button>
                  <br />
                  <button
                  onClick={this.addShow}
                  className="btn waves-effect waves-light red mbot"
                  data-status="watching"
                  >
                    Currently Watching
                   
                  </button>
                  <br />
                  <button
                   onClick={this.addShow}
                   className="btn waves-effect waves-light red mbot"
                   data-status="watched"
                  >
                    Watched
                    
                  </button>
                </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Search;