const GET_LIKES = "likes/GET_LIKES";
const CREATE_LIKE = "likes/CREATE_LIKE";

const getLikesAction = (likes) => ({
    type: GET_LIKES,
    payload: likes
});
const createLikeAction = (like) => ({
    type: CREATE_LIKE,
    payload: like
})

export const getLikes = () => async (dispatch) => {
    const response = await fetch("/api/likes", {
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getLikesAction(data));
    }
}

export const createLike = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createLikeAction(data))
        // dispatch
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_LIKES:
            action.payload.likes.forEach(like => newState[like.id] = like);
            return newState;
        case CREATE_LIKE:
            newState[action.payload.like.id] = action.payload.like;
            return newState;
        default: 
            return newState;
    }

}