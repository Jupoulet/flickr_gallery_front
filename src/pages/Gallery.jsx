import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { getUrlImage } from '../controllers/tools';
import ImageComponent from '../components/image/index.jsx';


const Gallery = ({ items }) => {
    const location = useLocation();
    items = (items || location.state.items).map((photo) => {
        return {
            ...photo,
            renderItem: function () {
                return (
                    <ImageComponent preview={{ alt: photo.title, src: getUrlImage(photo.file, 'm') }} original={{ alt: photo.title, src: getUrlImage(photo.file, '3k') }} />
                )
            }
        }
    })

    return (
        <>
            <Link to={location.pathname.replace('gallery', 'folder')}>
                <FontAwesomeIcon icon={faTimesCircle} size="3x" color="white" style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', zIndex: '3000' }} />
            </Link>
            <ImageGallery items={items}  lazyLoad={true} showThumbnails={false} />
        </>
    );
}

export default Gallery;