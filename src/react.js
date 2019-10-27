import { Component } from './react-dom'
function createElement(tagName, attrs, ...children) {
  return {
    tagName,
    attrs,
    children
  }
}

let React = {
  createElement,
  Component
}

export default React
