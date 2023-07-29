const GET_POSTS = "posts/GET_POSTS"
const CREATE_POST = "posts/CREATE_POST"

const getPosts = (posts) => ({
    type: GET_POSTS,
    payload: posts
})

const createPost = (post) => ({
    type: CREATE_POST,
    payload: post
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

export const createNewPost = (content) => async (dispatch) => {
    console.log(content)
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(content)
    })

    if (response.ok) {
        const data = await response.json();
        
        // if (data.errors) {
        //     return data.errors;
        // }

        dispatch(createPost(data))
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
        default:
            return newState;
    }
}