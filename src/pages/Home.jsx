import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import FormFolder from '../components/FormFolder.jsx'
import { Row, Col } from 'react-bootstrap'
import { getFolders } from '../controllers/API'
import { getUrlImage } from '../controllers/tools'
import Title from '../components/title/index.jsx'
import Background from '../components/background/Background.jsx';

import styled, { keyframes } from 'styled-components'
import Folder from './Folder.jsx';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const FolderContainer = styled.div`
  animation: 0.5s ${fadeIn} ease-in-out;
  width: 100%;
`

const DiscoverButton = styled.button`
transition: all 0.2s linear;
    border-radius: 8px;
    padding: 0.5em 3em;
    font-size: 24px;
    font-family: Roboto;
    border: solid 1px white;
    color: white;
    width: fit-content;
    cursor: pointer;
    background-color: transparent;
    margin-top: 2em;

    &:hover {
        background-color: #0c2461;
        transform: scale(1.05);
    }
`

const Home = ({
    template
}) => {
    const [folders, setFolders] = useState([])
    const [showFolders, setShowFolders] = useState(false)
    useEffect(() => {
        let fetch = async () => {
            let folders = await getFolders();
            setFolders(folders.data)
        }
        fetch()
    }, [])

    const generateFolders = () => {
        const arrToReturn = [];

        folders.map((folder) => {
            arrToReturn.push(
                <Col className="col" xs={12} sm={12} md={3} lg={3} key={folder.id}>
                    <Card
                        template={template}
                        title={folder.name}
                        lengthPhotos={folder.photos.length}
                        image={/https/.test(folder.mainPhoto) ? getUrlImage(folder.mainPhoto, 'md') : `https://jup.s3.eu-west-3.amazonaws.com/${folder.mainPhoto}`}
                        description={folder.description}
                        id={folder.id}
                    />
                </Col>
            )
        })

        return arrToReturn;
    }

    return (
        <>
            {template === 'admin' ? 
                <Row>
                    <FormFolder />
                </Row>
            : null}
            <Row>
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
                    <Title />
                    <DiscoverButton onClick={() => setShowFolders(true)}>Découvrir</DiscoverButton>
                </div>
            </Row>
            {showFolders ?
            <FolderContainer>
                <Row>
                    {folders.length ?
                        generateFolders()
                    : null }
                </Row>
            </FolderContainer>
            : null}
            <Background />
        </>
    );
}

export default Home;