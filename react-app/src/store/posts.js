const GET_POSTS = "posts/GET_POSTS"

const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

export const getAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(getPosts(data));
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_POSTS:
            action.payload.posts.forEach(post => newState[post.id] = post);
            return newState;
        default:
            return newState;
    }
}