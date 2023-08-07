import * as imagesActions  from './images'

const GET_POSTS = "posts/GET_POSTS";
const CREATE_POST = "posts/CREATE_POST";
const DELETE_POST = "posts/DELETE_POST";
const EDIT_POST = "posts/EDIT_POST";

const getAllPostsAction = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
})

const editPostAction = (editData) => ({
    type: EDIT_POST,
    payload: editData
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

export const createNewPost = (content, imageUrl) => async (dispatch) => {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
            imageUrl
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createPost(data))
        dispatch(imagesActions.createNewImage(data))
    }
}

export const editPost = (postId, content, imageUrl) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content, imageUrl
        })
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(editPostAction(data))
        // dispatch(imagesActions.editImage(data))
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
