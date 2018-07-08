import Vue from 'vue'
import VueI18n from 'vue-i18n'
const getLang = (lang?: string, defaultLocale?: string): string => {
  if(typeof lang === 'string' && lang.length > 0){
    return lang
  }
  if(defaultLocale){
    return defaultLocale
  }
  throw Error('[project vue-i18n] there\' no defaultLocale')
}

export default async ({route}: any) => {
  if(process.client){return}
  const defaultLocale = '<%= options.defaultLocale%>'
  const lang: string = getLang(route.path.split('/')[1], defaultLocale)
  try{
    const module = await import('@/languages/en-us.js')
    const message = module.default ? module.default : module
    Vue.use(VueI18n, {
      messages: {
        [lang] : message,
      },
    })
  }catch(e){
    console.error(e)
  }
}
