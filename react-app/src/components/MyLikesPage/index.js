import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';
import * as likesActions from '../../store/likes';
import * as usersActions from '../../store/users';
import Comments from "../PostDetail/Comments";
import Images from "../PostDetail/Images";
import Likes from "../PostDetail/Likes";
import './MyLikesPage.css'
import { useHistory } from "react-router-dom";

const MyLikesPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(usersActions.getUsers());
        dispatch(postsActions.getAllPosts());
        dispatch(commentsActions.getComments());
        dispatch(likesActions.getLikes());
        dispatch(imagesActions.getAllImages());
    }, [dispatch])

    const user = useSelector(state => state.session.user)
    const likes = useSelector(state => (Object.values(state.likes)).filter(like => like.userId === user.id))
    const likedPosts = [];
    for (let like of likes) {
        likedPosts.push(like.postId)
    }
    const posts = useSelector(state => (Object.values(state.posts)).filter(post => likedPosts.includes(post.id)))

    if (!user) history.push('/posts')

    return (
        user &&
        (<div className="posts">
            <div id="num-likes">
                {posts.length === 1 ? <div>{posts.length} like</div> : <div>{posts.length} likes</div>}
            </div>
            {user ? (
                posts.reverse().map(post =>
                    <div key={post.id} className='post'>
                        <div id="username">{post.user.username}</div>
                        <div id="timestamp">{post.created_at}</div>
                        <Images postId={post.id} />
                        <div className="post-content">{post.content}</div>
                        <div className="comments-like-button">
                            <Comments postId={post.id} />
                            <Likes postId={post.id} userId={user.id} />
                        </div>
                    </div>
                ))
                : (
                    <h1>Not Authorized</h1>
                )}
            
        </div>)
        
    )
}

export default MyLikesPage;