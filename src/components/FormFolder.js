import React, { useState, useRef } from 'react';
import { Form, Button, Card, Col, ProgressBar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import endpoints from '../config/endpoints'
const { BASE_API } = endpoints;

const FormFolder = ({ folder, open, update }) => {
    const fileInput = React.createRef()
    const [title, setTitle] = useState(folder ? folder.name : '')
    const [description, setDescription] = useState(folder ? folder.description : '')
    const [color, setColor] = useState('#0069d9')
    const [showForm, setShowForm] = useState(open)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [valueProgressBar, setValueProgressBar] = useState(0)
    let interval = null;

    const fillProgressBar = () => {
        let valueProgressBar_ = 0
        interval = setInterval(() => {
            if (valueProgressBar_ === 90) { return }
            setValueProgressBar(valueProgressBar_ + 10)
            valueProgressBar_ += 2
        }, 1000)
    }

    const handleChange = (e, name) => {
        if (name === 'title') {
            setTitle(e.target.value)
        }
        if (name === 'description') {
            setDescription(e.target.value)
        }
    }
    const handleSubmit = async (e) => {
        fillProgressBar();
        setIsSubmiting(true)

        e.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.append('name', title)
        bodyFormData.append('description', description)
        bodyFormData.append('path', `/${title}`)
        bodyFormData.append('id', window.localStorage.getItem('flickrId'))
        bodyFormData.append('photo', fileInput.current.files[0])

        await axios ({
            method: update ? 'put' : 'post',
            url: `${BASE_API}/folders${folder ? '/' + folder.id : ''}`,
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        setTimeout(() => {
            setIsSubmiting(false)
            setValueProgressBar(0)
            clearInterval(interval)
            window.location.reload()
        }, 2500)
    }

    const handleColor = () => {
        return setColor(color === 'white' ? '#0069d9' : 'white')
    }

    const RefButton = useRef(null)

    return (
        <Col>
            <Button
                ref={RefButton}
                variant="light"
                onMouseEnter={handleColor}
                onMouseLeave={handleColor}
                onClick={() => setShowForm(!showForm)}
                onFocus={() => RefButton.current.blur()}
            >
                <FontAwesomeIcon
                    icon={showForm ? faMinusSquare : faPlusSquare}
                    color={color}
                    style={{marginRight: "0.4em"}}
                />
                {update ? 'Modifier le dossier' : 'Nouveau dossier'}
            </Button>
            {showForm ? 
                <Card style={{ marginTop: '1em'}}>
                    <Card.Body>
                        <Form enctype="multipart/form-data" onSubmit={handleSubmit}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Nom du dossier</Form.Label>
                                <Form.Control type="text" placeholder="2019-06 - Famille" name="title" value={title} onChange={(e) => handleChange(e, 'title')} />
                            </Form.Group>

                            <Form.Group controlId="formDescription">
                                <Form.Label>Legende du dossier</Form.Label>
                                <Form.Control type="text-area" placeholder="Photos de vacances ..." name="description" value={description} onChange={(e) => handleChange(e, 'description')} />
                            </Form.Group>

                            <Form.Group controlId="formFile">
                                <Form.Label>Photo du dossier</Form.Label>
                                <Form.Control type="file" name="photo" ref={fileInput}/>
                            </Form.Group>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <Button variant="primary" type="submit" className={isSubmiting ? 'disabled' : ''}>
                                    Valider
                                </Button>
                                <ProgressBar variant="success" striped animated now={valueProgressBar} style={{ width: '300px', marginLeft: '0.7em'}} />
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            : null}
        </Col>
        
    );
}

export default FormFolder;