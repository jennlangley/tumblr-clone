import React from "react";
import { useSelector } from "react-redux";
import './Image.css'

const Images = ({ postId }) => {

    const images = useSelector(state => Object.values(state.images).filter(image => image.postId === postId))
  
    return (
        <div>
            {images.length ? images.map(image => <img className="post-image" alt="" key={image.id} src={image.imageUrl}/>) : null}
        </div>
    )
}

export default Images;
