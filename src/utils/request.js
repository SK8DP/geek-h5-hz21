import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getTokenInfo } from './storage'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://geek.itheima.net/v1_0',
})

//配置拦截器之请求拦截器
instance.interceptors.request.use(
  (config) => {
    //发送请求之前对config(即请求参数) do sth
    //获取token
    const token = getTokenInfo().token
    if (token) { //如果token存在，说明用户已登录，那么后续的所有请求参数中就得把token信息带上，进而告诉服务器用户已登录，由接口文档知：字段名是Authorization，字段值是'Bearer '加token
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    //对请求错误do sth
    return Promise.reject(error)
  }
)
//配置拦截器之响应拦截器
instance.interceptors.response.use(
  (response) => {
    //对响应数据do sth
    return response.data//这里改动了一下，我们这里让它只把axios响应回来的对象的data字段的值返回，这样返回值就更简洁，省去返回了一堆axios默认添加的没用的字段
  },
  (err) => {
    //对响应错误do sth
    if (err.response) { //统一处理错误提醒。 5-2-17
      Toast.info(err.response.data.message)
    } else { //如果进入这个分支说明是由于网络问题导致的err.response无内容，5-2-13、5-2-17
      Toast.info('网络繁忙，请稍后重试')
    }
    return Promise.reject(err) //这里必须把错误返回，因为Login组件得根据这个返回的错误Promise才能知道出错了(到时候会导致Login组件那边报错，所以那边就知道出错了。另外，不用担心出现报错，报错也是报在控制台而已，这对移动端没啥子影响，因为移动端用户无法看到控制台)，然后剩余代码就不执行了，否则出错了还会继续执行剩余代码，那就扯犊子了
  }
)

export default instance
