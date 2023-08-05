import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react"
import { useModal } from "../../context/Modal";
import * as commentsActions from "../../store/comments";
import './CreateComment.css'

const EditComment = ({commentId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal();

    useEffect(()=> {
        dispatch(commentsActions.getAllComments())
    },[dispatch])

    const comment = useSelector(state => Object.values(state.comments).filter((comment => comment.id === commentId)))
    // console.log(comment[0].content, 'OOOOOOOOOOOOOOOO')

    const [content, setContent] = useState(comment[0].content)
    const [hasFilled, setHasFilled] = useState(false)
    const [error, setError] = useState({})

    useEffect(() => {
        let validationErrors = {}

        if (content.length === 0 && hasFilled) {
            validationErrors.content = "*Comment field cannot be empty"
        }

        if(validationErrors) {
            setError(validationErrors)
        } else {
            setError({})
        }

    }, [content, hasFilled])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError({})
        setHasFilled(false)

        await dispatch(commentsActions.editComment({content},comment[0].id))
        closeModal()
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className="modalBackground">
            <div className="modalContainer">
                <div></div>
                <div>
                    <h1 className='createTitle'>Type in your comment</h1>
                    <div className='errorContent'>
                      {error.content && (<p>{error.content}</p>)}
                    </div>
                    <textarea id='comment'
                              placeholder='Type your comment'
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              onClick={()=> {setHasFilled(true)}} />
                    <button className='addComment' onClick={e => handleSubmit(e)}>Edit Comment</button>
                    <button className='cancelComment' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
        </form>
    )
}

export default EditComment;
