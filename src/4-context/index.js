import React, { useState, useContext } from 'react'
// import styled from 'styled-components'

/* 
  const Section = styled.div({border: '2px solid orange'})

  Este componente escrito con styled-components se comporta igual que si escribiéramos 

   const Section = props => <div style={{border: '2px solid orange'}} {...props} />

   No es exactamente lo mismo porque styled-components no usa inline styles, sino que
   inserta un stylesheet con las reglas que le pasemos en el documento, y además está
   preparado para recibir un tema por contexto.
*/

/* 
Duda sobre modales en React: 

Con otros frameworks o vanilla js, para abrir una modal empleamos métodos como
modal.open() y modal.close().
En React, tenemos que pensar primero en qué estado tiene el componente: en este caso,
como la modal puede estar abierta o cerrada, nos basta con un boolean.

function App() {
  const [open, setOpen] = useState(false)
  function openModal() {
    setOpen(true)
  }

  return (
    <div>
      <Modal show={open} message={modalMessage} type='success'></Modal>
    </div>
  )
}
*/

const defaultTheme = {
  primaryColor: 'red',
  backgroundColor: 'blue',
}
const Theme = React.createContext({ theme: defaultTheme, changeTheme() {} })

const Button = ({ primaryColor, backgroundColor }) => (
  <div style={{ color: primaryColor, backgroundColor }}>Hola</div>
)

/* A este patrón de pasar a un componente como props funciones que el componente invocará
y recibirá JSX se le llama "render props".
Era muy común antes de los hooks.
La API de Context emplea el patrón "render props" en el componente Consumer
*/
const ThemedButton = () => (
  <Theme.Consumer>{({ theme }) => <Button {...theme} />}</Theme.Consumer>
)
const ThemeChanger = () => (
  <Theme.Consumer>
    {({ changeTheme }) => <button onClick={changeTheme}>Change theme</button>}
  </Theme.Consumer>
)

export class ContextExample extends React.Component {
  changeTheme = () => {
    this.setState({
      theme: { primaryColor: 'blue', backgroundColor: 'red' },
    })
  }
  state = {
    theme: defaultTheme,
    changeTheme: this.changeTheme,
  }
  render() {
    return (
      <div>
        <Theme.Provider value={this.state}>
          {this.props.children}
        </Theme.Provider>
      </div>
    )
  }
}

/* Theme implementado con context y hooks */

// Crear el contexto es igual que antes
// const Theme = React.createContext()
// const defaultTheme = { backgroundColor: 'red' }

const ChangeTheme = React.createContext()

export const ThemeProvider = ({ theme, children }) => {
  const [themeInState, setTheme] = useState(theme || defaultTheme)
  return (
    <Theme.Provider value={defaultTheme}>
      <ChangeTheme.Provider value={setTheme}>{children}</ChangeTheme.Provider>
    </Theme.Provider>
  )
}
export const useTheme = () => useContext(Theme)
export const useChangeTheme = () => useContext(ChangeTheme)

export const ChangeThemeButton = props => {
  const setTheme = useChangeTheme()
  const theme = useTheme()

  return (
    <Button
      {...theme}
      {...props}
      onClick={() => setTheme({ backgroundColor: 'blue' })}
    >
      Change theme
    </Button>
  )
}

export const ThemeDemostration = () => {
  return (
    <div style={{ padding: 100 }}>
      <ThemeProvider theme={{ backgroundColor: 'red' }}>
        <div>
          <ThemedButton />
        </div>
      </ThemeProvider>
    </div>
  )
}

/* Ejemplo currentUser */

//AdminDashboard.js
// import { useCurrentUser } from 'app.js'
function AdminDashboard() {
  return (
    <div>
      <SomeComponent></SomeComponent>
    </div>
  )
}
function SomeComponent() {
  const { user } = useCurrentUser()
  return 'SomeComponent'
}

//Login.js
function Login({ onLogin }) {
  const { changeUser } = useContext(UserContext)

  return (
    <form action=''>
      <input type='submit' onClick={() => changeUser(/*userFromAPI*/)} />
    </form>
  )
}

//app.js
const UserContext = React.createContext()
export const useCurrentUser = () => {
  return useContext(UserContext)
}
export default class CurrentUserContextExample extends React.Component {
  changeUser = () => {
    this.setState({
      user: {},
    })
  }
  state = {
    user: null,
  }
  render() {
    return (
      <div>
        <UserContext.Provider
          value={{ user: this.state.user, changeUser: this.changeUser }}
        >
          <div>
            <div>
              <Login></Login>
              <AdminDashboard></AdminDashboard>
              {/* <ThemedButton></ThemedButton>
              <ThemeChanger></ThemeChanger> */}
            </div>
          </div>
        </UserContext.Provider>
      </div>
    )
  }
}
