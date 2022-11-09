//此组件表示登录页面
import NavBar from "@/components/NavBar"
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from "formik"; //formik用于表单的受控、验证、提交，详见5-2-7，文档https://formik.org/docs/tutorial
import * as Yup from 'yup' //yup详见5-2-8（注意:5-2里有两个5-2-8，别弄混了），文档https://formik.org/docs/tutorial#schema-validation-with-yup
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { login, sendCode } from "@/store/actions/login";
import { Toast } from "antd-mobile";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)
  const onExtraClick = async () => {//当点击了“获取验证码”会触发此函数
    if (time > 0) return //time>0说明当前还处于发送验证码之后的60秒倒计时内，那此时当然不能点击
    if (!/^1[3-9]\d{9}$/.test(mobile)) {//先验证输入的手机号是否合法
      formik.setTouched({ //触发mobile输入框的失去焦点行为，这样才能对mobile输入框执行错误提醒，5-2-11
        mobile: true,
      })
      return//如果输入的手机号不合法，直接就停止了，就不发请求了
    }
    await dispatch(sendCode(mobile)) //发请求获取验证码，注意：这里的“获取验证码”指的是把验证码发给用户，而不是说程序要拿到验证码 //注意：这里的sendCode(mobile)的返回值是异步函数，所以推理易知dispatch(sendCode(mobile))也是异步函数，5-2-11 //这里的await必不可少，否则永远都进不了catch那个分支
    Toast.success('获取验证码成功')
    //开启倒计时
    setTime(5)
    let timeId = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
  }

  const formik = useFormik({ //formik用于表单的受控、验证、提交，详见5-2-7，文档https://formik.org/docs/tutorial //useFormik()的返回值里就包含了所有需要传给表单的东西
    initialValues: { //设置表单的初始值
      mobile: '13911111111',
      code: '246810',
    },
    async onSubmit(values) { //当提交表单后会执行此逻辑
      await dispatch(login(values))
      Toast.success('登录成功')
      //跳转到首页
      history.push('/home')
    },
    // validate(values) { //表单校验 5-2-8 //文档：https://formik.org/docs/guides/validation
    //   const errors = {} //如果校验没错的话，这就是个空对象，如果有错，错误就会记录到这个对象里。到时候也就是根据这个对象里的内容判断校验到底有没有错能不能通过
    //   if (!values.mobile) {
    //     errors.mobile = '手机号不能为空'
    //   }
    //   if (!values.code) {
    //     errors.code = '验证码不能为空'
    //   }
    //   return errors
    // },
    validationSchema: Yup.object({
      mobile: Yup.string().required('手机号不能为空').matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
      code: Yup.string().required('验证码不能为空').matches(/^\d{6}$/, '验证码格式错误'),
    }),
  })
  //console.log(formik);
  const {
    values: { mobile, code },//意思是先从formik里解构出了values对象，然后又进一步从values对象里结构出了mobile和code字段值
    handleChange,
    handleSubmit,
    handleBlur,
    errors,//这个属性对应你在之前的那个validate()或validationSchema里搞的东西
    touched,//这个属性对应你之后通过每个输入框的onBlur事件 获知的该输入框有没有被点击过的信息
    isValid,//这个属性表示表单校验是否通过
  } = formik
  return (
    <div className={styles.root}>
      {/*导航条*/}
      <NavBar>登录</NavBar>
      {/*内容*/}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="请输入手机号"
              value={mobile}
              name="mobile"
              autoComplete="off"
              onChange={handleChange}
              onBlur={handleBlur} //通过onBlur事件就能知道当前输入框有没有被点击过，由此通过和touched属性配合使用就可以实现只针对点击过的输入框进行出错提醒，进而避免所有的输入框同时出现报错提醒。5-2-8
              maxLength={11}
            ></Input>
            {touched.mobile && errors.mobile ? (//即:必须得是你触摸过该输入框而且该输入框由错误提示信息才显示后面那坨，否则不显示
              <div className="validate">{errors.mobile}</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra={time === 0 ? '获取验证码' : time + 's后获取'}
              onExtraClick={onExtraClick}//当点击了“获取验证码”
              value={code}
              name="code"
              onChange={handleChange}
              autoComplete="off"
              onBlur={handleBlur} //通过onBlur事件就能知道当前输入框有没有被点击过，由此可以实现只针对点击过的输入框进行出错提醒，进而避免所有的输入框同时出现报错提醒。5-2-8
              maxLength={6}
            ></Input>
            {touched.code && errors.code ? (//即:必须得是你触摸过该输入框而且该输入框由错误提示信息才显示后面那坨，否则不显示
              <div className="validate">{errors.code}</div>
            ) : null}
          </div>
          {/*登录按钮*/}
          <button type="submit"
            className={classNames('login-btn', { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
