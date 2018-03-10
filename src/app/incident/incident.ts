export interface Incident {
  id: number,
  createdate: string,
  title: string,
  organization: {
    id: number
  },
  priority: {
    id: number
  },
  user: {
    id: number
  },
  admin: {
    id: number
  }
}
