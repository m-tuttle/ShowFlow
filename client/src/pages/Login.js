import React from 'react';
import { Modal } from 'react-materialize';

const Login = (props) => {
    return (
        <div id="form-wrapper">
            <div id="login">
                <h4 id='headline'>ShowFlow</h4>
                <form>
                    <input type="text" placeholder="name" id="username" />
                    <input type="password" placeholder="password" id="pass" />
                    <button type="submit" onClick={props.handleLogin}>Submit</button>
                </form>
                
                <br />
                    
                    <Modal header='New User' trigger={<a>Create An Account</a>} id='signModal'>
                    <form onSubmit={props.handleCreateUser}>
                    <ul>
                        <li><input type="text" placeholder="name" id="newusername" /></li>
                        <li><input type="text" placeholder="password" id="newpass" /></li>
                        <li><input type="text" placeholder="email" id="newemail" /></li>
                    </ul>
                    <input style={{width: '100%', padding: '20px', color: 'white', backgroundColor: '#05668D'}} type="submit" value="Create Account" />
                    </form>
                    </Modal>
                
            </div>
        </div>
    )
};

export default Login;