import { profilingQuestions } from '../types/actionTypes';

const initialState = {
    isLoading: false,
    profilingQuestions: null,
    profilingQuestionsError: null
};

const profilingQuestionsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case profilingQuestions.PROFILING_QUESTIONS_START:
            return {
                ...state,
                isLoading: true,
                profilingQuestions: null,
                profilingQuestionsError: null
            };
        case profilingQuestions.PROFILING_QUESTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profilingQuestions: payload
            };
        case profilingQuestions.PROFILING_QUESTIONS_ERROR:
            return {
                ...state,
                isLoading: false,
                profilingQuestionsError: payload
            };

        default:
            return state;
    }
};

export default profilingQuestionsReducer;
