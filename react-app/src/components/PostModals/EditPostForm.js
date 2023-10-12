import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";
import '../PostForm/PostForm.css'

const EditPostForm = ({ post }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (content.length > 0) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("content", content);
            try {
                setImageLoading(true);
                await dispatch(postsActions.editPost(post.id, formData));
                setContent('');
                setImage(null);
                setErrors([]);
                setHasSubmitted(false);
                setImageLoading(false);
                closeModal();
            } catch(error) {
                setImageLoading(false);
                setErrors(error);
            }
        }
    }
    
    useEffect(() => {
        if (hasSubmitted) {
            const errors = [];
            if (!content) errors.push('Post must have some content');
            setErrors(errors);
        }
    }, [hasSubmitted, content]);


    return (
        <form encType="multipart/form-data" id="post-form" onSubmit={handleSubmit}>
            <div className="modalBackground">
                <div className="modalContainer editpost">
                    <div className="title">Edit your Post</div>
                    <div className='errorsBox'>
                        <ul className='errors'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                        </ul>
                    </div>
                    <div className="create-post-form">
                        <div>
                            <div>Edit Post: </div>
                            <textarea
                                className="textarea-edit"
                                type="text"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                    
                    <div>
                        <div>Edit Image: </div>
                        <input
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                            accept='image/*'
                        />
                        
                    </div>
                    {(imageLoading)&& <div>Loading...</div>}
                    <div className="footer">
                        <div><button className="buttonDesign" type='submit'>Update Post</button></div>
                        
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditPostForm;
