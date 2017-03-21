import React from 'react'
import ReactDOM from 'react-dom'
import Provider from './components/Provider'
import history from './history'
import configDefaults from './config/defaults'

// Provided through webpack resolve alias in webpack.config.js
const config = configDefaults(require('config'))

const content = JSON.parse(window.content || '{}')
const scripts = JSON.parse(window.scripts || '{}')
const routes = config.routes(content)

function route () {
  const pathname = history.location.pathname
  const route = routes.find(route => route.path === pathname) || config.notFoundRoute
  const { component, title } = route

  ReactDOM.render((
    <Provider title={title} content={content} config={config} scripts={scripts}>
      {component}
    </Provider>
  ), root)
}

history.listen(route)
window.addEventListener('load', route)
