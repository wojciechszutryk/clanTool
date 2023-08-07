import { combineReducers } from 'redux';
import reducer from './reducer';

const reducers = combineReducers({
  app: reducer,
});

export default reducers;
