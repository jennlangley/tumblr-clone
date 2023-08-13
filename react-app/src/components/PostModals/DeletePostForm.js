import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";

const DeletePostForm = (postId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(postsActions.deletePost(postId))
        closeModal()
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div id="delete-title" className="title">Delete this Post?</div>
                <div className="delete-footer">
                    <button className="buttonDesign" onClick={e => handleSubmit(e)}>Yes</button>
                    <button className="buttonDesign" onClick={closeModal}>No</button>  
                </div>
            </div>
        </div>
    )
}

export default DeletePostForm;