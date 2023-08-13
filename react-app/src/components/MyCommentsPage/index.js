import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from '../../store/comments';
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as usersActions from '../../store/users';
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../CommentModal/DeleteComment";
import EditComment from "../CommentModal/EditComment";
import './MyComments.css'

const MyCommentsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(usersActions.getUsers())
        dispatch(postsActions.getAllPosts())
        dispatch(commentsActions.getComments())
        dispatch(imagesActions.getAllImages())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const myComments = useSelector(state => (Object.values(state.comments)).filter((comment) => comment.userId === sessionUser.id))
    const posts = useSelector(state => state.posts)

    if (!sessionUser) return history.push('/posts')

    return (
        sessionUser && <>
        <div className='posts'>
            <div id="num-likes">
                {myComments.length === 1 ? <div>{myComments.length} comment</div> : <div>{myComments.length} comments</div>}
            </div>
            {sessionUser ? (
                myComments.map(comment =>
                    <div className="post" key={comment.id}>
                        <div>
                            <NavLink className="postsRoute" to={`/posts/${comment.postId}`}>{posts[comment.postId].user.username}'s post
                                <i id="my-comment-post-link" className="fa-solid fa-arrow-up-right-from-square"></i>
                            </NavLink>
                        </div>
                        <div id="my-comment-text">{comment.content}</div>
                        <div className="my-comment-buttons-timestamp">
                            <div id="timestamp" className="comment-timestamp">{comment.created_at}</div>
                            <div id="my-comment-buttons">
                                <div className='deleteButton'>
                                    <OpenModalButton
                                        buttonText=<div className="edit-delete-div"><i className="fa-regular fa-trash-can"></i></div>
                                        modalComponent={<DeleteComment commentId={comment.id}/>}
                                    />
                                </div>
                                <div className='editButton'>
                                    <OpenModalButton
                                        buttonText=<div className="edit-delete-div"><i className="fa-regular fa-pen-to-square"></i></div>
                                        modalComponent={<EditComment comment={comment} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )

        ) : (
            <h1>Not Authorized</h1>
        )}

        </div>
        </>
    )

}

export default MyCommentsPage;
