import {MutationTree} from 'vuex'
import {NavItem} from '~/types/navigation'

interface AsideState {
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

export default {
  state,
  mutations,
}
