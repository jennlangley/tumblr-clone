import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from '../../store/comments';
import * as postsActions from '../../store/posts';
import PostsPage from './'
import './MyComments.css';


const MyCommentsPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(commentsActions.getAllComments())
        dispatch(postsActions.getAllPosts())
    },[dispatch])

    const myComments = useSelector(state => (Object.values(state.comments)).filter((comment) => comment.userId === sessionUser.id))
    const posts = useSelector(state => state.posts)

    return (
        <>
        {sessionUser ? (
            myComments.map(comment =>
                <div key={comment.id} className='myComment'>
                    <div>{comment.content}</div>
                    <div>{comment.created_at}</div>
                </div>
            )

        ) : (
            <h1>Not Authorized</h1>
        )}
        </>
    )

}

export default MyCommentsPage;
