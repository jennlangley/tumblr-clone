import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePostForm from "../PostModals/DeletePostForm";
import EditPostForm from "../PostModals/EditPostForm";
import Images from "../PostDetail/Images";
import OpenModalButton from "../OpenModalButton";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import PostForm from "../PostForm";
import * as usersActions from '../../store/users';
import './MyPosts.css';
import Comments from "../PostDetail/Comments";
import Likes from "../PostDetail/Likes";


const MyPostsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(usersActions.getUsers())
        dispatch(postsActions.getAllPosts())
        dispatch(commentsActions.getAllComments())
        dispatch(likesActions.getLikes())
        dispatch(imagesActions.getAllImages())
        
    }, [dispatch])

    const myPosts = useSelector(state => (Object.values(state.posts)).filter((post) => post.userId === sessionUser.id))

    return (
        <>
        <div className='posts'>
            <div className="create-post-container">
                    <div>
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-plus">  </i>}
                            modalComponent={<PostForm />}
                        />
                        New post
                    </div>
                    
            </div>
            {sessionUser ? (
                myPosts.reverse().map(post =>
                    <div key={post.id} className='post'>
                        <div id="username">{post.user.username}</div>
                        <div id="timestamp">{post.created_at}</div>
                        <Images postId={post.id} />
                        <div className="post-content">{post.content}</div>
                        <OpenModalButton
                            buttonText=<i className="fa-regular fa-trash-can"></i>
                            modalComponent={<DeletePostForm postId={post.id}/>}
                        
                        />
                        <OpenModalButton
                            buttonText=<i className="fa-regular fa-pen-to-square"></i>
                            modalComponent={<EditPostForm postId={post.id} />}
                        />
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
