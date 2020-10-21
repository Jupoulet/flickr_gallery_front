import React, { useState, useEffect } from 'react';
import Card from '../components/Card'
import FormFolder from '../components/FormFolder'
import { Row, Col } from 'react-bootstrap'
import { getFolders } from '../controllers/API'
import { Link } from 'react-router-dom';
import { getUrlImage } from '../controllers/tools'
import axios from 'axios';

const Home = ({
    template
}) => {
    const [folders, setFolders] = useState([])
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
    const regenerateDB = async () => {
        await axios (`http://localhost:4000/regen/${window.localStorage.getItem('flickrId')}`)
    }

    return (
        <>
            {template === 'admin' ? 
                <Row>
                    <FormFolder />
                    <button onClick={regenerateDB}>GO</button>
                </Row> 
            : null}
            <Row>
                {folders.length ? 
                    generateFolders()
                : null }
            </Row>
            
        </>
    );
}

export default Home;