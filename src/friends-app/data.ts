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
    loggedIn: true,
    surname: 'Pérez',
    birthdate: 'Tue Sep 07 2021',
    profilePicture:
      'https://images.dog.ceo/breeds/malamute/n02110063_14491.jpg',
  },
  {
    loggedIn: false,
    name: 'Natalia',
    surname: 'GK',
    birthdate: 'Tue Sep 07 2021',
    profilePicture: 'https://images.dog.ceo/breeds/pyrenees/n02111500_287.jpg',
  },
]

export const potentialFriends = []
export const appData = {
  user: {
    loggedIn: false,
    name: 'Jesús',
    surname: 'García',
    birthdate: /*'Tue Sep 07 2021',*/ new Date().toDateString(),
    profilePicture:
      'https://images.dog.ceo/breeds/rottweiler/n02106550_10651.jpg',
    friends,
  },
}
