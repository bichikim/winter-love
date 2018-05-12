interface IOptions {
  name: string
  prototypeName: string
  isRunScriptWithSrc: boolean
}

export default (options: IOptions) => {
  const {name, prototypeName, isRunScriptWithSrc} = options
  const style = ['display:none']
  return {
    name,
    props: ['src', 'type'],
    data() {
      return {loaded: false}
    },
    created() {
      // supporting Nuxt
      if(process.server){return}
      if(!this.src){
        this.loaded = true
        return
      }
      this[`$${prototypeName}`](this.src, this.type).then((src) => {
        this.loaded = true
        this.$emit(`${name}/loaded`, src)
      }).catch((error) => {
        this.$emit(`${name}/error`, error)
      })
    },
    render(h) {
      if((this.src && !isRunScriptWithSrc) || !this.loaded){
        return h('div', {style})
      }
      return h('div', {style}, [h('script', [this.$slots.default])])
    },
  }
}
