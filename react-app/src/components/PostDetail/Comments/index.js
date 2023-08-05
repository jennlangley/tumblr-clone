import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from '../../OpenModalButton';
import CreateComment from '../../CommentModal/CreateComment';
import './Comments.css'

const Comments = ({ postId }) => {
    // const comments = useSelector(state => state.comments)
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.postId === postId))
    const [showComments, setShowComments] = useState(false)

    let commentToggle = showComments ? "comment-toggle comments-on" : "comment-toggle comments-off"

    const openCommentForm = () => {

        return (
            <>
            <OpenModalButton
                    modalComponent={<CreateComment postId={postId} />}
                />
            </>
        )
    }

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
            <div>
                <OpenModalButton
                    buttonText = 'Add Comment'
                    modalComponent={<CreateComment postId={postId} />}
                />
               </div>
        </div>
    )
}
export default Comments;
