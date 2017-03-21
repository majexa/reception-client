import { combineReducers } from 'redux'
import size from './size'
import navigation from './navigation'
import phone from './phone'
import auth from './auth'
import schedule from './schedule'

export default combineReducers({
  size,
  navigation,
  phone,
  auth,
  schedule
})