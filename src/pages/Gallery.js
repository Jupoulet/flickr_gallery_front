import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { withRouter, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'



const Gallery = ({ items, location }) => {
    items = items || location.state.items
    return (
        <>
            <Link to={location.pathname.replace('gallery', 'folder')}>
                <FontAwesomeIcon icon={faTimesCircle} size="3x" color="white" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', zIndex: '3000' }} />
            </Link>
            <ImageGallery items={items} lazyLoad infinite={false} />
        </>
    );
}

export default withRouter(Gallery);