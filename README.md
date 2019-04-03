# Winter Love

> Toy project

## What is it?
it has layout system by vue-router-layout
```typescript
import {Component, Vue} from '~/vue-ts'

@Component({
  layout: 'awesome'
})
export default class MyComponent extends Vue {
  
}
```
it has pages system by vue-auto-routing

```
- pages
  - index.vue
  - foo.vue
    - bar.vue
```

it has middleware system by src/middleware.ts

```
- middleware
  - foo.ts
  - bar.ts
```

 foo.ts
```typescript
import {AfterMiddlewareContext, MiddlewareContext} from '@/middleware'

export function beforeEach(ctx: MiddlewareContext) {
  const {app, next, from, store, to} = ctx
  next()
}

export function beforeResolve(ctx: MiddlewareContext) {
  const {app, next, from, store, to} = ctx
  next()
}

export function afterEach(ctx: AfterMiddlewareContext) {
  const {app, from, store, to} = ctx
}
``` 

```typescript
import {Component, Vue} from '~/vue-ts'

@Component({
  middleware: ['foo', 'bar']
})
export default class MyComponent extends Vue {
  
}
```

## unit test for web scripts

## unit test fir build scripts
warning: to be faster ts-node, transpile only options is on So this test will not check types sometimes

options: 
- typescript: 
`-r test-build/register -r ts-node/register -r tsconfig-paths/register`
- watch: 
`--watch --extension ts`

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
