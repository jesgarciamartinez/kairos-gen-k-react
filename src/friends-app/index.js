import React, { useState, useRef, useEffect } from 'react'
import { appData, potentialFriends } from './data'

//#region utils
/** @type {(datestring: string) => boolean}*/
function isBirthDay(dateString) {
  const today = new Date()
  const birthDate = new Date(dateString)
  return (
    today.getMonth() === birthDate.getMonth() &&
    today.getDay() === birthDate.getDay()
  )
}
//#endregion

//#region Components

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>
}

const fontSizes = {
  s: '1em',
  m: '1.5em',
  l: '2em',
}
/** @type {(props: {tag: string, children: string, fontSize: 's' | 'm' | 'l', color: string}) => JSX.Element} */
function Text({ tag = 'span', children, fontSize = 'm', color = 'black' }) {
  const Tag = tag
  const style = {
    fontSize: fontSizes[fontSize],
    color,
  }
  return <Tag style={style}>{children}</Tag>
}

/** @type {(props: {size: 'small' | 'big', src: string, alt: string}) => JSX.Element}*/
function Avatar({ size, src, alt }) {
  const pxSize = `${size === 'small' ? 100 : 200}px`
  return (
    <img
      src={src}
      alt={alt}
      width={pxSize}
      heigth={pxSize}
      style={{ borderRadius: '50%' }}
    />
  )
}

function OnlineIndicator({ isOnline }) {
  return (
    <div
      style={{
        borderRadius: '50%',
        border: '1px solid black',
        backgroundColor: isOnline ? 'green' : 'red',
        width: '16px',
        height: '16px',
      }}
    />
  )
}
function CloseButton(props) {
  return <Button {...props} text={'×'} />
}
function BackButton(props) {
  return <Button {...props} text={'←'} />
}

function UserListCard({
  name,
  surname,
  birthdate,
  profilePicture,
  loggedIn,
  onClose,
  addFriend,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        border: '2px solid black',
      }}
    >
      <Avatar size='big' src={profilePicture} alt='Profile picture' />
      <Text>
        {name} {surname}
      </Text>
      {isBirthDay(birthdate) ? (
        <Text tag={'h2'} fontSize={'m'}>
          Happy birthday! 🎉
        </Text>
      ) : null}
      {addFriend && <Button onClick={addFriend} text={'Add friend'} />}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <OnlineIndicator isOnline={loggedIn} />
        {onClose && <CloseButton onClick={onClose} />}
      </div>
    </div>
  )
}
function Input({ label, autoFocus = true, ...rest }) {
  const inputRef = useRef()
  useEffect(() => {
    autoFocus && inputRef.current.focus()
  }, [])
  return (
    <label>
      {label}
      <input ref={inputRef} {...rest} />
    </label>
  )
}

//#endregion Components

//#region Screens
function LoggedOutScreen({ onLogin }) {
  return (
    <div
      style={{
        heigth: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={onLogin} text={'Log in'} />
    </div>
  )
}
function LoggedInScreen({ onLogout, user, onAddFriend }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={onLogout} text={'Log out'} />
        <Avatar size='small' src={user.profilePicture}></Avatar>
      </div>
      <Text fontSize={'l'} tag={'h1'}>
        Welcome {user.name}
      </Text>
      {isBirthDay(user.birthdate) ? (
        <Text tag={'h2'} fontSize={'m'}>
          Happy birthday! 🎉
        </Text>
      ) : null}
      <Button onClick={onAddFriend} text={'Add friend'} />
      <Text fontSize={'m'} tag={'h2'}>
        Friends
      </Text>
      {/* vertical separation? */}
      {user.friends.map(props => (
        <UserListCard
          {...props}
          onClose={() => {}}
          key={props.name}
        ></UserListCard>
      ))}
    </div>
  )
}
function AddFriendScreen({ onAddFriend, onBack }) {
  const [name, setName] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BackButton onClick={onBack} />
      <Input
        label={'Filter friends'}
        value={name}
        onChange={e => setName(e.target.value)}
      ></Input>
      <div>
        {potentialFriends
          .filter(friend =>
            friend.name.toLowerCase().includes(name.toLowerCase()),
          )
          .map(friend => (
            <UserListCard
              {...friend}
              key={friend.name}
              addFriend={() => onAddFriend(friend)}
            />
          ))}
      </div>
    </div>
  )
}
//#endregion

export default function FriendsApp() {
  const [user, setUser] = useState(appData.user)
  const [currentScreen, setCurrentScreen] = useState(
    user.loggedIn ? 'LoggedInScreen' : 'LoggedOutScreen',
  )
  function goTo(screenName) {
    return () => setCurrentScreen(screenName)
  }
  console.log(user)
  switch (currentScreen) {
    case 'LoggedInScreen':
      return (
        <LoggedInScreen
          onLogout={goTo('LoggedOutScreen')}
          user={user}
          onAddFriend={goTo('AddFriendScreen')}
        ></LoggedInScreen>
      )
    case 'LoggedOutScreen':
      return (
        <LoggedOutScreen onLogin={goTo('LoggedInScreen')}></LoggedOutScreen>
      )
    case 'AddFriendScreen':
      return (
        <AddFriendScreen
          onBack={goTo('LoggedInScreen')}
          onAddFriend={newFriend => {
            console.log({ newFriend })
            setUser(user => ({
              ...user,
              friends: user.friends.concat(newFriend),
            }))
            setCurrentScreen('LoggedInScreen')
          }}
        ></AddFriendScreen>
      )
    default:
  }
}
