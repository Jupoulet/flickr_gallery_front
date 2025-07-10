import React, {useEffect, useState } from 'react';

import axios from 'axios';
import endpoints from '../config/endpoints'
import { getUrlImage } from '../controllers/tools'
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import { Row, Col, Image, Button, Modal } from 'react-bootstrap';
import FormPhotos from '../components/FormPhotos.jsx';

const FolderTitle = styled.h1`
    color: floralwhite;
    font-family: monospace;
`

const { BASE_API } = endpoints

const Photo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        const fetch = async () => {
            let photo = await axios.get(`${BASE_API}/photos/${id}`)
            setPhoto(photo.data)
        }
        fetch()
    }, [id])

    const handleDelete = async () => {
        let result = await axios.delete(`${BASE_API}/photos/${photo.id}`)
        if (result) {
            navigate(`/admin/folder/${photo.folderId}`)
        }
    }

    const handleCloseModal = () => setShowModal(false);
    const handleOpenModal = () => setShowModal(true);
    return photo && (
        <>
            <Row>
                <Col>
                    <FolderTitle>Photo {photo.id}</FolderTitle>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="danger" onClick={handleOpenModal}>Supprimer la photo</Button>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header>
                            <Modal.Title>Suppression de la photo {photo.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> Voulez vous vraiment supprimer cette photo ? </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>Non</Button>
                            <Button variant="primary" onClick={handleDelete}>Oui</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row>
                <FormPhotos single update open photo={photo}/>
                <Col>
                    <Image rounded src={/https/.test(photo.file) && getUrlImage(photo.file, 'md')} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                </Col>
            </Row>
        </>
    );
}

export default Photo;