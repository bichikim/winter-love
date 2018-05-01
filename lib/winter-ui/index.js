import winterWhiteSpace from './white-space'
import winterLazyTrigger from './lazy-trigger'
import winterImgProgress from './img-progress'
import winterAnime from './anime'
import winterBodyMovin from './bodymovin'

export default {
  install(vue) {
    vue.mixin({
      components: {
        winterWhiteSpace,
        winterLazyTrigger,
        winterImgProgress,
        winterAnime,
        winterBodyMovin,
      },
    })
  },
}
