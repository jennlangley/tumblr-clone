import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";

const DeletePostForm = (postId) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(postsActions.editPost(postId))
        closeModal()
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div></div>
                <div>
                    <h1>Edit Post</h1>
                    <button onClick={e => handleSubmit(e)}>Yes</button>
                    <button onClick={closeModal}>No</button>  
                </div>
            </div>
        </div>
    )
}

export default DeletePostForm;