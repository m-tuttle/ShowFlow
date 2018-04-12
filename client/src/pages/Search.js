import React from 'react';
import API from '../utils/API';
import Internal from '../utils/Internal'
import { Link } from 'react-router-dom';
import "./Search/Search.css";

class Search extends React.Component {
    
    constructor (props) {
        super(props);
         this.state = { 
           shows:[],
          }
    }

  componentDidMount() {
    var searchTerm = document.getElementById("search").value;
    API.searchShows(searchTerm)
    .then(res => this.setState( {shows : res.data} ))
  };
  
  
  addShow = event => {
    event.preventDefault();
  
    let saveId = event.target.parentElement.getAttribute("data-id");
    let saveTitle = event.target.parentElement.getAttribute("data-title");
    let saveImage = event.target.parentElement.getAttribute("data-image");

    var watched = [];
    watched.push(this.props.userId, saveId, saveTitle, saveImage);
    
    console.log(watched);
  
    Internal.saveShow({watched}).then(res => {
        alert("Show saved!")
  })
}
  
    render() {
      return (
      <div>
          
          <div id="resultsDiv" className="scrollmenu">
            <div className="row">
              {this.state.shows.map(x => (
                <div className=" stuff" key={x.show.id}>
                  <div className="card">
                    <div className="card-image">
                      <center>
                        <Link to="/show"><img src={(x.show.image) ? x.show.image.medium : 'http://via.placeholder.com/250x250'} alt={x.show.name}/></Link>
                      </center>
                      <br />
                    </div>
                    <span className="card-title">{x.show.name}</span>
                    <br />
                    <span>Premier: {x.show.premiered}</span>
                    <button
                      onClick={this.addShow}
                      className="btn-floating halfway-fab waves-effect waves-light red"
                      data-id={x.show.id}
                      data-title={x.show.name}
                      data-image={(x.show.image) ? x.show.image.medium : 'http://via.placeholder.com/250x250'}
                    >
                      <i className="material-icons">add</i>
                    </button>
  
                    <div className="card-content">
                      {/* <p>{x.show.summary}</p> */}
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