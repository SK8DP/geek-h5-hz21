//此组件为封装的Icon组件，可以根据传入的参数渲染指定的图标。5-1-20
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types' //5-1-20

function Icon({ type, className, ...rest }) { //据我分析，这里的...rest是剩余参数，而下方的...rest是展开运算。通过这行，rest就是个对象了而且里面装了参数里除了type和className以外的键值对，然后下方又通过剩余参数运算符将rest这个对象展开了
  return (
    <svg {...rest} className={classNames('icon', className)} aria-hidden="true"> {/*classNames()可以把参数里的这些类名自动拼接成字符串*/}
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes = {//校验
  type: PropTypes.string.isRequired, //type必须传，否则就报错提示之
}

export default Icon

