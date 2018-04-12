import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Show from './pages/Show';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Internal from './utils/Internal';

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userId: "", 
            query: "",
        };
    }

handleLogin = (event) => {
    event.preventDefault();
    var name = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    Internal.checkUser({name, password}).then(res => {
        if (res.data.length > 0) {
            this.setState({loggedIn : true, userId : res.data[0]._id})
            
        }
        else {
            alert("Invalid login. Please try again or create a new account.");
        }
    });
}

handleCreateUser = (event) => {
    event.preventDefault();
    var name = document.getElementById("newusername").value;
    var pass = document.getElementById("newpass").value;
    var email = document.getElementById("newemail").value;
    Internal.checkDup({name, email}).then(res => {
        if (res.data.length > 0) {
            alert("There is already an account for this user.");
        }
        else {
            Internal.createUser({name, pass, email}).then(res => {
            alert("Account successfully created.")
            this.setState({loggedIn : true, userId : res.data._id})
                });
            }
        })
    };

handleSearchTerm = (event) => {
    this.setState({query: event.target.value});
}

render() {

    if(!this.state.loggedIn) {
        return (

            <Login handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>

        )
    } 
    else {
        return (
        
        <Router>
        <div>
            <Navbar handleSearchTerm={this.handleSearchTerm} query={this.state.query}/>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile" render={(props) => (<Profile userId={this.state.userId} {...props}/>)} />
            <Route exact path="/search/:query" render={(props) => (<Search userId={this.state.userId} {...props}/>)}/>
            <Route exact path="/show" component={Show}/>
        </div>
      </Router>
    )
    }
}

}

export default App;
