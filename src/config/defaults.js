const React = require('react')
const isValidElement = require('react').isValidElement
const NotFound = require('../components/NotFound').default

// Valid configs:
// 1. Valid React element
// <Component />

// 2. Array of routes
// [{ path: '', component: '' }]

// 3. Function
// content => [{ path: '', component: '' }]

// 4. Object
// { routes: content => [{ path: '', component: '' }] }

const defaultConfig = {
  routes: () => [],
  notFoundRoute: {
    title: '404 not found',
    component: <NotFound />
  },
  template: (html, title) => {
    return `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">
          ${html}
        </div>
      </body>
      </html>
    `
  }
}

module.exports = function defaults (entry) {
  if (entry.default) {
    return defaults(entry.default)
  }

  // Valid React element
  if (isValidElement(entry)) {
    return Object.assign({}, defaultConfig, {
      routes: () => [{ path: '/', component: entry }]
    })
  }

  // Array
  if (entry.constructor === Array) {
    return Object.assign({}, defaultConfig, {
      routes: () => entry
    })
  }

  // Object
  if (typeof entry === 'object' && entry.constructor === Object) {
    return Object.assign({}, defaultConfig, entry)
  }

  // Function
  if (typeof entry === 'function') {
    return Object.assign({}, defaultConfig, {
      routes: entry
    })
  }
}
