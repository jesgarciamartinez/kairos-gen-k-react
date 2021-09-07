type Url = string
export type User = {
  loggedIn: boolean
  name: string
  surname: string
  birthdate?: Date
  profilePicture?: Url
  friends?: Array<User>
}

const friends = [
  {
    name: 'Marcos',
    surname: 'Pérez',
    birthdate: 'Tue Sep 07 2021',
  },
  {
    loggedIn: false,
    name: 'Natalia',
    surname: 'GK',
    birthdate: 'Tue Sep 07 2021',
  },
]

export const appData = {
  user: {
    loggedIn: false,
    name: 'Jesús',
    surname: 'García',
    birthdate: 'Tue Sep 07 2021',
    friends,
  },
}
