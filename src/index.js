import React from './react'

import ReactDOM from './react-dom'

let root = document.querySelector('#root')

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }
  componentWillUpdate() {
    console.log('update')
  }
  componentWillMount() {
    console.log('mount')
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    return (
      <div>
        <h1>number: {this.state.num}</h1>
        <button onClick={this.handleClick.bind(this)}>add</button>
      </div>
    )
  }
}

function App() {
  return (
    <div>
      <Counter></Counter>
      <Welcome name="York" />
      <Welcome name="Allen" />
      <Welcome name="Iverson" />
    </div>
  )
}

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

ReactDOM.render(<App />, root)
