export interface User {
  id: number,
  surname: string,
  login: string,
  password: string,
  level:  {
  id: number
    },
  organization: {
    id: number
  },
}
