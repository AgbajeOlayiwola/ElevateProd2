import { getProfileImg } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    getProfileImg: null,
    getProfileImgError: null
};

const getProfileImgReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case getProfileImg.GETPROFILEIMG_LOAD_START:
            return {
                ...state,
                isLoading: true,
                getProfileImgs: null,
                getProfileImgError: null
            };
        case getProfileImg.GETPROFILEIMG_LOAD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                getProfileImg: payload
            };
        case getProfileImg.GETPROFILEIMG_LOAD_ERROR:
            return {
                ...state,
                isLoading: false,
                getProfileImgError: payload
            };

        default:
            return state;
    }
};

export default getProfileImgReducer;
