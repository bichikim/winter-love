import {forEach, ListIterator, ObjectIterator} from 'lodash'
import polyfify, {polyfifyStatic} from '~/lib/polyfify'

// tslint:disable-next-line:ban-types
polyfify<any[]>(
  Array,
  'forEach',
  function logic<T>(this: T[], iteratee?: ListIterator<T, any>) {
    return forEach(this, iteratee)
  },
  true,
  )

polyfifyStatic(
  Object,
  'forEach',
  function logic<T extends object>(
    object: T,
    iteratee?: ObjectIterator<T, any>,
    ) {
  return forEach<T>(object, iteratee)
})
