import { createStore, applyMiddleware, Store, AnyAction, Dispatch } from 'redux';
import reducers, { CombinedState } from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk'
import promise from 'redux-promise';
import history from './history';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

let store: Store<CombinedState, AnyAction> = createStore<any, AnyAction, {}, {}>(persistedReducer, applyMiddleware(thunk, routerMiddleware(history), promise, logger));
let persistor = persistStore(store);
export type StoreGetState = () => CombinedState;
export type StoreDispatch = Dispatch & ThunkDispatch<CombinedState, any, AnyAction>;
export { store, persistor };