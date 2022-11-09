import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/storage'

//createStore()参数1：reducer。 5-2-19
//createStore()参数2：指定store的初始值。 5-2-19
//createStore()参数3：指定中间件。 5-2-19
const store = createStore(
  reducer,
  {
    login: getTokenInfo(), //这里就从本地localstorage里读取出token数据并将之作为了store里的login模块的初始值。 5-2-19
  },
  composeWithDevTools(applyMiddleware(thunk)))

export default store
