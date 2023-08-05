import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import * as postsActions from "../../store/posts";
import * as imageActions from "../../store/images";

const EditPostForm = ({postId}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(()=> {
        dispatch(postsActions.getAllPosts())
        dispatch(imageActions.getAllImages())
    },[dispatch])

    const myPost = useSelector(state => Object.values(state.posts).filter((post => post.id === postId)))
    const myImage = useSelector(state => Object.values(state.images).filter(image => image.postId === postId))


    const [content, setContent] = useState(myPost[0].content);
    const [imageUrl, setImageUrl] = useState(myImage[0].imageUrl);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(postsActions.editPost(content))
        await dispatch(imageActions.editImage(imageUrl))
        closeModal()
    }

    useEffect(() => {
        if (hasSubmitted) {
            const errors = []
            if (!content) errors.push('Post must have some content!')
            setErrors(errors)
        }
    }, [hasSubmitted, content, imageUrl]);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
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
                    <button type='submit'>Edit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default EditPostForm;
