import {
  ArrayIterator,
  camelCase,
  capitalize,
  chunk,
  compact,
  deburr,
  difference,
  differenceBy,
  endsWith,
  escape,
  forEach,
  List,
  ObjectIterator,
  ValueIteratee} from 'lodash'
import polyfify, {polyfifyStatic} from '~/lib/polyfify'

// Array
polyfify<any[]>(
  Array,
  'forEach',
  function logic<T>(this: T[], iteratee?: ArrayIterator<T, any>): T[] {
    return forEach(this, iteratee)
  },
  true,
)
polyfify<any[]>(
  Array,
  'chunk',
  function logic<T>(this: T[], size?: number): T[][] {
    return chunk<T>(this, size)
  },
)
polyfify<any[]>(
  Array,
  'compact',
  function logic<T>(this: T[]): T[] {
    return compact<T>(this)
  },
)

polyfify<any[]>(
  Array,
  'difference',
  function logic<T>(this: T[], ...values: Array<List<T>>): T[] {
    return difference<T>(this, ...values)
  },
)

polyfify<any[]>(
  Array,
  'differenceBy',
  function logic<T1, T2>(
    this: List<T1> | null | undefined,
    ...values: any[]): T1[] {
    return differenceBy<any>(this, values, ...values)
  },
)

// String
polyfify<string>(
  String,
  'camelCase',
  function(this: string) {
    return camelCase(this)
  },
)
polyfify<string>(
  String,
  'capitalize',
  function(this: string) {
    return capitalize(this)
  },
)
polyfify<string>(
  String,
  'deburr',
  function(this: string) {
    return deburr(this)
  },
)

// Object static
polyfifyStatic(
  Object,
  'forEach',
  function logic<T extends object>(
    object: T,
    iteratee?: ObjectIterator<T, any>,
  ) {
    return forEach<T>(object, iteratee)
  },
)
