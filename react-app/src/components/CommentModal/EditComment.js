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
        if (content.length > 1) {
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
        <div className="post">
            <form id="post-form" onSubmit={handleSubmit}>
                <div className='errorsBox'>
                        <ul className='errors'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                        </ul>
                </div>
                <label>Edit Comment</label>
                <textarea 
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button  type="submit">Edit Comment</button>
                <button onClick={closeModal}>Cancel</button>
            </form>
        </div>
        
    )
}

export default EditComment;
