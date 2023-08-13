import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import * as postsActions from '../../store/posts';
import './PostForm.css';
import { useModal } from "../../context/Modal";

const PostForm = () => {
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (content.length > 0) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("content", content);
            setImageLoading(true);
            await dispatch(postsActions.createNewPost(formData));
            setContent('');
            setImage('');
            setErrors([]);
            setHasSubmitted(false);
            closeModal();
        }
    }

    useEffect(() => {
        if (hasSubmitted) {
            const errors = []
            if (!content) errors.push('Post must have some content!')
            setErrors(errors)
        }
    }, [hasSubmitted, content]);

    return (
        <form encType="multipart/form-data" id="post-form" onSubmit={handleSubmit}>
            <div className="modalBackground">
                <div className="modalContainer editpost">
                    <div className="title">Create a Post!</div>
                    <div className='errorsBox'>
                        <ul className='errors'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                        </ul>
                    </div>
                    {(imageLoading)&& <div className="loadingDiv">Loading...</div>}
                    <div className="create-post-form">
                        <div>
                            <div>Write something: </div>
                            <textarea
                                className="textarea-edit"
                                type="text"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>Image: </div>
                            <input
                                type="file"
                                onChange={e => setImage(e.target.files[0])}
                                accept="image/*"
                            />
                        </div>
                        <div className="footer">
                            <div><button className="buttonDesign" type='submit'>Post</button></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostForm;
