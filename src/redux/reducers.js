import STATE from './reducers/STATE';

export default function combineReducers(state = {}, action) {
    
    return {
        webState: STATE(state.webState, action),
    }
}