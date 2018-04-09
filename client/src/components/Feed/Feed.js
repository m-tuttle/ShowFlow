import React from 'react';
import { CardPanel, Row, Col, Table } from 'react-materialize';
import './Feed.css';

const Feed = (props) => {
    return (
        <Row>
        <Col s={3}>
        
        <CardPanel className="white black-text">
            <Row>
            <p>You recently watched...</p>
            </Row>
        </CardPanel>
        </Col>

        <Col s={5}>
        
        <CardPanel className="white black-text">
            <Row><b>FEED</b></Row>
            
        </CardPanel>
        </Col>

        <Col s={4}>
        <CardPanel className="white black-text">
        <p>FRIENDS SHOW RANKINGS</p>
        </CardPanel>
        </Col>

    </Row>
    
)}

export default Feed;