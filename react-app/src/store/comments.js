const GET_COMMENTS = "comments/GET_COMMENTS"
const GET_USER_COMMENTS = 'comments/GET_USER_COMMENTS'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})

const userComments = (userData) => ({
    type: GET_USER_COMMENTS,
    payload: userData
})

const deleteThisComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
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

export const getUserComments = ({userId}) => async (dispatch) => {
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

export const deleteComment = ({commentId}) => async(dispatch) => {

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(deleteThisComment(commentId))
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
        case DELETE_COMMENT:
            delete newState[action.payload.commentId];
            return newState
        default:
            return newState;
    }
}
