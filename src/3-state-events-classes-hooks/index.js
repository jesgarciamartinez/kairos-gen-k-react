import React from 'react'
import './App.css'

function App() {
  return <CounterWithHook initialValue={3} />
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.initialValue ?? 0,
      showDouble: false,
    }
  }
  increment = () => {
    this.setState(
      oldState => {
        return { count: oldState.count + 1 }
      },
      () => {
        console.log(this.state)
      },
    )
  }
  toggleDouble = () => {
    this.setState({ showDouble: !this.state.showDouble })
  }
  render() {
    const double = this.state.count * 2
    return (
      <div>
        <div>count: {this.state.count}</div>
        {this.state.showDouble ? <div>double: {double}</div> : null}
        <button onClick={this.increment}>increment</button>
        <button onClick={this.toggleDouble}>show double</button>
      </div>
    )
  }
}

function CounterWithHook({ initialValue }) {
  const [count, setCount] = React.useState(0)
  function increment() {
    setCount(count => count + 1)
  }
  const double = count * 2
  return (
    <div>
      <div>count: {count}</div>
      <div>double: {double}</div>
      <button onClick={increment}>increment</button>
    </div>
  )
}

export default App
