import React, { useState } from 'react'


const Image = ({ preview, original }) => {
    const [isOriginalLoad, setOriginalLoad] = useState(false)
  
    return (
      <React.Fragment>
        <img
          height="1000"
          className="image-gallery-image"
          alt={preview.alt}
          src={preview.src}
          style={{ display: isOriginalLoad ? "none" : "inherit" }}
        />
        <img
          onLoad={() => {
            console.log('Loaded')
            setOriginalLoad(true)
          }}
          className="image-gallery-image"
          style={{ display: isOriginalLoad ? "inherit" : "none" }}
          alt={original.alt}
          src={original.src}
        />
      </React.Fragment>
    )
  }

  export default Image