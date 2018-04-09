import React, { Component } from 'react';
import { Navbar, NavItem, Icon, Input } from 'react-materialize';
import Chatroom from './components/Chatroom';
import Shows from './components/Shows';
import API from './utils/API';
import socketIOClient from 'socket.io-client'

class App extends Component {
    constructor() {
        super();
    
        this.state = {
            show : "",
            endpoint: "http://localhost:4001",
            color: 'white',
        }
    }

    // Socket functions

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }

  ///
  
  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }



    // App functions


    handleFormSubmit = event => {
        event.preventDefault();
        API.searchShows(document.getElementById("search").value)
            .then(res => {
                console.log(res.data[0].show);
                this.setState(
                    { show : res.data[0].show.name,
                    showSearch : res.data[0].show.image.medium});
            })
            .catch(err => console.log(err));
    }

render() {

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    return (
        <div className="app">
            <Navbar brand="ShowFlow" className="white" right>
                <NavItem href="#"><Input className="black-text" label="Search" type="text"><Icon className="black-text" type="submit">search</Icon></Input></NavItem>
                <NavItem href='#'><Icon className="black-text">home</Icon></NavItem>
                <NavItem href='#'><Icon className="black-text">notifications</Icon></NavItem>
                <NavItem href='#'><Icon className="black-text">power_settings_new</Icon></NavItem>
            </Navbar>
        
            <div className="test">
            <div style={{ textAlign: "center" }}>
        <button onClick={() => this.send() }>Change Color</button>

        <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
        <button id="red" onClick={() => this.setColor('red')}>Red</button>

      </div>
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