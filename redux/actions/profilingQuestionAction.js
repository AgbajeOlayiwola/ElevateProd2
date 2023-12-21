import apiRoutes from '../helper/apiRoutes';
import { profilingQuestions } from '../types/actionTypes';
import axiosInstance from '../helper/apiClient';
//profilingQuestions actions
export const profilingQuestionsLoadStart = () => ({
    type: profilingQuestions.PROFILING_QUESTIONS_START
});

export const profilingQuestionsLoadSuccess = (profilingQuestion) => ({
    type: profilingQuestions.PROFILING_QUESTIONS_SUCCESS,
    payload: profilingQuestion
});

export const profilingQuestionsLoadError = (errorMessage) => ({
    type: profilingQuestions.PROFILING_QUESTIONS_ERROR,
    payload: errorMessage
});

export const loadprofilingQuestions = () => (dispatch) => {
    dispatch(profilingQuestionsLoadStart());
    axiosInstance
        .get(`${apiRoutes.profilingQuestions}`)
        .then((response) =>
            dispatch(profilingQuestionsLoadSuccess(response?.data?.data))
        )
        .catch((error) =>
            dispatch(profilingQuestionsLoadError(error?.response?.message))
        );
};
//profilingQuestions actions end
