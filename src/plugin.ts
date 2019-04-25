import Vue, {ComponentOptions} from 'vue'
import {Context} from '~/lib/type'

type PluginFactory<V extends Vue, S> =
  (context: Context<V, S>, options?: any) => void | Promise<void>

export interface Context<V extends Vue> {
  app: ComponentOptions<V>
}

interface PluginModule<V extends Vue, S> {
  name: string
  plugin: (context: Context<V, S>) => void
}

const getter = <V extends Vue, S>(
  resources: __WebpackModuleApi.RequireContext,
): Array<PluginModule<V, S>> => {
  const keys = resources.keys()
  return  keys.map((name: string) => ({
    name,
    plugin: resources(name),
  }))
}

interface Plugin {
  path: string,
  options?: any,
}

export default async <V extends Vue, S>(
  context: Context<V, S>,
  plugins: Plugin[],
  ): Promise<Context<V, S>> => {
  const pluginPromises: Array<Promise<any>> = []
  plugins.forEach((plugin: Plugin) => {
    pluginPromises.push(
      import(`${process.env.SRC_ALIAS}/${process.env.PLUGINS_PATH}/${plugin.path}`),
    )
  })
  const pluginFactories: Array<PluginFactory<V, S>> = (await Promise.all(pluginPromises))
    .map((_module) => {
    return _module.default || _module
  })

  const pluginRunPromises: Array<void | Promise<void>> = []
  pluginFactories.forEach(
    (pluginFactory: PluginFactory<V, S>, index: number) => {
    pluginRunPromises.push(pluginFactory(context, plugins[index].options))
  })
  await Promise.all(pluginRunPromises)
  return context
}
