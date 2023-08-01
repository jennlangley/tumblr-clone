import React, { useEffect, useState, useRef } from "react"
import { useDispatch } from "react-redux";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import './PostForm.css';

const PostForm = () => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])
    const [showMenu, setShowMenu] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        // const data = await dispatch(postsActions.createNewPost(content))
        // if (data) {
        //     setErrors(data)
        // }
        dispatch(postsActions.createNewPost(content))
        dispatch(imagesActions.createNewImage(imageUrl))

        setContent('')
        setImageUrl('')
        // if (imageUrl) dispatch(imagesActions.createNewImage(imageUrl))
    }

    const ulRef = useRef();
    const ulClassName = "post" + (showMenu ? "" : " hidden");

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    return (
        <>
            <button onClick={openMenu}>
                Create a new post
            </button>
            <div className={ulClassName} ref={ulRef}>
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
        </>

    )
}

export default PostForm;
