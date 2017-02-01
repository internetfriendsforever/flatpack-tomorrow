const ReactDOM = require('react-dom')
const history = require('./history')
const normalizeEntry = require('./normalizeEntry')

const entry = normalizeEntry(require('entry'))

const content = JSON.parse(window.content || '{}')
const routes = entry.routes(content)

function render () {
  const pathname = history.location.pathname
  const route = routes.find(route => route.path === pathname)

  if (route) {
    const root = document.getElementById('root')
    ReactDOM.render(route.component, root)
  } else {
    console.log(pathname, 'matched no routes')
  }
}

history.listen(render)

window.addEventListener('load', render)