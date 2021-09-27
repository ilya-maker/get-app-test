import * as types from './types';

const initialState = {
    todos: [],
}

export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case types.SET_TODOS:
            return {
                ...state,
                todos: payload
            }
        
        default:
            return state;
    }
}