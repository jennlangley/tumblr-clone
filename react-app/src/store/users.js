const GET_USERS = "users/GET_USERS";

const getUsersAction = (users) => ({
    type: GET_USERS,
    payload: users
})

export const getUsers = () => async (dispatch) => {
    const response = await fetch('api/users', {
        "Content-Type": "application/json"
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(getUsersAction(data.users))
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state };
    switch (action.type) {
        case GET_USERS:
            action.payload.forEach(user => newState[user.id] = user);
            return newState;
    default:
        return newState;
    }
}