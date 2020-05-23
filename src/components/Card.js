import React, { Suspense } from 'react';
import { Card as BCard, Image} from 'react-bootstrap'
import LazyLoad from 'react-lazy-load'
import ImgLoader from './ImgLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const Card = ({
    template,
    title,
    lengthPhotos,
    image,
    description,
    id
}) => {

    return (
        <BCard>
            <BCard.Header>
                <span style={{fontWeight: '800'}}>{title || 'titre manquant'}</span>
                <span style={{ marginLeft: '1em', fontSize: '0.7rem', fontStyle: 'italic' }}>contient {lengthPhotos} photos</span>
                {template === 'admin' ? <FontAwesomeIcon
                    icon={faEdit}
                    color="grey"
                    style={{marginLeft: "0.4em", cursor: 'pointer'}}
                /> : null}
                
            </BCard.Header>
            <LazyLoad style={{ display: 'flex', height: '210px', cursor: 'pointer'}}>
                <ImgLoader src={image} folderTitle={title} folderId={id} />
            </LazyLoad>
            <BCard.Body style={{fontSize: '12px', fontStyle: 'italic'}}>{description || ''}</BCard.Body>
        </BCard>
    );
}

export default Card;