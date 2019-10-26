function setAttr(element, key, value) {
  console.log(element, key, value)
  if (key === 'className') {
    element.setAttribute('class', value)
  } else if (key === 'style') {
    if (typeof value === 'string') {
      element.style.cssText = value
    } else {
      // style对象
      for (let key in value) {
        element.style[key] = value[key]
      }
    }
    // 事件处理
  } else if (/on\w+/.test(key)) {
    var eventName = key.slice(2).toLowerCase()
    // let { eventHandler } = value
    element.addEventListener(eventName, value, false)
  } else {
    // 普通属性处理
    element.setAttribute(key, value)
  }
}

export { setAttr }
