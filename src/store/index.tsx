import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import reducers, { CombinedState } from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import { ThunkDispatch, ThunkAction } from 'redux-thunk'
import promise from 'redux-promise';
import history from './history';
import { routerMiddleware } from 'connected-react-router';
let store: Store<CombinedState, AnyAction> = createStore<CombinedState, AnyAction, {}, {}>(reducers, applyMiddleware(thunk, routerMiddleware(history), promise, logger));
export default store;