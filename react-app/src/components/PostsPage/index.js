import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from '../PostForm/index'
import Comments from "../PostDetail/Comments";
import Images from "../PostDetail/Images";
import Likes from "../PostDetail/Likes";
import OpenModalButton from "../OpenModalButton";
import * as usersActions from '../../store/users';
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import * as followsActions from '../../store/follows';
import './PostsPage.css';
import DeletePostForm from "../PostModals/DeletePostForm";
import EditPostForm from "../PostModals/EditPostForm";

const PostsPage = () => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(usersActions.getUsers())
        dispatch(postsActions.getAllPosts())
        dispatch(commentsActions.getComments())
        dispatch(likesActions.getLikes())
        dispatch(followsActions.getFollows())
        dispatch(imagesActions.getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch])

    const posts = useSelector(state => Object.values(state.posts));
    const user = useSelector(state => state.session.user);
    const follows = useSelector(state => (Object.values(state.follows)).filter((follow) => follow.followerId === user?.id));

    let following = [];
    for (let follow of follows) {
        following.push(follow.followedId);
    }

    return (
        isLoaded &&
        <div className="posts">
            {user &&
                <div className="create-post-container">
                    <div>
                        <OpenModalButton
                            buttonText={<i className="fa-solid fa-plus">  </i>}
                            modalComponent={<PostForm />}
                        />
                        New post
                    </div>
                    
                </div>

                
            }
            <div className="">
                {Object.values(posts).reverse().map(post =>
                    <div key={post.id} className="post">
                        <div id="username">{post.user.username}
                        {user && !(user.id === post.userId) && (
                            (following.includes(post.userId) 
                                ? <span id="follow-button" onClick={e => {
                                    e.preventDefault();
                                    let followId;
                                    for (let follow of follows) {
                                        if (follow.followedId === post.userId && follow.followerId === user.id) {
                                            followId = follow.id
                                        }
                                    }
                                    dispatch(followsActions.deleteFollow(followId))
                                }}
                                >Unfollow</span>
                                : <span id="follow-button" onClick={e => {
                                    e.preventDefault();
                                    dispatch(followsActions.createFollow(post.userId));
                                    }} 
                                    >Follow</span>
                        ))}
                        </div>
                        <div id="timestamp">{post.created_at}</div>
                        <Images postId={post.id} />
                        <div className="post-content">{post.content}</div>
                        {user && (post.userId === user.id &&
                        (<div className="edit-and-delete-button">
                            <OpenModalButton
                            buttonText=<i className="fa-regular fa-trash-can"></i>
                            modalComponent={<DeletePostForm postId={post.id}/>}
                            />
                            <OpenModalButton 
                            buttonText=<i className="fa-regular fa-pen-to-square"></i>
                            modalComponent={<EditPostForm post={post} />}
                            />
                        </div>
                        ))}
                        <div className="comments-like-button">
                            <Comments postId={post.id} />
                            <Likes postId={post.id} userId={user?.id} />
                        </div>
                    </div>
                )}
                </div>
            </div>
    )
}

export default PostsPage;
