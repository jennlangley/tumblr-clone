import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as imagesActions from '../../../store/images';


const Images = ({ postId }) => {
    // const dispatch = useDispatch();
    // const [isLoaded, setIsLoaded] = useState(false)

    // useEffect(() => {
    //     dispatch(imagesActions.getAllImages()).then(() => setIsLoaded(true));
    // }, [dispatch])

    const images = useSelector(state => Object.values(state.images).filter(image => image.postId === postId))

    return (
        <div>
            {images.length ? images.map(image => <img key={image.id} src={image.imageUrl}/>) : null}
        </div>
    )
}

export default Images;
