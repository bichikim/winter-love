
import Vue, {ComponentOptions} from 'vue'

export interface Context<V extends Vue> {
  app: ComponentOptions<V>
}

interface PluginModule<V extends Vue> {
  name: string
  plugin: (context: Context<V>) => void
}

const getter = <V extends Vue>(
  resources: __WebpackModuleApi.RequireContext,
): Array<PluginModule<V>> => {
  const keys = resources.keys()
  return  keys.map((name: string) => ({
    name,
    plugin: resources(name),
  }))
}

export default <V extends Vue>(app: ComponentOptions<V>): ComponentOptions<V> => {
  const plugins: Array<PluginModule<V>> = getter(require.context(
    `${process.env.SRC_ALIAS}/${process.env.PLUGINS_PATH}`,
    false,
    /\.ts$/,
  ))
  plugins.forEach((plugin: PluginModule<V>) => {
    plugin.plugin({app})
  })
  return app
}
