const GET_IMAGES = "images/GET_IMAGES"
const CREATE_IMAGE = "images/CREATE_IMAGE"
const EDIT_IMAGE = "images/EDIT_IMAGE"

const getAllImagesAction = (images) => ({
    type: GET_IMAGES,
    payload: images
})

const createNewImageAction = (image) => ({
    type: CREATE_IMAGE,
    payload: image
})

const editImageAction = (image) => ({
    type: EDIT_IMAGE,
    payload: image
})

export const editImage = (image) => async (dispatch) => {
    dispatch(editImageAction(image))
}

export const createNewImage = (image) => async (dispatch) => {
    dispatch(createNewImageAction(image))
}

export const getAllImages = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getAllImagesAction(data));
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = { ...state }

    switch (action.type) {
        case GET_IMAGES:
            action.payload.images.forEach(image => newState[image.id] = image);
            return newState;
        case CREATE_IMAGE:
            newState[action.payload.id] = action.payload;
            return newState;
        case EDIT_IMAGE:
            newState[action.payload.id] = action.payload;
            return newState;
    default:
        return newState;
    }
}
