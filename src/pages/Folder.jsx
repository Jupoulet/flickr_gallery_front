import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button, Modal } from 'react-bootstrap'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import FormPhotos from '../components/FormPhotos.jsx'
import FormFolder from '../components/FormFolder.jsx'
import { getFolder } from '../controllers/API'
import { getUrlImage } from '../controllers/tools'
import styled from 'styled-components';
import axios from 'axios';
import endpoints from '../config/endpoints'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card'

const { BASE_API } = endpoints;

const FolderTitle = styled.h1`
    color: floralwhite;
    font-family: monospace;
`


const Folder = ({ template }) => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([])
    const [ready, setReady] = useState(false)
    const [folder, setFolder] = useState(null)
    const [showDeleteWarning, setShowDeleteWarning] = useState(false)
    useEffect(() => {
        let fetch = async () => {
            let folder = await getFolder(id)
            setFolder(folder)
            setPhotos(folder.photos.map((photo) => {
                return {
                    ...photo,
                    originalAlt: photo.title,
                    originalTitle: photo.title
                }
            }))
            setReady(true)
        }
        fetch();

    }, [id])

    const getNiceIndexesPhotos = (id) => {
        let index = photos.map(p => p.id).indexOf(id)
        let firstHalf = [...photos].splice(index, photos.length - 1)
        let secondHalf = [...photos].splice(0, index);
        return [...firstHalf, ...secondHalf]
    }

    const generateSubFolders = () => {
        return folder.children.map((sub_folder) => {
            return (<Card
                template={template}
                title={sub_folder.name}
                lengthPhotos={sub_folder.photos.length}
                image={/https/.test(sub_folder.mainPhoto) ? getUrlImage(sub_folder.mainPhoto, 'md') : `https://jup.s3.eu-west-3.amazonaws.com/${sub_folder.mainPhoto}`}
                description={sub_folder.description}
                id={sub_folder.id}
            />)
        })
    }

    const generatePhotos = () => {
        const arrToReturn = [];
        photos.map((photo) => {
            arrToReturn.push(
                <Col xs={4} sm={4} md={3} lg={2} xl={2} style={{ height: '135px', marginBottom: '1em'}}>
                    {template !== 'admin' ?
                        <Link to={`/gallery/${folder.id}`} state={{ items: getNiceIndexesPhotos(photo.id) }}>
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
        navigate('/admin')
    }

    return ready && (
        <>
            <Row>
                <Col>
                    <div>
                        <FolderTitle>{folder.name} ({photos.length} photos)</FolderTitle>
                    </div>  
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
                    <Row>
                        <FormFolder parentId={folder.id} />
                    </Row>
                </>
            : null }
            <Row>
                {generateSubFolders()}
            </Row>
            
            <Row>
                {generatePhotos()}
            </Row>
        </>
    );
}

export default Folder;