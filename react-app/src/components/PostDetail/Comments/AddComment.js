import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import * as commentsActions from '../../../store/comments';
import './Comments.css';

const AddComment = ({ postId }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!errors.length) {
            await dispatch(commentsActions.createComment(content, postId))
            setContent('')
            setErrors([]);
            setHasSubmitted(false);
        }
    }
    useEffect(() => {
        if (hasSubmitted) {
            const errors = [];
            if (!content) errors.push('Comment must have some content!')
            setErrors(errors);
        }
    }, [hasSubmitted, content])

    return (
        <div id="comment-container"> 
            <i id="comment-profile-link" className="fa-regular fa-circle-user" />
            <div id='comment-area-and-button'>
                <form id='comment-form' onSubmit={handleSubmit}>
                    <div id='textarea-div'>
                        <textarea
                            id='comment-textarea'
                            placeholder='Add a comment'
                            type="text"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                        />
                    </div>
                    
                    <button disabled={(content.length < 1)} id='comment-button' type="submit">
                        Comment
                    </button>
                    
                </form>
            </div>
            
        </div>
    )
}

export default AddComment;