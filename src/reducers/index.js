import { combineReducers } from 'redux'
import loading from './loading'
import size from './size'
import navigation from './navigation'
import phone from './phone'
import auth from './auth'
import schedule from './schedule'

export default combineReducers({
  loading,
  size,
  navigation,
  phone,
  auth,
  schedule
})