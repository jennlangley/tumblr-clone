const GET_IMAGES = "images/GET_IMAGES"
const CREATE_IMAGE = "images/CREATE_IMAGE"

const getImages = (images) => ({
    type: GET_IMAGES,
    payload: images
})

const createImage = (image) => ({
    type: CREATE_IMAGE,
    payload: image
})

export const getAllImages = () => async (dispatch) => {
    const response = await fetch("/api/posts", {
        headers: {
			"Content-Type": "application/json",
		},
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getImages(data));
    }
}

export const createNewImage = (imageUrl) => async (dispatch) => {

    const response = await fetch("/api/posts", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            imageUrl
        })
    })

    if (response.ok) {
		const data = await response.json();
		dispatch(createImage(data));
        return data
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
        default:
            return newState;
    }
}
