const GET_COMMENTS = "comments/GET_COMMENTS";
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';

const getCommentsAction = (comments) => ({
    type: GET_COMMENTS,
    payload: comments
})

const createCommentAction = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment
})

const editCommentAction = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment
})

const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})

export const getComments = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getCommentsAction(data));
    }
}

export const createComment = (content, postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${postId}/comments`, {
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
        dispatch(createCommentAction(data))
    }
}

export const editComment = (commentId, content) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content})
    })

    if(response.ok) {
        const data = await response.json()
        dispatch(editCommentAction(data))
    }
}

export const deleteComment = ({commentId}) => async(dispatch) => {

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(deleteCommentAction(commentId))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            action.payload.comments.forEach(comment => newState[comment.id] = comment);
            return newState;
        case CREATE_COMMENT:
            newState[action.payload.comment.id] = action.payload.comment;
            return newState;
        case EDIT_COMMENT:
            newState[action.payload.comment.id] = action.payload.comment;
            return newState;
        case DELETE_COMMENT:
            delete newState[action.payload];
            return newState
        default:
            return newState;
    }
}
