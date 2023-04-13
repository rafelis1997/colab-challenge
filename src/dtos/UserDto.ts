export interface UserDataResponse {
  gender: string
  name: {
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string
  }
  email: string
  dob: {
    date: string
  }
  cell: string
  id: {
    value: string
  }
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
  login: {
    uuid: string
  }
}

