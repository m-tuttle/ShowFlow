import React, { Component } from "react";
import { CardPanel, Row, Col, Table, Button, Modal } from 'react-materialize';
import API from '../../utils/API';
import "./Shows.css";

class Shows extends Component {
    constructor(props) {
        super(props);
        API.subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp }))
        this.state = {
            chats: []
        }
        }
    state = {
        timestamp: 'no timestamp yet',
      };


render() {
    return (
    <div id="show">
    <Row>
        <h4 className="mtop white-text">{this.props.name}</h4>
        <Col s={3}>
        
        <CardPanel className="white black-text">
            <Row>
            <img src="http://via.placeholder.com/200x200" alt="showposter"/>
            </Row>
        </CardPanel>
        </Col>

        <Col s={5}>
        
        <CardPanel className="white black-text">
            <Row><b>Summary</b></Row>
            <Row>{this.props.summary}</Row>
        </CardPanel>
        </Col>

        <Col s={4}>
        <CardPanel className="white black-text">
        <Row><b>Show Info</b></Row>
        <Table>  
        <tbody>
          <tr>
            <td>Network:</td>
            <td>{this.props.network}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>{this.props.status}</td>
          </tr>
          <tr>
            <td>Genres:</td>
            <td>{this.props.genres.map(x => `${x} | `)}</td>
          </tr>
          <tr>
            <td>Rating:</td>
            <td>{this.props.rating}</td>
          </tr>
        </tbody>
      </Table>
        </CardPanel>
        </Col>
        </Row>

        <Row>
        <Col s={3}>
        <CardPanel className="white black-text">
            <Row>
            
            <Modal
            header="Live Chat"
            trigger={<Button>Join the Discussion!</Button>}>
            <hr />
            <p>{this.state.timestamp}</p>
            <ul id="messages">
            {this.state.chats.map(x => `<li>${x}</li>`)}
            </ul>
            
            </Modal>

            </Row>
        </CardPanel>
        </Col>
        <Col s={6}>
        <CardPanel className="white black-text">
            <Row>
            <p>(Progress Bar + season/episode)</p>
            <Button>Update Progress</Button>
            </Row>
        </CardPanel>
        </Col>
        <Col s={3}>
        <CardPanel className="white black-text">
            <Row>
            <p>Friends Watching</p>
            </Row>
        </CardPanel>
        </Col>
        </Row>
    </div>
    )}}

export default Shows;