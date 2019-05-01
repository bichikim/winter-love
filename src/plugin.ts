import {Context} from '@/types/project'
import Vue from 'vue'

type PluginFactory<A, S, V extends Vue = Vue> =
  (context: Context<A, S, V>, options?: any) => void | Promise<void>

interface PluginModule<A, S, V extends Vue = Vue> {
  name: string
  plugin: (context: Context<A, S, V>) => void
}

interface Plugin {
  path: string,
  options?: any,
}

export default async <A, S, V extends Vue = Vue>(
  context: Context<A, S, V>,
  plugins: Array<Plugin | string>,
): Promise<Context<A, S, V>> => {
  const pluginPromises: Array<Promise<any>> = []
  plugins.forEach((plugin: Plugin | string) => {
    const path = typeof plugin === 'string' ? plugin : plugin.path
    pluginPromises.push(
      import(`${process.env.SRC_ALIAS}/${process.env.PLUGINS_PATH}/${path}`),
    )
  })
  const pluginFactories: Array<PluginFactory<A, S, V>> = (await Promise.all(pluginPromises))
    .map((_module) => {
      return _module.default || _module
    })

  const pluginRunPromises: Array<void | Promise<void>> = []
  pluginFactories.forEach(
    (pluginFactory: PluginFactory<A, S, V>, index: number) => {
      const plugin = plugins[index]
      const options = typeof plugin === 'string' ? {} : plugin.options
      pluginRunPromises.push(pluginFactory(context, options))
    },
  )
  await Promise.all(pluginRunPromises)
  return context
}
