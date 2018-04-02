import React from "react";
import { CardPanel, Row, Col } from 'react-materialize';
import "./Shows.css";

const ShowDetail = props =>
    <Row>
        <h4 className="mtop white-text">Game of Thrones</h4>
        <Col s={3}>
        
        <CardPanel className="white black-text">
            <Row>
            <img src="http://via.placeholder.com/250x250" alt="showposter"/>
            </Row>
        </CardPanel>
        </Col>

        <Col s={6}>
        
        <CardPanel className="white black-text">
            <Row>
            
            <span><i>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</i></span>
            </Row>
        </CardPanel>
        </Col>

        <Col s={3}>
        <CardPanel className="white black-text">
            <Row>
            <span><i>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</i></span>
            </Row>
        </CardPanel>
        </Col>

    </Row>

export default ShowDetail;