import React from 'react';
import ReactDOM from 'react-dom';
import './Chatroom.css';
import Message from './Message.js';

class Chatroom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: []
        };

        this.submitMessage = this.submitMessage.bind(this);
    }

    componentDidMount() {
        this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();

        this.setState({
            chats: this.state.chats.concat([{
                content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
    }

    render() {
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Showtime</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chatroom;

// call in other fields with <Chatroom chatHistory={chatHistory} />