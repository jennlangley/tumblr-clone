import React from "react";
import { useSelector } from "react-redux";

const Comments = ({ postId }) => {
    const comment = useSelector(state => state.comments[postId])

    return (
        <div>
            {comment && comment.content}
        </div>
    )
}
export default Comments;