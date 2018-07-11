/* eslint-disable global-require */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const getLocale = (lang?: string, defaultLocale?: string): string => {
  if(typeof lang === 'string' && lang.length > 0){
    return lang
  }
  if(defaultLocale){
    return defaultLocale
  }
  throw Error('[project vue-i18n] there\' no defaultLocale')
}

const getDefaultMessage = (): {[name: string]: any} => {
  let message
  try{
    message = JSON.parse('<%= options.defaultMessage%>')
  }catch(e){
    return {}
  }
  return message
}

const getDefaultLocale = (): string => {
  const defaultLocale: string = '<%= options.defaultLocale%>'
  if(!defaultLocale || defaultLocale === ''){
    return 'en'
  }
  return defaultLocale
}

const getMessages = (locale: string) => {
  try{
    // refer to
    // https://webpack.js.org/guides/dependency-management/#require-with-expression
    const module = require('@/languages/' + locale + '.js')
    return module.default || module || getDefaultMessage()
  }catch(error){
    return getDefaultMessage()
  }
}

export default ({route, app}: any, inject: any) => {
  const defaultLocale: string = getDefaultLocale()
  const locale: string = getLocale(route.path.split('/')[1], defaultLocale)
  const useDefault = (_locale: string): void => {
    const messages = getMessages(_locale) || getMessages(defaultLocale)
    app.i18n = new VueI18n({
      locale: _locale,
      fallbackLocale: defaultLocale,
      messages: {
        [_locale] : messages,
      },
    })
    inject('i18n', app.i18n)
  }
  useDefault(locale)
}
