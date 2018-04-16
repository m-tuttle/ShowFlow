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
            comment: [],
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
              var dbComments = [];
              console.log(res.data.length + ' 32');
              console.log(res.data[0].shows.length + ' 33')
              if(res.data[0].shows[0].length !== undefined) {
              for (var i = 0; i < res.data.length; i++) {
                for (var j = 0; j < res.data[i].shows.length; j++) {
                    for (var k = 0; k < res.data[i].shows[j].length; k++) {
                      dbComments.push(res.data[i].shows[j].showcomments[k])
                      console.log('made it')
                    }
                }
              }}
              console.log(dbComments);
              this.setState({ comment: dbComments })
            })
        this.interval = setInterval(() => 
          console.log('hi'), 1000);

      }
    
    componentWillUnmount() {
      setTimeout(function() {clearInterval(this.interval)}.bind(this), 1000);
    }

    

    addShow = event => {
        event.preventDefault();

        let userId = this.props.userId;
        let userName = this.props.userName;
        let saveId = event.target.parentElement.getAttribute("data-id");
        let saveTitle = event.target.parentElement.getAttribute("data-title");
        let saveImage = event.target.parentElement.getAttribute("data-image");
        let saveStatus = event.target.getAttribute("data-status");

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

    submitComment = event => {
        event.preventDefault();
        var text = document.getElementById("commentText");
        var commentText = text.value;
        let userId = this.props.userId;
        let showTitle = this.props.match.params.name;
        Internal.postComment({userId, showTitle, commentText}).then(res => {
        alert('Comment Added!')});
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
                        <Col s={1}>
                        <Modal header={this.state.show.name} trigger={<Button className='white blue-text'
                            >
                              Update
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
                        </Col>
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
                          {this.state.comment.map( x => this.state.comment[x].shows.map( y => (<div className='card horizontal' key={y._id}>
                          <div className='card-stacked'><p className='right'>{y.showtitle}</p></div>
                          </div>)))}
                          </div>
                        <form>
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