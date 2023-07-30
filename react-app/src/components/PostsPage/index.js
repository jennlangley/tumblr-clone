import React from "react";
import { useSelector } from "react-redux";
import PostForm from '../PostForm/index'
import Comments from "../PostDetail/Comments";
import Images from "../PostDetail/Images";
import './PostsPage.css';

const PostsPage = ({ isLoaded }) => {


    const posts = useSelector(state => state.posts)
    
    return (
        isLoaded &&
        <div className="posts">
            <PostForm />
            <div className="">
                {Object.values(posts).map(post => 
                    <div key={post.id} className="post">
                        <Images postId={post.id} />
                        <div>{post.content}</div>
                        <div>{post.created_at}</div>
                        <Comments postId={post.id} />
                    </div>
                )}
                </div>
            </div>
    )

}

export default PostsPage;
