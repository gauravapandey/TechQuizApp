import { combineReducers } from 'redux';
import { domainReducer as domain } from './domain';
import { commonReducer as common } from './common';

const rootReducer = combineReducers({
    domain,
    common
});

export default rootReducer;