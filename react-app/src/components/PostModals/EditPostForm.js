import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";

const EditPostForm = ({ post }) => {
    const dispatch = useDispatch();
    const image = useSelector(state => state.images[post.id])
    const [content, setContent] = useState(post.content);
    const [imageUrl, setImageUrl] = useState(image?.imageUrl);
    if (!image) setImageUrl('')
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!errors.length) {
            // dispatch(imagesActions.createNewImage(imageUrl))
            await dispatch(postsActions.editPost(post.id, content, imageUrl))
            setContent('');
            setImageUrl('');
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
    }, [hasSubmitted, content, imageUrl]);

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
                <label>Write something: </label>
                <textarea
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <label>Image URL: </label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                />
                <button type='submit'>Update Post</button>
            </form>
        </div>
    )
}

export default EditPostForm;
