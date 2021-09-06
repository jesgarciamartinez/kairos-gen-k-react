type Url = string
export type User = {
  loggedIn: boolean
  name: string
  surname: string
  birthdate: Date
  profilePicture: Url
  friends: Array<User>
}
