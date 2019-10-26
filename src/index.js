import React from './react'

import ReactDom from './react-dom'

let root = document.querySelector('#root')

ReactDom.render(
  React.createElement(
    'ul',
    { className: 'list' },
    React.createElement(
      'li',
      { className: 'item', style: 'background: red' },
      'item'
    ),
    React.createElement(
      'li',
      { className: 'item', style: { color: 'blue' } },
      'item'
    ),
    React.createElement(
      'li',
      {
        className: 'item',
        onClick: function() {
          window.alert('触发点击事件')
        }
      },
      'item'
    )
  ),
  root
)
