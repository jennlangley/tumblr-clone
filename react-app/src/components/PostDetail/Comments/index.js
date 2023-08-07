import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import './Comments.css'

const Comments = ({ postId }) => {
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.postId === postId));
    const users = useSelector(state => state.users)

    const [showComments, setShowComments] = useState(false);

    let commentToggle = showComments ? "comment-toggle comments-on" : "comment-toggle comments-off";
    return (
        <div>
            <div className={commentToggle} onClick={e => setShowComments(!showComments)}>
                {showComments ? <span><i className="fa-solid fa-xmark"></i> Close comments</span> :
                comments && `${Object.values(comments).length} comments`}</div>
            <div>
                {showComments &&
                    (comments && Object.values(comments).map(comment => 
                        <div id="comment-container">
                            <div><i id="comment-profile-link" class="fa-regular fa-circle-user"></i></div>
                            <div className="comment-text" key={comment.id}>
                                
                                <div className="comment-username">{Object.values(users[comment.userId].username)}<span className="comment-date"> {comment.updated_at}</span></div>
                                <div>{comment.content}</div>
                                
                            </div>
                        </div>
                        
                        
                        ))
                }  
            </div>
        </div>
    )
}
export default Comments;