import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from '../PostForm/index'
import Comments from "../PostDetail/Comments";
import Images from "../PostDetail/Images";
import Likes from "../PostDetail/Likes";
import OpenModalButton from "../OpenModalButton";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import './PostsPage.css';
import DeletePostForm from "../PostModals/DeletePostForm";
import EditPostForm from "../PostModals/EditPostForm";

const PostsPage = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)
    
    useEffect(() => {
        dispatch(postsActions.getAllPosts())
        dispatch(commentsActions.getAllComments())
        dispatch(likesActions.getLikes())
        dispatch(imagesActions.getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch])

    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.session.user)

    return (
        isLoaded &&
        <div className="posts">
            {user && 
                <OpenModalButton 
                    buttonText="New Post"
                    modalComponent={<PostForm />}
                />
            }
            <div className="">
                {posts && Object.values(posts).map(post => 
                    <div key={post.id} className="post">
                        <div>{post.user.username}</div>
                        <div>{post.created_at}</div>
                        <Images postId={post.id} />
                        <div>{post.content}</div>
                        {user && (post.userId === user.id &&
                        (<>
                            <OpenModalButton
                            buttonText=<i className="fa-regular fa-trash-can"></i>
                            modalComponent={<DeletePostForm postId={post.id}/>}
                            />
                            <OpenModalButton 
                            buttonText=<i className="fa-regular fa-pen-to-square"></i>
                            modalComponent={<EditPostForm post={post} />}
                            />
                        </>
                        ))}
                        <div className="comments-like-button">
                            <Comments postId={post.id} />
                            <Likes postId={post.id} userId={user.id} />
                        </div>
                    </div>
                )}
                </div>
            </div>
    )
}

export default PostsPage;
