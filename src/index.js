import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const element = React.createElement(
  'h1',
  { className: 'greeting' },
  '¡Hola Gen K con React!',
)
console.log({ element })
ReactDOM.render(element, document.getElementById('root'))

// const element2 = <h1 className='greeting'>¡Hola Gen K con JSX!</h1>
// ReactDOM.render(element2, document.getElementById('root'))

// ReactDOM.render(<App />, document.getElementById('root'))
