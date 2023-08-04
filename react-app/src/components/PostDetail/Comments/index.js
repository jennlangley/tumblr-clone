import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import './Comments.css'

const Comments = ({ postId }) => {
    // const comments = useSelector(state => state.comments)
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.postId === postId))
    const [showComments, setShowComments] = useState(false)

    let commentToggle = showComments ? "comment-toggle comments-on" : "comment-toggle comments-off"
    return (
        <div>
            <div className={commentToggle} onClick={e => setShowComments(!showComments)}>
                {showComments ? <span><i className="fa-solid fa-xmark"></i> Close comments</span> :
                comments && `${Object.values(comments).length} comments`}</div>
            <div>
                {showComments &&
                    (comments && Object.values(comments).map(comment => <div key={comment.id}>{comment.content}</div>))
                }
            </div>
            <div className='addComment'><button>Add comment</button></div>
        </div>
    )
}
export default Comments;
