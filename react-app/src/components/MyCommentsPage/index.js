import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from '../../store/comments';
import * as postsActions from '../../store/posts';
import * as imagesActions from '../../store/images';
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../CommentModal/DeleteComment";
import EditComment from "../CommentModal/EditComment";
import './MyComments.css';



const MyCommentsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    // useEffect(() => {
    //     dispatch(commentsActions.getAllComments())
    //     dispatch(postsActions.getAllPosts())
    //     dispatch(imagesActions.getAllImages())
    // },[dispatch])

    const myComments = useSelector(state => (Object.values(state.comments)).filter((comment) => comment.userId === sessionUser.id))
    const post = useSelector(state => state.posts)
    const image = useSelector(state => state.images)

    // console.log(myComments)

    // let orderComment = []
    // for(let i = 0; i < myComments.length; i++) {
    //     let comment = myComments[i]
    //     orderComment.unshift(post)
    // }

    // console.log(orderComment)

    return (
        <>
        <div className='myComments'>
        <div style={{color:'white'}}>{sessionUser?.username}'s Comments</div>
        {sessionUser ? (
            myComments.map(comment =>
                <div key={comment.id} className='myComment'>
                   <div>
                    <img alt='' src={image[comment.postId]?.imageUrl} /></div>
                   <div>{post[comment.postId]?.content}</div>
                   <div>{comment.content}</div>
                    <OpenModalButton
                        buttonText=<i className="fa-regular fa-trash-can"></i>
                        modalComponent={<DeleteComment commentId={comment.id}/>}
                        />
                    <OpenModalButton
                        buttonText='Edit Comment'
                        modalComponent={<EditComment commentId={comment.id} />}
                        />
                    <div>{comment.created_at}</div>
                </div>
            )

        ) : (
            <h1>Not Authorized</h1>
        )}

        </div>
        </>
    )

}

export default MyCommentsPage;
