import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Show from './pages/Show';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import Internal from './utils/Internal';
import Background from './images/showflowlogin.jpg'

var sectionStyle = {
  width: "100%",
  height: "1000px",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundImage: `url(${Background})`
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            userId: "",
            userName: "", 
            query: "",
            shows: {}
        };
    }

handleLogin = (event) => {
    event.preventDefault();
    var name = document.getElementById("username").value;
    var password = document.getElementById("pass").value;
    Internal.checkUser({name, password}).then(res => {
        if (res.data.length > 0) {
            this.setState({loggedIn : true, userId : res.data[0]._id, userName: res.data[0].name})
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
            this.setState({loggedIn : true, userId : res.data._id, userName: res.data.name})
                });
            }
        })
    };

handleSearchTerm = (event) => {
    this.setState({query: event.target.value});
}

handleLogOut = (event) => {
    event.preventDefault();
    this.setState({ loggedIn: false });
}

render() {

    if(!this.state.loggedIn) {
        return (
            <div>
            <section style={ sectionStyle } />
            <Login handleLogin={this.handleLogin} handleCreateUser={this.handleCreateUser}/>
            </div>
        )
    } 
    else {
        return (
        
        <Router>
        <div>
            <Navbar handleSearchTerm={this.handleSearchTerm} handleLogOut={this.handleLogOut} query={this.state.query} userId={this.state.userId}/>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/profile/:id" render={(props) => (<Profile userId={this.state.userId} {...props}/>)} />
            <Route exact path="/search/:query" render={(props) => (<Search userId={this.state.userId} userName={this.state.userName} {...props}/>)}/>
            <Route exact path="/show/:name" render={(props) => (<Show userId={this.state.userId} userName={this.state.userName} {...props}/>)}/>
        </div>
      </Router>
    )
    }
}

}

export default App;
