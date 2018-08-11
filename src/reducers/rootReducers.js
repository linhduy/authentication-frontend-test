import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import commentReducer from './commentReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    routerReducer,
    loginReducer,
    commentReducer
});

export default rootReducer;