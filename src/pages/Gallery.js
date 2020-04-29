import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { withRouter } from 'react-router-dom'



const Gallery = ({ items, location }) => {
    console.log('COUCOU', items)
    items = items || location.state.items
    return (
        <ImageGallery items={items} />
    );
}

export default withRouter(Gallery);