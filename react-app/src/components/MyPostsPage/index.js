import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeletePostForm from "../PostModals/DeletePostForm";
import EditPostForm from "../PostModals/EditPostForm";
import OpenModalButton from "../OpenModalButton";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import Images from "../PostDetail/Images";
import * as usersActions from '../../store/users';
import './MyPosts.css';
import Comments from "../PostDetail/Comments";
import Likes from "../PostDetail/Likes";
import { useHistory } from "react-router-dom";


const MyPostsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(usersActions.getUsers());
        dispatch(postsActions.getAllPosts());
        dispatch(commentsActions.getComments());
        dispatch(likesActions.getLikes());
        dispatch(imagesActions.getAllImages());

    }, [dispatch])

    const sessionUser = useSelector(state => state.session.user);
    const myPosts = useSelector(state => (Object.values(state.posts)).filter((post) => post.userId === sessionUser.id))
    if (!sessionUser) history.push('/posts')
    return (
        <>
        <div className='posts'>
            {sessionUser ? (
                myPosts.reverse().map(post =>
                    <div key={post.id} className='post'>
                        <div id="username-follow-link">
                            <div id="username">{post.user.username}</div>
                            <div>
                                <NavLink to={`/posts/${post.id}`}>
                                    <i style={{cursor: "pointer", color: "black"}} className="fa-solid fa-arrow-up-right-from-square"></i>
                                </NavLink>
                            </div>
                        </div>
                        {post.reposted ? (
                                    <span className='reposted'>reposted</span>
                                ): 
                                <></>}
                            {post.reposted  && (
                            <div className='originalPoster'>Post originally created by: 
                                <span style={{fontWeight: 'bold'}}>{post.originalPoster}</span>
                            </div>
                            )}
                        <div id="timestamp">{post.created_at}</div>
                        <div> 
                            {post.reposted ? <img alt='' className="repostImg" src={post.repostUrl} />
                            : <Images postId={post.id} />
                            }
                        </div>
                        <div className="post-content">{post.content}</div>
                        <div className='edit-and-delete-button'>
                            <OpenModalButton
                            buttonText=<div className="edit-delete-div"><i className="fa-regular fa-trash-can"></i></div>
                            modalComponent={<DeletePostForm postId={post.id}/>}
                            />
                            <OpenModalButton
                                buttonText=<div className="edit-delete-div"><i className="fa-regular fa-pen-to-square"></i></div>
                                modalComponent={<EditPostForm post={post} />}
                            />
                        </div>

                        <div className="comments-like-button">
                            <Comments postId={post.id} />
                            <Likes postId={post.id} userId={sessionUser.id} />
                        </div>
                    </div>
                ))
                : (
                    <h1>Not Authorized</h1>
                )}

            </div>
        </>
    )
}

export default MyPostsPage;
