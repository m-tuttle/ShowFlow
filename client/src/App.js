import React, { Component } from 'react';
import Header from './components/Header';
import Chatroom from './components/Chatroom';
import Shows from './components/Shows';
import API from './utils/API';

class App extends Component {
    state = {
        showSearch: "",
        show: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.searchShows(document.getElementById("search").value)
            .then(res => {
                console.log(res.data[0].show);
                this.setState(
                    { show : res.data[0].show.name,
                    showSearch : res.data[0].show.url});
            })
            .catch(err => console.log(err));
    }

render() {
    return (
        <div className="app">
            <Header />
            <Shows />
            <div className="test">
            <button onClick={this.handleFormSubmit}>Start</button>
            <h1>{this.state.show}</h1>
            <h2>{this.state.showSearch}</h2>
            </div>
        </div>
    )
}

}

export default App;

// example materialize implementation
// import {Button, Icon} from 'react-materialize'
//
//        <Button waves='light'>
//        <Icon>thumb_up</Icon>
//        </Button>