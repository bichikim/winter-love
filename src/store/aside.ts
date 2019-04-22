import {Module, MutationTree} from 'vuex'
import {NavItem} from '~/types/navigation'
import {State} from './'

export interface AsideState {
  items: NavItem[]
}

const state: AsideState = {
  items: [
    {
      title: 'Reservations',
      icon: 'ion-bookmarks',
      to: '/main',
      items: [
        {
          title: 'All',
          icon: 'ion-infinite',
          to: '/main/all',
        },
      ],
    },
  ],
}
const mutations: MutationTree<AsideState> = {
}

const storeModule: Module<AsideState, State> = {
  namespaced: true,
  state,
  mutations,
}

export default storeModule
