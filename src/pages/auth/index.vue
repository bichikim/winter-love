<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {Getter as _Getter, Mutation as _Mutation, namespace} from 'vuex-class'
  import AppLogo from '@/components/AppLogo.vue'
  const api = namespace('api')

  @Component
  export default class Auth extends Vue {

    @api.Mutation changeTest: (name: string) => void

    @api.Mutation changeNoNo: (name: string) => void

    @api.Getter getTest: (count: number) => string

    myNumber: number = 0

    mounted(){
      setInterval(() => {
        this.changeTest(`test ~ ${Math.random()}`)
      }, 1000)
      setInterval(() => {
        this.changeNoNo(`test ~ ${Math.random()}`)
      }, 500)
    }

    render(h){
      return h('div', {
        class: ['auth'],
      }, this.getTest(this.myNumber))
    }
  }
</script>
<style scoped lang="stylus">
  .auth
    position absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
</style>
