import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import OpenModalButton from '../../OpenModalButton';
import AddComment from "./AddComment";
import DeleteComment from "../../CommentModal/DeleteComment";
import EditComment from "../../CommentModal/EditComment";
import './Comments.css'

const Comments = ({ postId }) => {

    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.postId === postId));
    const users = useSelector(state => state.users);
    const sessionUser = useSelector(state => state.session.user);
    const [showComments, setShowComments] = useState(false);

    let commentToggle = showComments ? "comment-toggle comments-on" : "comment-toggle comments-off";
    return (
        <div className="comments-and-comment-button">
            <div className={commentToggle} onClick={e => setShowComments(!showComments)}>
                {showComments ? <span><i className="fa-solid fa-xmark"></i> Close comments</span> :
                comments && `${Object.values(comments).length} comments`}</div>
            <div>
                {sessionUser && showComments && <AddComment postId={postId}/>}
                {showComments && 
                    (comments && (Object.values(comments).reverse().map(comment => 
                        <div key={comment.id} id="comment-container">
                            <div>
                                <i id="comment-profile-link" className="fa-regular fa-circle-user" />
                            </div>
                            <div className="comment-text" key={comment.id}>
                                <div className="comment-username">{Object.values(users[comment.userId].username)}
                                    <span className="comment-date"> {comment.updated_at}</span>
                                    <> </>
                                    {(comment.userId === sessionUser?.id) && 
                                        (<>
                                            <OpenModalButton
                                                buttonText=<i className="fa-regular fa-trash-can"></i>
                                                modalComponent={<DeleteComment commentId={comment.id}/>}
                                            />
                                            <OpenModalButton
                                                buttonText=<i className="fa-regular fa-pen-to-square"></i>
                                                modalComponent={<EditComment commentId={comment.id} />}
                                            />
                                        
                                        </>)
                                    }
                                </div>
                                <div id="comment-content">{comment.content}</div>
                                
                            </div>
                        </div>)
                        )
                        
                    )
                } 
            </div>
        </div>
    )
}
export default Comments;
