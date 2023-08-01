import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD

=======
>>>>>>> a307ef5b8ddbd2bc785f222531ff638fa047866d
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import './PostForm.css';
import { useModal } from "../../context/Modal";

const PostForm = () => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { closeModal } = useModal();

    // let post = useSelector(state=> state.post)

    // let post = useSelector(state=> state.post)

    const handleSubmit = async (e) => {
<<<<<<< HEAD

        e.preventDefault();
        setHasSubmitted(true);

=======
>>>>>>> a307ef5b8ddbd2bc785f222531ff638fa047866d
        // let postid=1
        e.preventDefault()

        // const data = await dispatch(postsActions.createNewPost(content))
        // if (data) {
        //     setErrors(data)
        // }
<<<<<<< HEAD

        if (!errors.length) {
            await dispatch(postsActions.createNewPost(content));
            // dispatch(imagesActions.createNewImage(imageUrl))
            setContent('');
            setImageUrl('');
            setErrors([]);
            setHasSubmitted(false);
            closeModal();
        }
        

=======
>>>>>>> a307ef5b8ddbd2bc785f222531ff638fa047866d
        dispatch(postsActions.createNewPost(content))
        .then(dispatch(postsActions.getAllPosts()))
        .then(dispatch(imagesActions.createNewImage(imageUrl)))
        // console.log('after dispatch')
        setContent('')
        setImageUrl('')

        // if (imageUrl) dispatch(imagesActions.createNewImage(imageUrl))
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
