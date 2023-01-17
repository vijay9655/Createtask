import {createStore,applyMiddleware} from 'redux';
import RootReducer from './root-reducer';
import reduxThunk from 'redux-thunk';

const middleware=[reduxThunk];
const store=createStore(RootReducer,applyMiddleware(...middleware))

export default store;
