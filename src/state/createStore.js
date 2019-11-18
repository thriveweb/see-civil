import { createStore as reduxCreateStore } from "redux"
import { combineReducers } from 'redux'

import companyReducer from './reducers/reducer_company'


const reducer = combineReducers({
    activeCompany: companyReducer,
})


const createStore = () => reduxCreateStore(reducer)
export default createStore
