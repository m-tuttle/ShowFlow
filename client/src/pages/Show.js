import React from 'react';
import { CardPanel, Row, Col, Table, Button } from 'react-materialize';
import API from '../utils/API';

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: {}
        }
    }

    componentDidMount() {
        API.searchShows(this.props.match.params.name)
            .then(res => {
                this.setState({ show: res.data[0].show })
            })
    }

    render() {
        if (!this.state.show.name) {
            return <div>hi</div>
        } else {
            return (
                <div id="show">
                    <Row>
                        <h4 className="mtop white-text">{this.state.show.name}</h4>
                        <Col s={3}>

                            <CardPanel className="white black-text">
                                <Row>
                                    <img src="http://via.placeholder.com/200x200" alt="showposter" />
                                </Row>
                            </CardPanel>
                        </Col>

                        <Col s={5}>

                            <CardPanel className="white black-text">
                                <Row><b>Summary</b></Row>
                                <Row>{this.state.show.summary}</Row>
                            </CardPanel>
                        </Col>

                        <Col s={4}>
                            <CardPanel className="white black-text">
                                <Row><b>Show Info</b></Row>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Network:</td>
                                            <td>{this.state.show.network.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Status:</td>
                                            <td>{this.state.show.status}</td>
                                        </tr>
                                        <tr>
                                            <td>Genres:</td>
                                            <td>{this.state.show.genres}</td>
                                        </tr>
                                        <tr>
                                            <td>Rating:</td>
                                            <td>{this.state.show.rating.average}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardPanel>
                        </Col>
                    </Row>
                    <Row>

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
                </div >
            )
        }
    }
}

export default Show;