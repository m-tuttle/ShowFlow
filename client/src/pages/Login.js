import React from 'react';
import { Modal } from 'react-materialize';

const Login = (props) => {
    return (
            <div id="login">
                <form>
                    <input type="text" placeholder="name" id="username" />
                    <input type="text" placeholder="password" id="pass" />
                    <button type="submit" onClick={props.handleLogin}>Submit</button></form><br />
                    
                    <Modal header='New User' trigger={<a>Create An Account</a>}>
                    <form onSubmit={props.handleCreateUser}>
                    <ul>
                        <li><input type="text" placeholder="name" id="newusername" /></li>
                        <li><input type="text" placeholder="password" id="newpass" /></li>
                        <li><input type="text" placeholder="email" id="newemail" /></li>
                    </ul>
                    <input type="submit" value="Create Account" />
                    </form>
                    </Modal>
                
            </div>
    )
};

export default Login;