import React from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import endpoints from '../config/endpoints'
const { BASE_API } = endpoints;

const Login = () => {
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 4 }} >
                    <Card style={{width: '20em'}}>
                        <Card.Body>
                            <Card.Img src="https://lesrseauxsociauxdanslesentreprises.files.wordpress.com/2016/02/flickr-logo.jpg" variant="top" />
                            <Card.Title>⚠️ Admin only</Card.Title>
                            <Card.Text>Connexion à Flickr nécessaire. Seul un seul compte est autorisé à modifier, ajouter des photos.</Card.Text>
                            <a href={`${BASE_API}/flickr`}>
                                <Button variant="primary">
                                    Login
                                </Button>
                            </a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;