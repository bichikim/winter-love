export interface State {
  actives?: Item[]
  [key: string]: any[] | undefined
}

export type ContentKind = 'label' | 'input'

export interface Content {
  kind?: ContentKind
  value: string
}

export interface ItemData {
  id?: string
  content?: Content
  items?: ItemData[]
}

export interface Item extends ItemData{
  items?: Item[]
  parent?: Item
}

export interface StateOptions {
  bubble?: boolean
  multi?: boolean
}

export interface UpdateStateOptions {
  multi?: boolean
}
