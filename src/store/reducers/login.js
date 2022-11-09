//此组件是登录相关的reducer
const initValue = {
  token: '',
  refresh_token: '',
}

export default function reducer(state = initValue, action) {
  const { type, payload } = action
  if (type === 'login/token') {
    return payload //这是登录成功之后的token
  }
  return state
}
