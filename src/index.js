import React from './react'

import ReactDOM, { Component } from './react-dom'

let root = document.querySelector('#root')

// let element = React.createElement(
//   'ul',
//   { className: 'list' },
//   React.createElement(
//     'li',
//     { className: 'item', style: 'background: red' },
//     'item'
//   ),
//   React.createElement(
//     'li',
//     { className: 'item', style: { color: 'blue' } },
//     'item'
//   ),
//   React.createElement(
//     'li',
//     {
//       className: 'item',
//       onClick: function() {
//         window.alert('触发点击事件')
//       }
//     },
//     'item'
//   )
// )
// let element = (
//   <ul className="item">
//     <li className="item" style="background: red">
//       item1
//     </li>
//     <li className="item" style={{ backGround: 'red' }}>
//       item2
//     </li>
//     <li
//       className="item"
//       onClick={() => {
//         alert('触发点击事件')
//       }}
//     >
//       item3
//     </li>
//   </ul>
// )

// ReactDom.render(element, root)

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>
// }

function App() {
  return (
    // <div>hello world</div>
    <div>
      <Welcome name="York" />
      <Welcome name="Allen" />
      <Welcome name="Iverson" />
    </div>
  )
}

class Welcome extends ReactDOM.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

ReactDOM.render(<App />, root)
