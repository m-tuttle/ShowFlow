import React from 'react';

const Login = (props) => {
    return (
            <div id="login">
                <form>
                    <input type="text" placeholder="name" id="username" />
                    <input type="text" placeholder="password" id="pass" />
                    <button type="submit" onClick={props.handleLogin}>Submit</button>
                </form>
            </div>
    )
};

export default Login;