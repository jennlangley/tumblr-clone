import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
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

    useEffect(() => {
        dispatch(usersActions.getUsers())
        dispatch(postsActions.getAllPosts())
        dispatch(commentsActions.getComments())
        dispatch(imagesActions.getAllImages())
    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const myComments = useSelector(state => (Object.values(state.comments)).filter((comment) => comment.userId === sessionUser.id))
    const posts = useSelector(state => state.posts)

    return (
        <>
        <div className='posts'>
            <div id="num-likes">
                {myComments.length === 1 ? <div>{myComments.length} comment</div> : <div>{myComments.length} comments</div>}
            </div>
            {sessionUser ? (
                myComments.map(comment =>
                    <div className="post" key={comment.id}>
                        <div>
                            <NavLink to={`/posts/${comment.postId}`}>{posts[comment.postId].user.username}'s post</NavLink>
                        </div>
                        <div id="comment-text">{comment.content}</div>
                        <div className='deleteButton'>
                            <OpenModalButton
                                buttonText=<i className="fa-regular fa-trash-can" id='deleteButton'></i>
                                modalComponent={<DeleteComment commentId={comment.id}/>}
                            />
                        </div>
                        <div className='editButton'>
                            <OpenModalButton
                                buttonText=<i className="fa-regular fa-pen-to-square" id='editButton'></i>
                                modalComponent={<EditComment commentId={comment.id} />}
                            />
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
