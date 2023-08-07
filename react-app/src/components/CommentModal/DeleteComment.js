import { useDispatch } from "react-redux";
//import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts"
import * as commentsActions from "../../store/comments";
import * as imagesActions from "../../store/images";
import './DeleteComment.css'

const DeleteComment = (commentId) => {
 //   const history = useHistory();
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const confirmDelete = async () => {
       await dispatch(commentsActions.deleteMyComment(commentId))
            .then(dispatch(commentsActions.getAllComments()))
            .then(dispatch(postsActions.getAllPosts()))
            .then(dispatch(imagesActions.getAllImages()))
        closeModal()
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div></div>
                <div>
                    <h1 className='deleteTitle'>Delete This Comment?</h1>
                    <button className='yesButton' onClick={confirmDelete}>Yes</button>
                    <button className='noButton' onClick={closeModal}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteComment;
