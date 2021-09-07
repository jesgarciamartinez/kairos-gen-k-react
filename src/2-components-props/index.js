function Example() {
  return <h1 className='greeting'>¡Hola Gen K desde un componente!</h1>
}

function Greeting({ name, tag, ...rest }) {
  const Tag = tag ?? 'span'
  return <Tag {...rest}>Hola {name}</Tag>
}

function Example1() {
  return (
    <>
      <h1 className='greeting'>¡Hola Gen K desde un componente!</h1>
      {Greeting({ name: 'Jesus', tag: 'span' })}
      <Greeting name={'GenK'} style={{ background: 'red' }} />
      {React.createElement(Greeting, { name: 'GenK' })}
      <Greeting name={'grupo'} tag='aside' />
    </>
  )
}

///

function Example2() {
  return (
    <div>
      <MediaObject>hola</MediaObject>
      <MediaObject children={'hola'} />
    </div>
  )
}

function MediaObject({ direction, left, right, imgSrc, text, children }) {
  const directionClass = `MediaObject ${direction}`
  return (
    <div className={directionClass}>
      <div>{left}</div>
      <img src={imgSrc} alt='' />
      <div>{right}</div>
      <div>{text}</div>
      <div>{children}</div>
    </div>
  )
}

function UserCard({ name, surname }) {
  return (
    <MediaObject textContent={name} left={name} right={surname}>
      <div> child </div>
    </MediaObject>
  )
}

function Landing() {
  return (
    <>
      <Navbar>
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
      </Navbar>
      <BackgroundImage>
        <Text size='xl' tag='h1'></Text>
      </BackgroundImage>
      <HStack>
        {/* {this.map(card => {
          return <MediaObject direction='horizontal' />
        })} */}
        <MediaObject direction='vertical' />
        <MediaObject direction='vertical' />
        <MediaObject direction='vertical' />
      </HStack>
    </>
  )
}
