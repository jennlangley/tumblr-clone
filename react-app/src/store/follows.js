const GET_FOLLOWS = 'follows/GET_FOLLOWS';
const CREATE_FOLLOW = 'follows/CREATE_FOLLOW';
const DELETE_FOLLOW = 'follows/DELETE_FOLLOW';

const getFollowsAction = (follows) => ({
    type: GET_FOLLOWS,
    payload: follows
})

const createFollowAction = (follow) => ({
    type: CREATE_FOLLOW,
    payload: follow
})

const deleteFollowAction = (followId) => ({
    type: DELETE_FOLLOW,
    payload: followId
})

export const getFollows = () => async (dispatch) => {
    const response = await fetch("/api/follows", {
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(getFollowsAction(data))
        // dispatch(getFollowsAction(data))
    }
}

export const createFollow = (followedId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${followedId}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createFollowAction(data));
    }
}

export const deleteFollow = (followId) => async (dispatch) => {
    const response = await fetch(`/api/follows/${followId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteFollowAction(followId))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_FOLLOWS:
            action.payload.forEach(follow => newState[follow.id] = follow);
            return newState;
        case CREATE_FOLLOW:
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_FOLLOW:
            delete newState[action.payload];
            return newState;
        default:
            return newState;
    }
}