import React from 'react'

export default function App() {
  return (
    <>
      {/* <CounterWithClass initialValue={3} />
      <CounterWithHook initialValue={3} /> */}
      {/* <ListState /> */}
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}
      <MyComponent />
    </>
  )
}

class CounterWithClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.initialValue ?? 0,
      showDouble: false,
    }
    this.increment = this.increment.bind(this)
  }

  increment() {
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
  reset = () => {
    this.setState({ count: 0 })
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
    setCount(oldCount => oldCount + 1)
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

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}
function CloseButton(props) {
  return <Button {...props} text={'×'} />
}
function AddButton(props) {
  return <Button {...props} text={'+'} />
}
function ChangeButton(props) {
  return <Button {...props} text={'change'} />
}

const removeAtIndex = (array, index) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, ...laterElements]
}
const insertAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index)

  return [...previousElements, element, ...laterElements]
}
const updateAtIndex = (array, index, element) => {
  const previousElements = array.slice(0, index)
  const laterElements = array.slice(index + 1)

  return [...previousElements, element, ...laterElements]
}

function ListState() {
  const [list, setList] = React.useState(['a', 'b', 'c', 'd', 'e'])
  function addElement(i) {
    setList(oldList => {
      const newList = [...oldList]

      return newList
    })
  }
  function deleteElement(i) {
    setList(oldList => removeAtIndex(oldList, i))
  }
  function changeElement(i) {
    setList(oldList => updateAtIndex(oldList, i, 'z'))
  }

  return (
    <>
      {list.map((el, i) => (
        <div key={el}>
          {el}{' '}
          <CloseButton
            onClick={() => {
              deleteElement(i)
            }}
          />
          <AddButton
            onClick={() => {
              addElement(i)
            }}
          />
          <ChangeButton
            onClick={() => {
              changeElement(i)
            }}
          />
        </div>
      ))}
      <button onClick={addElement}>add element</button>
    </>
  )
}

function Form() {}

const UncontrolledForm = () => (
  <form>
    <label>
      Email
      <input type='text' name='email' />
    </label>
    <label>
      Password
      <input type='text' name='password' />
    </label>
    <input type='submit' value='Submit' />
  </form>
)
class ControlledForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '' }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState(oldState => {
      return { [name]: value }
    })
  }

  handleSubmit(e) {
    e.preventDefault() //evitar el refresco de la página
    // Hacer algo con this.state
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
          <input
            type='text'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Password
          <input
            type='text'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </label>
        <input type='submit' value='Submit' />
      </form>
    )
  }
}

//1. Forma - React.createRef()

class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    this.inputRef = React.createRef()
  }

  render() {
    return <input type='text' ref={this.inputRef} />
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }
}

//#region immutability
/* Técnicas para inmutabilidad JS */

/*
  Modificar un objeto  
*/

// const o = { a: 1, b: 2, nested: { prop1: 4, prop2: 5 } }
// const newO = { ...o, b: 3 } //equivalente a Object.assign({}, o, {b: 3})
// const newNested = { ...o, nested: { ...o.nested, prop2: 6 } }

// /* Modificar un array */

// /**
//  * Métodos de Array que mutan el array sobre el que operan
//  */

// // const array: number[] = [1, 2, 3]

// array.push(4) //-> array: [1,2,3,4]
// array.pop() //-> array: [1,2,3]
// array.shift() //-> array: [2,3]
// array.unshift(1) //-> array: [1,2,3]
// array.reverse() //-> array: [3,2,1]
// array.sort() //-> array: [1,2,3]
// array.splice(0, 1) //-> array: [2,3]

// const newArray = [...array] // equivalente a array.slice()
// const arrayWithNewItem = [...array.slice(0, 1), item, ...array.slice(1)]

// /* Immutable.js */

// // const { Map, List } = require('immutable')
// const immutableObj = Map({ list: List([1, 2, 3]), prop: 'a' })
// const newObj = immutableObj.set('prop', 'b')

// /* Immer.js */

// // import produce from 'immer'

// const obj = {
//   array: [1, 2, 3],
//   prop: 'a',
// }

// const newObject = produce(obj, draft => {
//   draft.array.push(4)
//   draft.prop = 'b'
// })
//#endregion
