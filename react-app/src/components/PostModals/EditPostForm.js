import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";

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

        if (!errors.length) {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("content", content);
            setImageLoading(true);
            await dispatch(postsActions.editPost(post.id, formData))
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
        <div className="post">
            <form encType="multipart/form-data" id="post-form" onSubmit={handleSubmit}>
                <div className='errorsBox'>
                    <ul className='errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                    </ul>
                </div>
                <label>Write something: </label>
                <textarea
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <label>Image: </label>
                <input
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                    accept='image/*'
                />
                <button type='submit'>Update Post</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    )
}

export default EditPostForm;
