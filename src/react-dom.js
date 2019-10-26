function render(vdom, rootElement) {
  // root节点相对特殊, 因此单独处理
  rootElement.appendChild(_render(vdom))
  function _render(vdom) {
    let { tagName, attrs, children = [] } = vdom
    let element = document.createElement(tagName)
    for (let child of children) {
      let childElement
      if (typeof child === 'string') {
        childElement = document.createTextNode(child)
      } else {
        childElement = _render(child)
      }
      element.appendChild(childElement)
    }
    return element
  }
}

let ReactDom = {
  render
}

export default ReactDom
