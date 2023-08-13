import * as imagesActions  from './images'

const GET_POSTS = "posts/GET_POSTS";
const CREATE_POST = "posts/CREATE_POST";
const DELETE_POST = "posts/DELETE_POST";
const EDIT_POST = "posts/EDIT_POST";
const ADD_REPOST = "posts/ADD_REPOST"

const getAllPostsAction = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const postRepost = (post) => ({
    type: ADD_REPOST,
    payload: post
})

const editPostAction = (post) => ({
    type: EDIT_POST,
    payload: post
})

const deletePostAction = (postId) => ({
    type: DELETE_POST,
    payload: postId
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllPostsAction(data));
    }
}

export const createNewPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        body: post
    })

    if (response.ok) {
        const resPost = await response.json();
        dispatch(createPost(resPost))
        if (resPost.image) {
            dispatch(imagesActions.createNewImage(resPost))
        }
        
    } else {
        console.log("there was an error making your post!")
    }
}

export const repost = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/repost`, {
        method: "POST",
  
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(postRepost(data))
    } else {
        return response.errors;
    }
}

export const editPost = (postId, post) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: post
    })
    
    if (response.ok) {
        const data = await response.json();
        dispatch(editPostAction(data.post))
        if (data.image) {
            dispatch(imagesActions.editImage(data.image))
        }
        
    } else {
        console.log('there was an error making your post!')
    }
}

export const deletePost = ({postId}) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deletePostAction(postId))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_POSTS:
            action.payload.posts.forEach(post => newState[post.id] = post);
            return newState;
        case CREATE_POST:
            newState[action.payload.post.id] = action.payload.post;
            return newState;
        case ADD_REPOST:
            newState[action.payload.post.id] = action.payload.post;
            return newState;
        case EDIT_POST:
            newState[action.payload.post.id] = action.payload.post;
            return newState;
        case DELETE_POST:
            delete newState[action.payload];
            return newState;
        default:
            return newState;
    }
}
