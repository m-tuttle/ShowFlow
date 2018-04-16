import React from 'react';
import { CardPanel, Row, Col, Table, Button, ProgressBar, Modal } from 'react-materialize';
import Internal from '../utils/Internal';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import "./Show.css";
import { setInterval, clearInterval } from 'timers';

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: {},
            users: [],
            comments: [],
            timer: false
        }
    }

    componentDidMount() {
        API.searchShows(this.props.match.params.name)
            .then(res => {
                this.setState({ show: res.data[0].show })
            })

        Internal.getUsersByShow(this.props.match.params.name)
            .then(res => {
                this.setState({ users: res.data })
            })
        Internal.getComments(this.props.match.params.name)
            .then(res =>  {
              this.setState({comments : res.data})
            })


        this.interval = setInterval(() => 
        Internal.getComments(this.props.match.params.name)
        .then(res =>  {
          this.setState({comments : res.data})
        }), 1000);

      }
    
    componentWillUnmount() {
      setTimeout(function() {clearInterval(this.interval)}.bind(this), 1000);

    }

  

    addShow = event => {
        event.preventDefault();

        let userId = this.props.userId;
        let userName = this.props.userName;
        var saveId = event.target.parentElement.getAttribute("data-id");
        let saveTitle = event.target.parentElement.getAttribute("data-title");
        let saveImage = event.target.parentElement.getAttribute("data-image");
        let saveStatus = event.target.getAttribute("data-status");

        Internal.getUsersByShow(saveTitle).then(res => { 
          if(res.data.filter( e => e._id === userId).length === 0) {
        
          Internal.saveShow({userId, saveId, saveTitle, saveImage, saveStatus, userName}).then(res => {
            alert(`Show updated successfully!`)
          })
          } else {
            alert('You have already added this show. Please view your profile to update the status of this status.')
          } 
        })
    }

    submitComment = event => {
        event.preventDefault();
        var comment = document.getElementById("commentText").value;
        if (comment !== "") {

        var target = this.state.show.name;
        var userId = this.props.userId;
        var name = this.props.userName;
        var action = 'commented on';
        var showimg = this.state.show.image.medium;
        

        Internal.postComment({target, userId, name, action, showimg, comment});
        
        document.getElementById('subform').reset();
      }

      else {
        alert('Cannot submit empty comment.')
      }

    }

    render() {
        if (!this.state.show.name) {
            return <div>hi</div>
        } else {
            return <div id="show">
                <Row>
                  <h4 className="mtop center">
                    <span className='title'>{this.state.show.name}</span>
                  </h4>
                  <Col s={3}>
                    <CardPanel className="white-text">
                      <Row>
                        <img className="responsive-img" src={this.state.show.image.medium} alt="showposter" />
                      </Row>
                      <Row>
                       
                        <Modal header={this.state.show.name} trigger={<Button>  Add Show
                            </Button>}>
                          <div className='container' style={{width: '50%'}}>
                          <div data-id={this.state.show.id} data-title={this.state.show.name} data-image={this.state.show.image ? this.state.show.image.medium : "http://via.placeholder.com/210x295"}>
                            
                            <br /> <br />
                            <button style={{width: '100%'}} onClick={this.addShow} className="btn waves-effect waves-light red mbot" data-status="queued">
                              Add to Watchlist
                            </button>
                            <br />

                            <button style={{width: '100%'}} onClick={this.addShow} className="btn waves-effect waves-light red mbot" data-status="watching">
                              Currently Watching
                            </button>
                            <br />

                            <button style={{width: '100%'}} onClick={this.addShow} className="btn waves-effect waves-light red mbot" data-status="watched">
                              Watched
                            </button>
                          </div>
                          </div>
                        </Modal>
                        
                      </Row>
                    </CardPanel>
                  </Col>

                  <Col s={5}>
                    <CardPanel className="white-text">
                      <Row>
                        <b>Summary</b>
                      </Row>
                      <Row>
                        {this.state.show.summary.replace(
                          /<(?:.|\n)*?>/gm,
                          ""
                        )}
                      </Row>
                    </CardPanel>
                  </Col>

                  <Col s={4}>
                    <CardPanel className="white-text">
                      <Row>
                        <b>Show Info</b>
                      </Row>
                      <Table>
                        <tbody>
                          <tr>
                            <td>Network:</td>
                            <td>
                              {this.state.show.network
                                ? this.state.show.network.name
                                : this.state.show.webChannel.name}
                            </td>
                          </tr>
                          <tr>
                            <td>Status:</td>
                            <td>{this.state.show.status}</td>
                          </tr>
                          <tr>
                            <td>Genres:</td>
                            <td>
                              {this.state.show.genres.join(" | ")}
                            </td>
                          </tr>
                          <tr>
                            <td>Rating:</td>
                            <td>
                              {this.state.show.rating.average}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </CardPanel>
                  </Col>
                </Row>

                <Row>
                  <Col s={3}>
                    <CardPanel className="white-text">
                      <Row>
                        <p>Friends Watching</p>
                        <ul>
                          {this.state.users.length && this.state.users.map(
                              elem => (
                                <li key={elem._id}>
                                  <Link
                                    to={`../profile/${elem._id}`}
                                  >
                                    {elem.name}
                                  </Link>
                                </li>
                              )
                            )}
                        </ul>
                      </Row>
                    </CardPanel>
                  </Col>

                  <Col s={8}>
                    <Row>
                      <div id="showCommentDiv">
                        <div id="displayComments">
                          {this.state.comments.map( x => 
                          <div className='card horizontal commentCard' key={x._id}>
                          <div className='card-stacked'>
                            {x.comment}
                            
                            <span className='right-align'><Link to={`/profile/${x.userId}`}>{x.name}</Link></span> 
                            <span className='right-align'>{new Date(x.date).toLocaleDateString("en-us", {
                            year: "numeric", month: "short",
                            day: "numeric", hour: "2-digit", minute: "2-digit"
                          })}</span>
                          </div>
                          
                          </div>)}
                          </div>
                        <form id='subform'>
                          <input type="text" placeholder="comment field" id="commentText" />
                          <br />
                          <button onClick={this.submitComment}>
                            Submit
                          </button>
                        </form>
                        </div>
                  </Row>
                  </Col>
                </Row>
              </div>;
        }
    }
}

export default Show;