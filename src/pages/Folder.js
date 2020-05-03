import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import FormPhotos from '../components/FormPhotos'
import FormFolder from '../components/FormFolder'
import { getFolder } from '../controllers/API'
import { getUrlImage } from '../controllers/tools'
import styled from 'styled-components';
import axios from 'axios';
import endpoints from '../config/endpoints'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
const { BASE_API } = endpoints;

const FolderTitle = styled.h1`
    color: floralwhite;
    font-family: monospace;
`


const Folder = ({ template, location, match }) => {
    const [photos, setPhotos] = useState([])
    const [ready, setReady] = useState(false)
    const [folder, setFolder] = useState(null)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    useEffect(() => {
        let fetch = async () => {
            let folder = await getFolder(match.params.id)
            setFolder(folder)
            setPhotos(folder.photos.map((photo) => {
                return {
                    ...photo,
                    originalAlt: photo.title,
                    originalTitle: photo.title,
                    original: getUrlImage(photo.file, 'k'),
                    thumbnail: getUrlImage(photo.file, 't')
                }
            }))
            setReady(true)
        }
        fetch();

    }, [])

    const getNiceIndexesPhotos = (id) => {
        let index = photos.map(p => p.id).indexOf(id)
        let firstHalf = [...photos].splice(index, photos.length - 1)
        let secondHalf = [...photos].splice(0, index);
        return [...firstHalf, ...secondHalf]
    }

    const generatePhotos = () => {
        const arrToReturn = [];
        photos.map((photo) => {
            arrToReturn.push(
                <Col xs={4} sm={4} md={3} lg={2} xl={2} style={{ height: '135px', marginBottom: '1em'}}>
                    {template !== 'admin' ?
                        <Link to={{
                            pathname: `/gallery/${folder.id}`,
                            state: { items: getNiceIndexesPhotos(photo.id) }
                        }}>
                            <Image rounded src={/https/.test(photo.file) ? getUrlImage(photo.file, 'md') : `https://jup.s3.eu-west-3.amazonaws.com/${folder.mainPhoto}`} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                        </Link>
                    :
                        <div style={{ position: 'relative'}}>
                            <Link to={`/admin/photo/${photo.id}`}>
                                <Image rounded src={/https/.test(photo.file) ? getUrlImage(photo.file, 'md') : `https://jup.s3.eu-west-3.amazonaws.com/${folder.mainPhoto}`} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                                <FontAwesomeIcon 
                                    icon={faEdit}
                                    color="white"
                                    size="4x"
                                    style={{ position: 'absolute', top: 'calc(50% - 36px)', left: 'calc(50% - 32px)', cursor: 'pointer'}}
                                    // onClick={}
                                />
                            </Link>
                        </div>
                    }
                </Col>
            )
        })
        return arrToReturn;

    }
    const handleCloseModal = () => setShowDeleteWarning(false)
    const handleOpenModal = () => setShowDeleteWarning(true)

    const deleteFolder = async () => {
        // Perform delete on folder
        await axios.delete(`${BASE_API}/folders/${folder.id}`)
        window.location.href = '/admin'
    }

    return ready && (
        <>
            <Row>
                <Col>
                    <FolderTitle>{folder.name}</FolderTitle>
                </Col>
            </Row>
            {template === 'admin' ?
                <>
                    <Row>
                        <Col>
                            <Col style={{ marginBottom: '0' }}>
                                <Button variant="danger" onClick={handleOpenModal}>Supprimer le dossier</Button>
                                <Modal show={showDeleteWarning} onHide={handleCloseModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Suppression du dossier "{folder.name}"</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Êtes vous sur de vouloir supprimer le dossier "{folder.name}" ?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseModal}> Non</Button>
                                        <Button variant="primary" onClick={deleteFolder}> Oui</Button>
                                    </Modal.Footer>
                                </Modal>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormFolder folder={folder} open update/>
                        </Col>
                        <Col>
                            <FormPhotos folder={folder} open/>
                        </Col>
                        <Col>
                            <FormPhotos single={false} folder={folder} open/>
                        </Col>
                    </Row>
                    {/* <Row>
                    </Row> */}
                </>
            : null }
            <Row>
                {generatePhotos()}
            </Row>
        </>
    );
}

export default withRouter(Folder);