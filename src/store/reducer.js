import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as singersReducer } from '../application/Singers/store/index'

// redux也提供combineReducers，但是因为用了immutable所以需要特地引入redux-immutable
export default combineReducers({
  // 合并不同模块 reducer
  recommend: recommendReducer,
  singers: singersReducer,
})
