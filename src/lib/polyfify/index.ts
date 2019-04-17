const _polyfify = <T>(
  target: any,
  name: string,
  content: any | ((this: T) => any),
  force: boolean = false,
  ) => {
  if(!target.prototype[name] || force){
    target.prototype[name] = content
  }
}

interface Polyfills<T> {
  [key: string]: any | ContentFn<T>
}

type ContentFn<T> = (this: T) => any

function polyfify<T>(
  target: any,
  contents: Polyfills<T>,
  force?: boolean,
)
function polyfify<T>(
  target: any,
  name: string,
  content: any | ContentFn<T>,
  force?: boolean,
)
function polyfify<T>(
  target: any,
  name: string | object,
  content?: any | ContentFn<T>,
  force?: boolean,
  ): void {
  if(typeof name === 'string'){
    _polyfify<T>(target, name, content, force)
    return
  }

  Object.keys(name).forEach((_name) => {
    _polyfify<T>(target, _name, name[_name], content)
  })

}

export default polyfify

export function polyfifyStatic(target: any, name: string, content: any) {
  target[name] = content
}
