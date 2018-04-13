import React from 'react';
import { CardPanel, Row, Col, Table, Button, ProgressBar, Modal } from 'react-materialize';
import Internal from '../utils/Internal';
import API from '../utils/API';
import { Link } from 'react-router-dom';

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: {},
            users: []
        }
    }

    componentDidMount() {
        API.searchShows(this.props.match.params.name)
            .then(res => {
                this.setState({ show: res.data[0].show })
            })
        Internal.getUsersByShow(this.props.match.params.name)
            .then(res => {
                this.setState({ users: res.data })
            })

    }

    addShow = event => {
        event.preventDefault();

        let userId = this.props.userId;
        let saveId = event.target.parentElement.getAttribute("data-id");
        let saveTitle = event.target.parentElement.getAttribute("data-title");
        let saveImage = event.target.parentElement.getAttribute("data-image");
        let saveStatus = event.target.getAttribute("data-status");

        Internal.saveShow({ userId, saveId, saveTitle, saveImage, saveStatus }).then(res => {
            alert(`Show updated successfully!`)
        })
    }

    render() {
        if (!this.state.show.name) {
            return <div>hi</div>
        } else {
            return (
                <div id="show">
                    <Row>
                        <h4 className="mtop white-text center">{this.state.show.name}</h4>
                        <Col s={3}>

                            <CardPanel className="white black-text">
                                <Row>
                                    <img src={this.state.show.image.medium} alt="showposter" />
                                </Row>
                                <Row>
                                    <Modal header={this.state.show.name} trigger={<Button>Update</Button>}>
                                        <div data-id={this.state.show.id} data-title={this.state.show.name} data-image={(this.state.show.image) ? this.state.show.image.medium : 'http://via.placeholder.com/210x295'}>

                                            <button
                                                onClick={this.addShow}
                                                className="btn waves-effect waves-light red mbot"
                                                data-status="queued">Add to Watchlist</button>
                                            <br />

                                            <button
                                                onClick={this.addShow}
                                                className="btn waves-effect waves-light red mbot"
                                                data-status="watching">Currently Watching</button>
                                            <br />

                                            <button
                                                onClick={this.addShow}
                                                className="btn waves-effect waves-light red mbot"
                                                data-status="watched"
                                            >Watched</button>

                                        </div>
                                    </Modal>
                                </Row>
                            </CardPanel>
                        </Col>

                        <Col s={5}>

                            <CardPanel className="white black-text">
                                <Row><b>Summary</b></Row>
                                <Row>{this.state.show.summary.replace(/<(?:.|\n)*?>/gm, '')}</Row>
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
                                            <td>{this.state.show.genres.join(" | ")}</td>
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
                                    <ProgressBar />
                                </Row>
                            </CardPanel>
                        </Col>
                        <Col s={3}>
                            <CardPanel className="white black-text">
                                <Row>
                                    <p>Friends Watching</p>
                                    <ul>
                                    {(this.state.users.length) && this.state.users.map(elem => <li key={elem._id}><Link to={`../profile/${elem._id}`}>{elem.name}</Link></li>)}
                                    </ul>
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