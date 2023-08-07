import React from "react";
import { useSelector } from "react-redux";

const Images = ({ postId }) => {

    const image = useSelector(state => state.images[postId])

    return (
        <div>
            {image && <img alt='thisimage' src={image?.imageUrl} />}
        </div>
    )
}

export default Images;
