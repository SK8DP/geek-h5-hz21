import ReactDOM from 'react-dom'
import App from './App'
import store from '@/store'
import { Provider } from 'react-redux'
//导入通用样式
//import 'antd-mobile/dist/antd-mobile.css' //因为已经配置了按需导入，所以这里就不需要导入antd-mobile.css了，详见5-1-14
import '@scss/index.scss' //因为已经在config-overrides.js里已经配置了路径别名并在jsconfig.json里配置了路径提示了，所以这里的路径可以这么搞，详见5-1-15

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
