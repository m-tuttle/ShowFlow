import React from 'react';
import Internal from '../utils/Internal';
import {Tabs, Tab} from 'react-materialize';

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
                        <Tabs className='tab-demo z-depth-1'>
                            <Tab title="Watched">I watched these shows</Tab>
                            <Tab title="Watching" active>I am watching these shows</Tab>
                            <Tab title="Want to Watch">I want to watch these shows</Tab>
                        </Tabs>
                    </div>
                </div>




            </div >
        )
    }

}

export default Profile;