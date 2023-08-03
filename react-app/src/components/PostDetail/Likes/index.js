import { useDispatch, useSelector } from "react-redux";
import * as likesActions from '../../../store/likes';
import './Likes.css';
import { useState } from "react";

const Likes = ({ postId, userId }) => {
    const dispatch = useDispatch();
    const likes = useSelector(state => Object.values(state.likes).filter(like => like.postId === postId));

    let liked = false;

    for (let like of likes) {
        if (like.userId === userId) liked = true
    }
    
    const likePost = async (e) => {
        e.preventDefault();
        await dispatch(likesActions.createLike(postId));
    } 
    const dislikePost = async (e) => {
        e.preventDefault();
        // await dispatch(likesActions.deleteLike(postId))
    }
    return (
        <div className="num-likes-like-button">
            <div className="num-likes">{likes.length} </div>

            {!liked && <i onClick={e => likePost(e)} className="fa-regular fa-heart"></i>}
            {liked && <i className="fa-solid fa-heart"></i>}
        </div>
        
    )
}

export default Likes;

