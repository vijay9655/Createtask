import { combineReducers } from 'redux'
import reducer from './reducer';

const RootReducer=combineReducers({data:reducer})

export default RootReducer;