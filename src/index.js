import React from './react'

import ReactDom from './react-dom'

let root = document.querySelector('#root')

ReactDom.render(
  React.createElement(
    'ul',
    { className: 'list' },
    React.createElement('li', { className: 'item' }, 'item'),
    React.createElement('li', { className: 'item' }, 'item'),
    React.createElement('li', { className: 'item' }, 'item')
  ),
  root
)
