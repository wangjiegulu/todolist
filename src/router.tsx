import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import Main from './main'

const routers = [
  {
    path: '/',
    component: Main
  }
]

const router = () => {
    return (
        <Router>
            <Switch>
              {routers.map((item, index)=>{
                return <Route key={item.path} exact path={item.path} component={item.component} />
              })}
            </Switch>
        </Router>
      )
}
export default router;