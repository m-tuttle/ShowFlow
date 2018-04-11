import React from 'react';
import Internal from '../utils/Internal'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
        };
    }

    componentDidMount = () => {
        Internal.getUser(this.props.userId)
            .then(res => this.setState({ user: res.data[0] }));
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
                        <ul>
                            <li><h5>{this.state.user.name}</h5></li>
                        </ul>
                    </div>
                </div >

                <div className="row card-panel">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s4"><a href="#watched">Watched</a></li>
                            <li className="tab col s4"><a href="#watching">Watching</a></li>
                            <li className="tab col s4"><a href="#want">Want to Watch</a></li>
                        </ul>
                    </div>
                    <div id="watched" className="col s12"></div>
                    <div id="watching" className="col s12"></div>
                    <div id="want" className="col s12"></div>
                </div>




            </div >
        )
    }

}

export default Profile;