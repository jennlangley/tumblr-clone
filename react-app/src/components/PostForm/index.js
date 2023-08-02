import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import './PostForm.css';
import { useModal } from "../../context/Modal";

const PostForm = () => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])
    const [showMenu, setShowMenu] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal()
    // let post = useSelector(state=> state.post)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        if (!errors.length) {
            await dispatch(postsActions.createNewPost(content, imageUrl));
            // if (imageUrl) await dispatch(imagesActions.createNewImage(imageUrl))
            // dispatch(imagesActions.createNewImage(imageUrl))
            setContent('');
            setImageUrl('');
            setErrors([]);
            setHasSubmitted(false);
            closeModal();
        }

        setContent('')
        setImageUrl('')
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
                <button type='submit'>Post</button>
            </form>
        </div>
    )
}

export default PostForm;
