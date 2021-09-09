import React from 'react'

/*
  Modificar el DOM sin React
*/
const myElement = document.createElement('h1')
myElement.classList.add('greeting')
myElement.textContent = '¡Hola Gen K!'

// document.getElementById('root').appendChild(myElement)

// element:: VDOM
const h = React.createElement

const element = h(
  'div',
  { className: 'greeting', style: { display: 'flex' } },
  h('div', null, 'Aquí sí hay contenido'),
)
// console.log({ element })
// ReactDOM.render(element, document.getElementById('root'))

const bool = true
const users = [{ name: 'Jesús' }, { name: 'Iván' }, { name: 'Fátima' }]

const element2 = (
  <h1 className='greeting'>
    <div style={{ backgroundColor: 'red' }}>
      Hola {element}
      {bool ? <div> {'Verdadero'} </div> : null}
      {/* GOTCHA: cuidado con devolver valores serializables
      que aparecen en la interfaz. En este caso, se puede pintar
      '0' si no hay elementos en el array*/}
      {users.length && <div>not empty</div>}
      {users.length === 0 ? (
        <div>Array is empty</div>
      ) : (
        users
          .filter(u => u.name.length > 4)
          .map((u, i) => <div key={i}>{u.name}</div>)
      )}
    </div>
  </h1>
)
// console.log({ element2 })
// ReactDOM.render(element2, document.getElementById('root'))
