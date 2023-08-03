import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts';
import './MyPosts.css';


const MyPostsPage = () => {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        {sessionUser ? (
            <h1>My Posts Page</h1>
        ) : (
            <h1>Not Authorized</h1>
        )}
        </>
    )
}

export default MyPostsPage;
