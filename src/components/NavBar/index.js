import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom' //useHistory是react路由提供的用于获取history的hooks，除此以外，react路由还提供了useLocation、useParams、useRouteMatch这几个重要hooks，这样一来，组件即使没有被react路由直接渲染，也可以通过这些hooks们获取到老三样(即:history、match、location)。5-2-2 //文档：https://v5.reactrouter.com/web/api/Hooks
//import { withRouter } from "react-router-dom" //withRouter是个高阶组件，里面要包个组件，然后会返回个新组件，当新组建被渲染后，被withRouter包裹了的那个组件即使没有被react路由直接渲染，也可以获得老三样(即:history、match、location) //文档：https://v5.reactrouter.com/web/api/withRouter

//重要总结之获取history、match、location的方法：必须得是直接通过路由配置的组件（即:通过<Route></Route>渲染的组件）才能获取到这老三样，而自己定义的组件（比如当前的这个NavBar组件）是获取不到这老三样的，必须得借助一些手段才能获得，比如可以借助5-2-1讲的withRouter来实现，也可以借助5-2-2讲的react路由提供的几个相关hooks实现(推荐此法)。另外还可以先通过直接被路由配置的组件获取到老三样，然后再手动传给自己定义的组件，但是这种方式太笨拙了，不推荐！
function NavBar({ children, extra }) {
  const history = useHistory()
  const back = () => {
    //跳回上一页
    history.go(-1)
  }
  return (
    <div className={styles.root}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>

      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}

//export default withRouter(NavBar) //withRouter是个高阶组件，里面要包个组件，然后会返回个新组件，当新组建被渲染后，被withRouter包裹了的那个组件即使没有被react路由直接渲染，也可以获得老三样(即:history、match、location) //文档：https://v5.reactrouter.com/web/api/withRouter
export default NavBar
