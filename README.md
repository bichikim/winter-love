# Web

> web front-end

## Known problems
 - cannot check *.vue coverage

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run nps

# build for production and launch server
$ npm run nps.build
$ npm run nps.start

# generate static project
$ npm run nps.generate
```

## Import as Middleware
```javascript
import winterLove from './bin'
import express from 'express'
const app = express()
app.use(winterLove({config: your.config}))
// or
async function run() {
  const middleware = await winterLove({build: true, config: your.config})
  app.use(middleware)
  // ... do something
}

run().then(() => (console.log('server is running now'))).catch((error) => (console.error(error)))

```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
