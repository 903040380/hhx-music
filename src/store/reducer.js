import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'

export default combineReducers({
  // 合并不同模块 reducer
  recommend: recommendReducer,
})
