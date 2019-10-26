function createElement(tagName, attrs, ...children) {
  return {
    tagName,
    attrs,
    children
  }
}

let React = {
  createElement
}

export default React
