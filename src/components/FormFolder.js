import React, { useState, useRef } from 'react';
import moment from 'moment';
import { Form, Button, Card, Col, ProgressBar, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import endpoints from '../config/endpoints'
const { BASE_API } = endpoints;

const FormFolder = ({ folder, open, update }) => {
    const fileInput = React.createRef()
    const [title, setTitle] = useState(folder ? folder.name : '')
    const [description, setDescription] = useState(folder ? folder.description : '')
    const [year, setYear] = useState(folder ? folder.year : null)
    const [color, setColor] = useState('#0069d9')
    const [showForm, setShowForm] = useState(open)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [valueProgressBar, setValueProgressBar] = useState(0)
    const [showSuccess, setShowSucess] = useState('')
    let interval = null;

    const fillProgressBar = () => {
        let valueProgressBar_ = 0
        interval = setInterval(async () => {
            let status = await axios.get(`${BASE_API}/status`)
            setShowSucess(status.data)
            if (valueProgressBar_ === 90) { return }
            setValueProgressBar(valueProgressBar_ + 0.5)
            valueProgressBar_ += 0.5
        }, 1000)
    }

    const handleChange = (e, name) => {
        if (name === 'title') {
            setTitle(e.target.value)
        }
        if (name === 'description') {
            setDescription(e.target.value)
        }
        if (name === 'year') {
            setYear(e.target.value)
        }
    }
    const handleSubmit = async (e) => {
        fillProgressBar();
        setIsSubmiting(true)

        e.preventDefault();

        var bodyFormData = new FormData();
        bodyFormData.append('name', title)
        bodyFormData.append('description', description)
        bodyFormData.append('year', year)
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

        setIsSubmiting(false)
        setValueProgressBar(0)
        setTimeout(() => {
            clearInterval(interval)
            setShowSucess('')
            window.location.reload()
        }, 3000)
        // window.location.reload()
    }

    const handleColor = () => {
        return setColor(color === 'white' ? '#0069d9' : 'white')
    }

    const RefButton = useRef(null)

    return (
        <Col>
            {showSuccess ? <Alert variant={showSuccess === 'Terminé' ? 'success' : 'warning'} style={{position: 'absolute', right: '1em', animation: 'slide 0.5s ease-in-out forwards', transform: 'translateX(150%)'}}>{showSuccess}</Alert> : null}
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

                            <Form.Group controlId="formYear">
                                <Form.Label>Date {folder ? `(actuelle: ${moment (folder.year).format('YYYY')})` : null}</Form.Label>
                                <Form.Control type="date" name="year" value={year} onChange={(e) => handleChange(e, 'year')} />
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