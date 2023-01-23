# 云音乐项目

## 知识点

- absolute top bottom 可以自动拉伸高度并固定，数值不同高度也不同
- relative 下的 absolute 不会溢出

- useEffect 在渲染后运行所以肯定可以拿到 ref，ref 可以通过回调函数的参数拿到组件节点来进行处理
- 组件包裹 memo，建议在开发后进行性能测试再处理，所有组件都包裹会徒增性能损耗
- 在将数据变成状态前进行 immer 处理

## redux

### state

在 reducer 中初始化
也可以在 createStore 第二个参数上初始化

### action

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```js
const actionRecommend = {
  type: 'RECOMMEND',
  data: {},
}

const actionCreatorRecommend = (data) => ({
  type: 'RECOMMEND',
  data: data,
})
```

### reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer，即 Reducer 根据 Store.dispatch 传来的 Action 得到新的 State

```js
export default (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data)
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data)
    default:
      return state
  }
}
```

为什么这个函数叫做 Reducer 呢？因为它可以作为数组的 reduce 方法的参数。请看下面的例子，一系列 Action 对象按照顺序作为一个数组。

```js
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 },
]

const total = actions.reduce(reducer, 0) // 3
```

上面代码中，数组 actions 表示依次有三个 Action，分别是加 0、加 1 和加 2。数组的 reduce 方法接受 Reducer 函数作为参数，就可以直接得到最终的状态 3。

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

- 不得改写参数
- 不能调用系统 I/O 的 API
- 不能调用 Date.now()或者 Math.random()等
  不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

### store

```js
import { createStore } from 'redux'

const store = createStore(Reducer)
```

- store.getState() 获取状态
- store.dispatch(Action) 发出 Action 给 Store 改变状态 的唯一方法，发出后自动调用 Reducer，Reducer 根据 Action 得到新的 State
- store.subscribe(Listener) 一旦 State 发生变化，就自动执行 Listener 函数

### 中间件

中间件实现异步。Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步

中间件就是一个函数，对 store.dispatch 方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。

```js
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
const logger = createLogger()

const store = createStore(reducer, applyMiddleware(logger))
```

- applyMiddleware(中间件) 可以放在 createStore 第二个参数上，createStore 方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware(中间件) 就是第三个参数了

- 中间件的次序有讲究

同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。
除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。

#### redux-thunk

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？

```js
// Action Creator
export const getRecommendList = () => {
  // 可以先发出一个Action
  return (dispatch) => {
    getRecommendListRequest()
      .then((data) => {
        dispatch(changeRecommendList(data.result))
        // 可以再发出一个Action
      })
      .catch(() => {
        console.log('推荐歌单数据传输错误')
      })
  }
}

store.dispatch(getRecommendList())
```

而 store.dispatch 方法正常情况下，参数只能是对象，不能是函数。
使用 redux-thunk 中间件，改造 store.dispatch，使得后者可以接受函数作为参数。

### react-redux

UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

#### connect

React-Redux 提供 connect 方法，用于从 UI 组件生成容器组件。connect 的意思，就是将这两种组件连起来。

```js
connect(mapStateToProps, mapDispatchToProps)(Recommend)
```

两个参数，前者将 Atate 映射到 UI 组件的参数（props），后者将 Action 映射到 UI 组件的参数（props）

#### Provider

React-Redux 提供 Provider 组件，可以让容器组件拿到 state。

```js
<Provider store={store}>
  <HashRouter>
    <GlobalStyle></GlobalStyle>
    <IconStyle></IconStyle>
    {renderRoutes(routes)}
  </HashRouter>
</Provider>
```
