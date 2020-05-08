import React, { useState, useRef } from 'react';
import { Form, Button, Card, Col, ProgressBar, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import endpoints from '../config/endpoints'
const { BASE_API } = endpoints;

const FormPhotos = ({ single = true, folder, open, update, photo }) => {
    const fileInput = React.createRef()
    const [title, setTitle] = useState(photo ? photo.title || '' : '')
    const [description, setDescription] = useState(photo ? photo.description || '' : '')
    const [color, setColor] = useState('#0069d9')
    const [showForm, setShowForm] = useState(open)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [valueProgressBar, setValueProgressBar] = useState(0)
    const [showSuccess, setShowSucess] = useState('')


    let interval = null;

    const fillProgressBar = (length) => {
        let valueProgressBar_ = 0
        interval = setInterval(async () => {
            let status = await axios.get(`${BASE_API}/status`)
            setShowSucess(status.data)
            if (valueProgressBar_ === 90) { return }
            setValueProgressBar(valueProgressBar_ + 10)
            valueProgressBar_ += 2
        }, 1000 * (1 + length / 10 * 2))
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
        e.preventDefault();
        fillProgressBar(fileInput.current ? fileInput.current.files.length : 0);
        setIsSubmiting(true)
        var bodyFormData = new FormData();
        bodyFormData.append('id', window.localStorage.getItem('flickrId'))
        bodyFormData.append('folderId', folder ? folder.id : photo.folderId)
        
        if (single) {
            bodyFormData.append('title', title)
            bodyFormData.append('description', description)
            bodyFormData.append('path', `/${title}`)
            if (fileInput.current) {
                bodyFormData.append('photo', fileInput.current.files[0])
            }
        } else {
            bodyFormData.append('name', folder.name)
            bodyFormData.append('path', `/${folder.name}`)
            for (const file of fileInput.current.files) {
                bodyFormData.append('photo', file)
            }
        }

        await axios ({
            method: update ? 'put' : 'post',
            url: `${BASE_API}/photos${update ? '/' + photo.id : ''}${!single ? '/multiple' : ''}`,
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        setIsSubmiting(false)
        setValueProgressBar(0)
        setTimeout(() => {
            setShowSucess('')
            clearInterval(interval)
            window.location.reload()
        }, 3000)
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
                {single ? `${update ? 'Modifier la photo' : 'Ajouter une photo'}` : `Ajouter des photos`}
            </Button>
            {showForm ? 
                <Card style={{ marginTop: '1em'}}>
                    <Card.Body>
                        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                            {single ?
                                <>
                                    <Form.Group controlId="formTitle">
                                        <Form.Label>Titre de l'image</Form.Label>
                                        <Form.Control type="text" placeholder="2019-06 - Famille" name="title" value={title} onChange={(e) => handleChange(e, 'title')} />
                                    </Form.Group>

                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Legende de l'image</Form.Label>
                                        <Form.Control type="text-area" placeholder="Photos de vacances ..." name="description" value={description} onChange={(e) => handleChange(e, 'description')} />
                                    </Form.Group>
                                </>
                            : null }

                            {!update ? <Form.Group controlId="formFile">
                                <Form.Control type="file" name="photo" ref={fileInput} multiple={!single}/>
                            </Form.Group> :null}
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

export default FormPhotos;