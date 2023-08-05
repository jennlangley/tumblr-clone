const GET_COMMENTS = "comments/GET_COMMENTS"
const GET_USER_COMMENTS = 'comments/GET_USER_COMMENTS'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
const CREATE_COMMENT = 'comments/CREATE_COMMENT'
const EDIT_COMMENT = 'comments/EDIT_COMMENT'

const getComments = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})

const userComments = (userData) => ({
    type: GET_USER_COMMENTS,
    payload: userData
})

const createThisComment = (commentData) => ({
    type: CREATE_COMMENT,
    payload: commentData
})

const editThisComment = (editData) => ({
    type: EDIT_COMMENT,
    payload: editData
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

export const createMyComment = ({content}, postId) => async (dispatch) => {

    const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(createThisComment(data))
    }
}

export const editComment = (content, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(editThisComment(data))
    }
}

export const deleteMyComment = ({commentId}) => async(dispatch) => {

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
        case CREATE_COMMENT:
             newState[action.payload.commentData.id] = action.payload.commentData;
            return newState;
        case EDIT_COMMENT:
            newState[action.payload.editData.id] = action.payload.editData;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.payload.commentId];
            return newState
        default:
            return newState;
    }
}
