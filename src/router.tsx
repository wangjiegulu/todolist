import React from 'react'
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
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
                return <Route exact path={item.path} component={item.component} />
              })}
            </Switch>
        </Router>
      )
}
export default router;