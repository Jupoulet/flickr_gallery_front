import React, { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import FormPhotos from '../components/FormPhotos'
import { getFolder } from '../controllers/API'
import { getUrlImage } from '../controllers/tools'
import styled from 'styled-components';

const FolderTitle = styled.h1`
    color: floralwhite;
    font-family: monospace;
`


const Folder = ({ template, location, match }) => {
    const [photos, setPhotos] = useState([])
    const [ready, setReady] = useState(false)
    const [folder, setFolder] = useState(null)
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
            console.log({ folder, photos: folder.photos })
        }
        fetch();

    }, [])

    const generatePhotos = () => {
        const arrToReturn = [];
        photos.map((photo) => {
            arrToReturn.push(
                <Col xs={4} sm={4} md={3} lg={2} xl={2}>
                    <Link to={{
                        pathname: `/gallery/${folder.id}`,
                        state: { items: photos }
                    }}>
                        <Image rounded src={/https/.test(photo.file) ? getUrlImage(photo.file, 'md') : `https://jup.s3.eu-west-3.amazonaws.com/${folder.mainPhoto}`} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                    </Link>
                </Col>
            )
        })
        return arrToReturn;

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
                            <FormPhotos folder={folder}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormPhotos single={false} folder={folder} />
                        </Col>
                    </Row>
                </>
            : null }
            <Row>
                {generatePhotos()}
            </Row>
        </>
    );
}

export default withRouter(Folder);