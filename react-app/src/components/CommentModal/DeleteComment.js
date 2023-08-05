import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comments";
import './DeleteComment.css'

const DeleteComment = (commentId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(commentsActions.deleteMyComment(commentId))
        closeModal()
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div></div>
                <div>
                    <h1 className='deleteTitle'>Delete This Comment?</h1>
                    <button className='yesButton' onClick={e => handleSubmit(e)}>Yes</button>
                    <button className='noButton' onClick={closeModal}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteComment;
