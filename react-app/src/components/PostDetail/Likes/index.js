import { useDispatch, useSelector } from "react-redux";
import * as likesActions from '../../../store/likes';
import OpenModalButton from "../../OpenModalButton";
import SignupFormModal from "../../SignupFormModal";
import './Likes.css';

const Likes = ({ postId, userId }) => {
    const dispatch = useDispatch();
    const likes = useSelector(state => Object.values(state.likes).filter(like => like.postId === postId));

    let liked = false;
    let likeId;

    for (let like of likes) {
        if (like.userId === userId) liked = true;
        likeId = like.id;
    };
    
    const likePost = async (e) => {
        e.preventDefault();
        await dispatch(likesActions.createLike(postId));
    } 
    const dislikePost = async (e) => {
        e.preventDefault();
        await dispatch(likesActions.deleteLike(likeId))
    }

    return (
        <div className="num-likes-like-button">
            <div className="num-likes">{likes.length} </div>
            {!userId && 
                <i className="fa-regular fa-heart"></i>
            }
            {userId && (!liked && <i onClick={e => likePost(e)} className="fa-regular fa-heart"></i>)}
            {userId && (liked && <i onClick={e => dislikePost(e)} className="fa-solid fa-heart"></i>)}
        </div>
        
    )
}

export default Likes;

