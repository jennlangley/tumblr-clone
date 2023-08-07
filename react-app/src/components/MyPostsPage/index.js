import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeletePostForm from "../PostModals/DeletePostForm";
import EditPostForm from "../PostModals/EditPostForm";
import Images from "../PostDetail/Images";
import OpenModalButton from "../OpenModalButton";
// import Comments from "../PostDetail/Comments";
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import * as commentsActions from '../../store/comments';

import './MyPosts.css';


const MyPostsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(postsActions.getAllPosts())
    //    dispatch(commentsActions.getAllComments())
        dispatch(imagesActions.getAllImages())
    }, [dispatch])

    const myPosts = useSelector(state => (Object.values(state.posts)).filter((post) => post.userId === sessionUser.id))

    // let orderPost = []
    // for(let i = 0; i < myPosts.length; i++) {
    //     let post = myPosts[i]
    //     orderPost.unshift(post)
    // }



    return (
        <>
        <div className='myPosts'>
        <div style={{color:'white'}}>{sessionUser?.username}'s Posts</div>
        {sessionUser ? (
            myPosts.map(post =>
                <div key={post.id} className='myPost'>
                     <div>{post.created_at}</div>
                    <Images postId={post.id} />
                    <div>{post.content}</div>
                    <OpenModalButton
                        buttonText=<i className="fa-regular fa-trash-can"></i>
                        modalComponent={<DeletePostForm postId={post.id}/>}/>
                    <OpenModalButton
                        buttonText='Edit Post'
                        modalComponent={<EditPostForm postId={post.id} />}
                        />

                </div>
            )

        ) : (
            <h1>Not Authorized</h1>
        )}

        </div>
        </>
    )
}

export default MyPostsPage;
