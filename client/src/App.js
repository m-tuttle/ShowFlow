import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Internal from './utils/Internal';

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userId: ""
        };
    }

handleLogin = (event) => {
    event.preventDefault();
    var name = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    Internal.checkUser({name, password}).then(res => {
        if (res.data.length > 0) {
            console.log(res.data[0]);
            this.setState({loggedIn : true, userId : res.data[0]._id})
            
        }
        else {
            alert("Invalid login");
        }
    });
    
}
    
render() {

    if(!this.state.loggedIn) {
        return (

            <Login handleLogin={this.handleLogin}/>

        )
    } 
    else {
        return (
        
        <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" render={(props) => (<Profile userId={this.state.userId} {...props}/>)} />
        </div>
      </Router>
    )
    }
}

}

export default App;
