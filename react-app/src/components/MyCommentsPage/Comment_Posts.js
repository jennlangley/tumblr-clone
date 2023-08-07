// import React, {useEffect}from "react";
// import { useSelector, useDispatch } from "react-redux";
// import * as imagesActions from '../../store/images';
// import * as postsActions from "../../store/posts"


// const Comment_Posts = ({ postId }) => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(imagesActions.getAllImages())
//         dispatch(postsActions.getAllPosts())

//     }, [dispatch])

//     const post = useSelector(state => state.posts[postId])
//     const images = useSelector(state => state.images[postId])


//     return (
//         <>
//          <div>
//             <img alt={images?.id} src={images?.imageUrl} />
//             </div>
//         <div>{post.content}</div>
//         </>
//     )
// }

// export default Comment_Posts;
