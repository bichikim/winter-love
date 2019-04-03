export interface State {
  active?: boolean
}

export interface Item {
  id?: string
  content?: string
  items?: Item[]
}

export interface StateInfo extends State{
  id: string
}

export interface StateOptions {
  bubble?: boolean
  multi?: boolean
}
