import React, { useState } from 'react';
import { Card, Row, Col, Container, Button, Form, Alert } from 'react-bootstrap'

import endpoints from '../config/endpoints'
import credentials from '../config/credentials'
import { createToken } from '../controllers/auth'
const { BASE_API } = endpoints;
const { PASSWORD } = credentials

const Login = ({ location, history }) => {
    const location = useLocation();
    const [password, setPassword] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage('')
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        setIsSubmiting(true)
        e.preventDefault();
        if (password === PASSWORD) {
            let token = createToken(password)
            window.localStorage.setItem('user_token', token)
            history.push('/')
        } else {
            setMessage('Mauvais mot de passe')
        }
        setIsSubmiting(false)
    }

    console.log('STATE', location.state);

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 4 }} >
                    <Card style={{width: '20em'}}>
                        {!location.state || location.state.user ?
                            <Card.Body>
                                <Card.Title>⚠️ Mot de passe requis</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="password">
                                        <Form.Label>Mot de passe</Form.Label>
                                        <Form.Control type="password" name="password" value={password} onChange={handleChange} />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className={isSubmiting ? 'disabled' : ''}>
                                        Valider
                                    </Button>
                                    {message && <Alert variant="danger" style={{ marginTop: '1em' }}>{message}</Alert>}
                                </Form>
                            </Card.Body>
                         :  <Card.Body>
                                <Card.Img src="https://lesrseauxsociauxdanslesentreprises.files.wordpress.com/2016/02/flickr-logo.jpg" variant="top" />
                                <Card.Title>⚠️ Admin only</Card.Title>
                                <Card.Text>Connexion à Flickr nécessaire. Seul un seul compte est autorisé à modifier, ajouter des photos.</Card.Text>
                                <a href={`${BASE_API}/flickr`}>
                                    <Button variant="primary">
                                        Login
                                    </Button>
                                </a>
                            </Card.Body>
                        }
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;