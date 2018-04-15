import React from 'react';
import Internal from '../utils/Internal';
import { Link } from 'react-router-dom'
import { Tabs, Tab } from 'react-materialize';
import "./Profile.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            load: false,
            myProfile: false,
        };
    }

    componentDidMount = () => {
        if (this.props.userId === this.props.match.params.id) {
            this.setState({ myProfile: true });
        }
        Internal.getUser(this.props.match.params.id)
            .then(res => this.setState({ user: res.data[0] }))
            .then(() => {
                if (this.state.user.shows) {
                    this.setState({ load: true });
                }
            })
    }

    componentWillReceiveProps(nextProps) {
        nextProps.match.params.id === this.props.userId ? this.setState({ myProfile: true }) : this.setState({ myProfile: false });
        
        Internal.getUser(nextProps.match.params.id)
            .then(res => this.setState({ user: res.data[0] }))
                .then(() => {
                    if (this.state.user.shows) {
                        this.setState({ load: true });
                    }
                })

    }

    deleteShow = (event) => {
        event.preventDefault();
        let userId = this.props.userId;
        let saveId = event.target.getAttribute("data-update");
        Internal.deleteShow({userId, saveId}).then(() => {       
            this.componentDidMount();
      })
    }

    updateShow = (event) => {
        event.preventDefault();
        let userId = this.props.userId;
        let showId = event.target.getAttribute("data-update");
        let updateStatus = event.target.getAttribute("data-status");
        let userName = this.state.user.name;
        let showTitle = event.target.getAttribute("data-showname");
        let showImage = event.target.getAttribute("data-showimg");
        Internal.updateShow({userId, showId, updateStatus, userName, showTitle, showImage}).then(() => {
            this.componentDidMount();
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row card-panel">
                    <div className="col s6">
                        <img className="responsive-img left circle responsive-img" id='profpic' src={`https://robohash.org/${this.props.userId}png?bgset=bg2&size=250x250`} alt="Profile" />
                    </div>
                    <div className="col s1"></div>
                    <div className="col s5">
                        {(this.state.myProfile) && <h3>My Profile</h3>}
                        <ul>
                            <li><h5>{this.state.user.name}</h5></li>
                        </ul>
                    </div>
                </div >

                {(this.state.load) && 
                <div className="row card-panel">
                    <div className="col s12 userResultsDiv">
                        <Tabs className='tab-demo z-depth-1'>
                            <Tab 
                            title={`Watched (${this.state.user.shows.filter(e => e.showstatus === 'watched').length})`}>
                                <div id="resultsDiv" className="scrollmenu">
                                    <div className="row">
                                        {(this.state.load) && this.state.user.shows.map(element => {
                                            if (element.showstatus === 'watched') {
                                                return (
                                                    <div className=" stuff" key={element.showid}>
                                                        <div className="card">
                                                            <div className="card-image">
                                                                <center>
                                                                    <img src={element.showimage} alt={element.title} />
                                                                </center>
                                                                <br />
                                                            </div>
                                                            <Link to={`/show/${element.showtitle}`}><span className="card-title">{element.showtitle}</span></Link>
                                                            <hr />

                                                            {this.state.myProfile &&
                                                            <div className='card-content'>
                                                            <a className="btn-flat activator" data-update={element.showid}
                                                            data-showname={element.showtitle}
                                                            data-showimg={element.showimage}>Update</a>
                                                            <a className="btn-flat" data-update={element.showid} onClick={this.deleteShow}>Remove</a>
                                                            </div>}

                                                            <div className="card-reveal">
                                                            <span className="card-title grey-text text-darken-4 mbot">{element.showtitle}<i className="material-icons right">close</i></span>
                                                            <button
                                                            onClick={this.updateShow}
                                                            className="btn waves-effect waves-light white-text mbot"
                                                            data-status="queued"
                                                            data-update={element.showid}
                                                            data-showname={element.showtitle}
                                                            data-showimg={element.showimage}>
                                                                Add to Watchlist
                    
                                                            </button>
                                                            <br />
                                                            <button
                                                            onClick={this.updateShow}
                                                            className="btn waves-effect waves-light white-text mbot"
                                                            data-status="watching"
                                                            data-update={element.showid}
                                                            data-showname={element.showtitle}
                                                            data-showimg={element.showimage}
                                                            >
                                                                Currently Watching
                                                            
                                                            </button>
                                                            <br />
                                                            <button
                                                            onClick={this.updateShow}
                                                            className="btn waves-effect waves-light white-text mbot"
                                                            data-status="watched"
                                                            data-update={element.showid}
                                                            data-showname={element.showtitle}
                                                            data-showimg={element.showimage}
                                                            >
                                                                Watched
                                                                
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </Tab>
                            <Tab 
                            title={`Watching (${this.state.user.shows.filter(e => e.showstatus === 'watching').length})`}>
                                <div id="resultsDiv" className="scrollmenu">
                                    <div className="row">
                                        {this.state.user.shows.map(element => {
                                            if (element.showstatus === 'watching') {
                                                return (
                                                    <div className=" stuff" key={element.showid}>
                                                        <div className="card">
                                                        <div className="card-image">
                                                            <center>
                                                                <img src={element.showimage} alt={element.title} />
                                                            </center>
                                                            <br />
                                                        </div>
                                                        <Link to={`/show/${element.showtitle}`}><span className="card-title">{element.showtitle}</span></Link>
                                                        <hr />

                                                        {this.state.myProfile &&
                                                            <div className='card-content'>
                                                            <a className="btn-flat activator" data-update={element.showid}
                                                            data-showname={element.showtitle}
                                                            data-showimg={element.showimage}>Update</a>
                                                            <a className="btn-flat" data-update={element.showid} onClick={this.deleteShow}>Remove</a>
                                                        </div>}

                                                        <div className="card-reveal">
                                                        <span className="card-title grey-text text-darken-4 mbot">{element.showtitle}<i className="material-icons right">close</i></span>
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="queued"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}>
                                                            Add to Watchlist
                
                                                        </button>
                                                        <br />
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="watching"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}
                                                        >
                                                            Currently Watching
                                                        
                                                        </button>
                                                        <br />
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="watched"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}
                                                        >
                                                            Watched
                                                            
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </Tab>
                            <Tab 
                            title={`Want to Watch (${this.state.user.shows.filter(e => e.showstatus === 'queued').length})`}>
                                <div id="resultsDiv" className="scrollmenu">
                                    <div className="row">
                                        {(this.state.load) && this.state.user.shows.map(element => {
                                            if (element.showstatus === 'queued') {
                                                return (
                                                    <div className=" stuff" key={element.showid}>
                                                        <div className="card">
                                                        <div className="card-image">
                                                            <center>
                                                                <img src={element.showimage} alt={element.title} />
                                                            </center>
                                                            <br />
                                                        </div>
                                                        <Link to={`/show/${element.showtitle}`}><span className="card-title">{element.showtitle}</span></Link>
                                                        <hr />

                                                        {this.state.myProfile &&
                                                        <div className='card-content'>
                                                        <a className="btn-flat activator" data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}>Update</a>
                                                        <a className="btn-flat" data-update={element.showid} onClick={this.deleteShow}>Remove</a>
                                                        </div>}

                                                        <div className="card-reveal">
                                                        <span className="card-title grey-text text-darken-4 mbot">{element.showtitle}<i className="material-icons right">close</i></span>
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="queued"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}>
                                                            Add to Watchlist
            
                                                        </button>
                                                        <br />
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="watching"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}
                                                        >
                                                            Currently Watching
                                                        
                                                        </button>
                                                        <br />
                                                        <button
                                                        onClick={this.updateShow}
                                                        className="btn waves-effect waves-light red mbot"
                                                        data-status="watched"
                                                        data-update={element.showid}
                                                        data-showname={element.showtitle}
                                                        data-showimg={element.showimage}
                                                        >
                                                            Watched
                                                            
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                }




            </div >
        )
    }

}

export default Profile;


