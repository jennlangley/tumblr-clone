import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comments";
import './DeleteComment.css'

const DeleteComment = (commentId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(commentsActions.deleteComment(commentId))
            //  .then(dispatch(commentsActions.getAllComments()))
            //  .then(dispatch(postsActions.getAllPosts()))
            //  .then(dispatch(imagesActions.getAllImages()))
            //  .then(history.push('/my_comments'))
             .then(closeModal())
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div id="delete-title" className="title">Delete this comment?</div>
                <div className="delete-footer">
                    <div><button  className="buttonDesign" onClick={e => handleSubmit(e)}>Yes</button></div>
                    <div><button className="buttonDesign" onClick={closeModal}>No</button></div>
                </div>
            </div>
        </div>

    )
}

export default DeleteComment;
