import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from './auth'
import shops from './shops'

export default combineReducers({ auth, shops, routing: routerReducer })
