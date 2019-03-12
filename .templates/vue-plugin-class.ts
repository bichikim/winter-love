import {PluginObject, VueConstructor} from 'vue'

interface InstallOptions {
}

interface Options {

}

export default class Plugin {
  static install(vue: VueConstructor, options: InstallOptions) {
    if(Plugin._vue && Plugin._vue === vue){
      if(process.env.NODE_ENV !== 'production'){
        console.error(
          '[vue-plugin] already installed Vue.use(~) should be called only once',
        )
      }
    }
  }
  private static _vue: VueConstructor

  constructor(options: Options){
    // doing something
  }
}
