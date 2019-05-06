export interface NavAct {
  name: string
  payload?: string[]
  refresh?: boolean
}
export interface NavTo {
  action?: NavAct
  path?: string
  name?: string
}

export interface NavItem {
  title: string
  icon: string
  to?: string | NavTo
  items?: NavItem[]
}
