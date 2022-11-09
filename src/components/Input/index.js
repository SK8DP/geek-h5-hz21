import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({ extra, onExtraClick, className, ...rest }) {//据我分析，这里的...rest是剩余参数，而下方的...rest是展开运算。通过这行，rest就是个对象了而且里面装了参数里除了extra和onExtraClick和className以外的键值对，然后下方又通过剩余参数运算符将rest这个对象展开了
  return (
    <div className={styles.root}>
      <input className={classNames('input', className)} {...rest} /> {/*如果用户也传了类名过来，就把传来的类名和固有的类名'input'合并作为当前组件的类名*/}
      {extra && (
        <div className='extra' onClick={onExtraClick}>
          {extra}
        </div>
      )}{/*即：使用Input组件的时候如果给我传了extra，我就显示后面那坨，否则不显示*/}
    </div>
  )
}
