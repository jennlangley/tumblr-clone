import { useDispatch } from "react-redux";
import { useState, useEffect } from "react"
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comments";
import './CreateComment.css'

const EditComment = ({ comment }) => {
    const dispatch = useDispatch()
    const [content, setContent] = useState(comment.content)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (content.length > 0) {
            await dispatch(commentsActions.editComment(comment.id, content))
            setContent('')
            setErrors([])
            setHasSubmitted(false)
            closeModal()
        }
    }

    useEffect(() => {
        if (hasSubmitted) {
            const errors = []
            if (!content) errors.push('Comment must have some content!')
            setErrors(errors)
        }
    }, [hasSubmitted, content])

    return (
        <form onSubmit={handleSubmit}>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">Edit Comment</div>
                    <div className='errorsBox'>
                            <ul className='errors'>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                            </ul>
                    </div>
                    <div>
                    <textarea 
                        className="textarea-edit"
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    </div>
                    <div className="footer">
                        <div><button className="buttonDesign" type="submit">Edit Comment</button></div>
                        <div><button className="buttonDesign" onClick={closeModal}>Cancel</button></div>
                    </div>
                </div>
            </div>
        </form>
        
    )
}

export default EditComment;
