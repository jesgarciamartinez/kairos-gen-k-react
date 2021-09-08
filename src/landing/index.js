function Landing() {
  return (
    <>
      <Navbar>
        <Link>Home</Link>
        <Link>About</Link>
        <Link>Contact</Link>
      </Navbar>
      <BackgroundImage>
        <Text fontsSize='l' tag='h1'></Text>
      </BackgroundImage>
      <HStack>
        <MediaObject direction='vertical' />
        <MediaObject direction='vertical' />
        <MediaObject direction='vertical' />
      </HStack>
    </>
  )
}
