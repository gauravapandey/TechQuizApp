const SET_QUIZ_DOMAIN = 'SET_QUIZ_DOMAIN';

const initialState = {
    domainList: []
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_QUIZ_DOMAIN:
            return { ...state, domainList: action.payload }
        default:
            return state;
    }
}

export const setQuizDomain = (payload) => ({ type: SET_QUIZ_DOMAIN, payload })