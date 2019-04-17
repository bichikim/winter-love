/* tslint:disable:no-namespace */
import {ArrayIterator, List, ObjectIterator, ValueIteratee} from 'lodash'

declare namespace NodeJS {
  declare interface Global {
  }
}

declare global {
  interface ObjectConstructor{
    forEach<T = any>(object: T, iteratee?: ObjectIterator<T, any>): T
  }

  interface Array<T> {
    chunk(size?: number): T[][]
    forEach(iteratee?: ArrayIterator<T, any>): T[]
    compact(): T[]
    difference(...values: Array<List<T>>): T[]
    differenceBy(
      array: List<T> | null | undefined,
      ...values: Array<List<T>>,
    ): T[]
    differenceBy(
      array: List<T> | null | undefined,
      values: List<any>,
      ...args: Array<ValueIteratee | List<any>>,
    ): T[]
  }

  interface String {
    camelCase(): string
    capitalize(): string
    deburr(): string
  }
}
