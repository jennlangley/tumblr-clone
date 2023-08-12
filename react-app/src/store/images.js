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

const editImageAction = (imageUrl) => ({
    type: EDIT_IMAGE,
    payload: imageUrl
})

export const editImage = (imageUrl) => async (dispatch) => {
    dispatch(editImageAction(imageUrl))
    dispatch(getAllImages())
}

export const createNewImage = (images) => async (dispatch) => {
    dispatch(createNewImageAction(images))
    dispatch(getAllImages())
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
            newState[action.payload.image.id] = action.payload.image;
            return newState;
        case EDIT_IMAGE:
            console.log(action.payload)
            newState[action.payload.image.id] = action.payload.image;
            return newState;
        default:
            return newState;
    }
}
