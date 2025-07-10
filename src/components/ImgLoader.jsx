import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import oval from '../assets/oval.svg'

const ContainerSVG = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
`


const ImgLoader = ({ src, folderTitle, folderId }) => {
    const location = useLocation();
    const [loaded, setLoaded] = useState(false)
    const handleLoad = () => {
        setLoaded(true)
    }

    return src && (
        <>
            <Link to={/^\/admin/.test(location.pathname) ? `/admin/folder/${folderId}` : `/folder/${folderId}`} state={{ folder: { id: folderId, name: folderTitle } }}>
                <Card.Img
                    onLoad={handleLoad}
                    src={src} variant="top" 
                    style= {{
                        opacity: loaded ? '1' : '0',
                        maxHeight: '285px',
                        maxWidth: src ? '100%' : '100px',
                        margin: src ? 'auto' : '1em auto'
                    }}
                />
                {loaded ? null : <ContainerSVG><img src={oval} alt="loader" /></ContainerSVG>}
            </Link>
        </>
    ) || null;
}

export default ImgLoader;