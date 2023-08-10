import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as commentsActions from '../../../store/comments';
import './Comments.css';

const AddComment = ({ postId }) => {
    const dispatch = useDispatch();

    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (content.length > 1) {
            await dispatch(commentsActions.createComment(content, postId))
            setContent('')
        }
    }

    return (
        <div id="add-comment-container"> 
            <i id="comment-profile-link" className="fa-regular fa-circle-user" />
            <div id='comment-area-and-button'>
                <form id='comment-form' onSubmit={handleSubmit}>
                    <div id='textarea-div'>
                        <textarea
                            rows={1}
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