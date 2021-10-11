const SET_APP_INITIALISED = 'SET_APP_INITIALISED';

const initialState = {
    appInitialised: false
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_APP_INITIALISED:
            return { ...state, appInitialised: true }
        default:
            return state;
    }
}

export const setAppInitialised = (payload) => ({ type: SET_APP_INITIALISED, payload })