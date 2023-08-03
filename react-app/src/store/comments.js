const GET_COMMENTS = "comments/GET_COMMENTS"
const GET_USER_COMMENTS = 'comments/GET_USER_COMMENTS'

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})

const userComments = (userData) => ({
    type: GET_USER_COMMENTS,
    payload: userData
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

export const getUserComments = ({userId}) => async(dispatch) => {
    const response = await fetch(`/api/comments/${userId}`, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(userComments(data))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            action.payload.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        case GET_USER_COMMENTS:
            action.payload.userData.forEach(comment => newState[comment.id] = comment);
            return newState;
        default:
            return newState;
    }
}
