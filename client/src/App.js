import React, { Component } from 'react';
import { Navbar, NavItem, Icon, Input } from 'react-materialize';
import Shows from './components/Shows';
import Feed from './components/Feed'
import API from './utils/API';

class App extends Component {
    constructor() {
        super();
        this.state = {
        showpage: false,
        showTitle: "",
        showSummary: "",
        showNetwork: "",
        feed: []
        }
    }

    // componentDidMount() {
    //     this.loadFeed()
    //     .then(feed => this.setState({feed: {feed}}))};

    // loadFeed = () => {
    //     return fetch("/feed")
    //     .then(res => res.json())
    //     }
    

    handleFormSubmit = event => {
        event.preventDefault();
        API.searchShows(document.getElementById("search").value)
            .then(res => {
                console.log(res.data[0].show);
                this.setState(
                    { showTitle : res.data[0].show.name,
                    showSummary : res.data[0].show.summary,
                    showNetwork : res.data[0].show.network.name});
            })
            .catch(err => console.log(err));
    }

render() {

    return (
        <div className="app">

        {/* Navbar rendered on all pages */}

            <Navbar brand="ShowFlow" className="white" right>
                <NavItem href="#"><Input className="black-text" label="Search" type="text" id="search"><Icon className="black-text" type="submit">search</Icon></Input></NavItem>
                <NavItem href='#'><Icon className="black-text">home</Icon></NavItem>
                <NavItem href='#'><Icon className="black-text">notifications</Icon></NavItem>
                <NavItem href='#'><Icon className="black-text">power_settings_new</Icon></NavItem>
            </Navbar>

        {/* Test button */}

        <button onClick={this.handleFormSubmit}>Try (enter name in header search bar first)</button>

        {/* Show or feed display */}

        {/* Display show */}
        {!this.state.showpage && <Shows name={this.state.showTitle} summary={this.state.showSummary} network={this.state.showNetwork} />}

        {/* Display Feed */}
        {this.state.feedpage && <Feed shows={this.state.feed}/>}
            
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