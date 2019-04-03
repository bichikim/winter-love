export interface State {
  active?: boolean
}

export type ContentKind = 'label' | 'input'

export interface Content {
  kind?: ContentKind
  value: string
}

export interface Item {
  id?: string
  content?: Content
  items?: Item[]
}

export interface StateInfo extends State{
  id: string
  children?: StateInfo[]
}

export interface StateOptions {
  bubble?: boolean
  multi?: boolean
}
