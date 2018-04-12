import React from 'react';
import Internal from '../utils/Internal';
import { Tabs, Tab } from 'react-materialize';

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
        if (nextProps.match.params.id !== this.props.match.params.query) {
            this.setState({ load: false });
            if (nextProps.match.params.id !== this.props.userId) {
                this.setState({ myProfile: false });
            }
            Internal.getUser(nextProps.match.params.id)
                .then(res => this.setState({ user: res.data[0] }))
                .then(() => {
                    if (this.state.user.shows) {
                        this.setState({ load: true });
                    }
                })

        }
    }

    render() {
        return (
            <div className="container">
                <div className="row card-panel">
                    <div className="col s6">
                        <img className="responsive-img left" src="http://via.placeholder.com/250x250" alt="Profile" />
                    </div>
                    <div className="col s1"></div>
                    <div className="col s5">
                        {(this.state.myProfile) && <h3>My Profile</h3>}
                        <ul>
                            <li><h5>{this.state.user.name}</h5></li>
                        </ul>
                    </div>
                </div >

                <div className="row card-panel">
                    <div className="col s12">
                        <Tabs className='tab-demo z-depth-1'>
                            <Tab title="Watched">
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
                                                            <span className="card-title">{element.showtitle}</span>
                                                            <br />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Watching" active>
                                <div id="resultsDiv" className="scrollmenu">
                                    <div className="row">
                                        {(this.state.load) && this.state.user.shows.map(element => {
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
                                                            <span className="card-title">{element.showtitle}</span>
                                                            <br />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </Tab>
                            <Tab title="Want to Watch">
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
                                                            <span className="card-title">{element.showtitle}</span>
                                                            <br />
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




            </div >
        )
    }

}

export default Profile;