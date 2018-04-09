import React from "react";
import { CardPanel, Row, Col, Table } from 'react-materialize';
import "./Shows.css";

const Shows = (props) => {
    return (
    <Row>
        <h4 className="mtop white-text">{props.name}</h4>
        <Col s={3}>
        
        <CardPanel className="white black-text">
            <Row>
            <img src="http://via.placeholder.com/150x150" alt="showposter"/>
            </Row>
        </CardPanel>
        </Col>

        <Col s={5}>
        
        <CardPanel className="white black-text">
            <Row><b>Summary</b></Row>
            <Row>{props.summary}</Row>
        </CardPanel>
        </Col>

        <Col s={4}>
        <CardPanel className="white black-text">
        <Row><b>Show Info</b></Row>
        <Table>  
        <tbody>
          <tr>
            <td>Network:</td>
            <td>{props.network}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td></td>
          </tr>
          <tr>
            <td>Airs:</td>
          </tr>
          <tr>
            <td>Genres:</td>
            <td></td>
          </tr>
          <tr>
            <td>Rating:</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
        </CardPanel>
        </Col>

    </Row>
    
    )}

export default Shows;