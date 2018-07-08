import Element from 'element-ui'
import Vue from 'vue'
import VueLottie from '~/vue-lottie'
import VueWhiteSpace from '~/vue-white-space'

// noinspection JSUnusedGlobalSymbols
export default () => {
  // TODO need add local things for Element-ui
  Vue.use(Element)
  // '\n 등 띄워 쓰기 지원하는 컴포컨트'
  Vue.use(VueWhiteSpace)
  // 입력 값 검증 용 플러그인
  Vue.use(VueLottie)
}
