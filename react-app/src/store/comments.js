const GET_COMMENTS = "comments/GET_COMMENTS"

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})

export const getAllComments = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });
    
    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            action.payload.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        default:
            return newState;
    }
}