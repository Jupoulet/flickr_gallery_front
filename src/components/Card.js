import React, { Suspense } from 'react';
import { Card as BCard, Image} from 'react-bootstrap'
import LazyLoad from 'react-lazy-load'
import ImgLoader from './ImgLoader'

const Card = ({
    title,
    image,
    description,
    id
}) => {
    const handleClick = () => {
        console.log('Handle image click go to folder')
    }
    return (
        <BCard style={{ cursor: 'pointer' }}>
            <BCard.Header style={{fontWeight: '800'}}>{title || 'titre manquant'}</BCard.Header>
            <LazyLoad onClick={handleClick}>
                <ImgLoader src={image} folderTitle={title} folderId={id} />
            </LazyLoad>
            <BCard.Body style={{fontSize: '12px', fontStyle: 'italic'}}>{description || ''}</BCard.Body>
        </BCard>
    );
}

export default Card;