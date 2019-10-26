import * as utils from './utils'

function render(vnode, rootElement) {
  // root节点相对特殊, 因此单独处理
  let a = _render(vnode)

  rootElement.appendChild(a)
}
function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = ''
  }
  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }
  if (typeof vnode === 'string') {
    let textNode = document.createTextNode(vnode)
    return textNode
  }
  if (typeof vnode.tagName === 'function') {
    // 创建组件
    const component = createComponent(vnode.tagName, vnode.attrs)
    // 添加生命周期函数
    setComponentProps(component, vnode.attrs)
    return component.base
  }

  let element = document.createElement(vnode.tagName)
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach(key => {
      const value = vnode.attrs[key]
      utils.setAttr(element, key, value)
    })
  }
  vnode.children.forEach(child => render(child, element))
  return element
}

class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }
  setState(newState) {
    this.state = Object.assign(this.state, newState)
    renderComponent(this)
  }
}

function createComponent(component, props) {
  let inst
  // 如果已经是一个类组件则直接返回实例
  if (component.prototype && component.prototype.render) {
    inst = new component(props)
  } else {
    // 函数组件需要扩展为类组件
    inst = new Component(props)
    inst.constructor = component
    inst.render = function() {
      return this.constructor(props)
    }
  }
  return inst
}

function setComponentProps(component, props = {}) {
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount()
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
  component.props = props
  renderComponent(component)
}

function renderComponent(component) {
  let base
  const renderer = component.render()
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }
  base = _render(renderer)
  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate()
  } else if (component.componentDidMount) {
    component.componentDidMount()
  }

  if (component.base && component.base.parentNode) {
    component.base.parentNode.replaceChild(base, component.base)
  }
  component.base = base
  base._component = component
}

let ReactDOM = {
  render,
  Component
}

export default ReactDOM
