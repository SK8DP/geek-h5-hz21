import request from '@/utils/request'
import { setTokenInfo } from '@/utils/storage'

export const sendCode = (mobile) => {//这个函数用于发请求获取验证码，这函数本来直接写到组件里就行，或者单独再封装也可以，这里没有这么做主要是为了将所有数据相关的操作都集成到redux里才专门写到了这里 //这函数的路子就相当于是redux的异步action那一套
  return async () => { //按照redux的异步action那一套来讲，这里的参数里本应传个dispatch，但是由业务逻辑知这里发个请求要到验证码就完事儿了，并不需要对数据做任何操作，也不需要存数据，所以就用不到dispatch了
    //发送请求
    await request({
      url: '/sms/codes/' + mobile,
      method: 'get',
    })
  }
}

export const saveToken = (payload) => { //这个action用于保存登录成功后的token
  return {
    type: 'login/token',
    payload,
  }
}

/**
 * 登录功能
 * @param {*} data 
 * @returns 
 */
export const login = (data) => { //这个函数用于发请求进行登录，这函数本来直接写到组件里就行，或者单独再封装也可以，这里没有这么做主要是为了将所有数据相关的操作都集成到redux里才专门写到了这里 //这函数的路子就相当于是redux的异步action那一套
  return async (dispatch) => {
    //发请求进行登录
    const res = await request({
      method: 'post',
      url: '/authorizations',
      data,
    })
    //保存token到redux中
    dispatch(saveToken(res.data))
    //保存token到本地localstorage中
    setTokenInfo(res.data)
  }
}
