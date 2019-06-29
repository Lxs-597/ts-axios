import { TypeCheckInterface } from '../types'

const toString = Object.prototype.toString

export const isObject = (val: any): val is Object =>
  val !== null && toString.call(val) === '[object Object]'

export const isArray = (val: any): val is Array<any> => Array.isArray(val)

export const isDate = (val: any): val is Date => toString.call(val) === '[object Date]'

export const forEach = (obj: any, fn: Function): void => {
  if (obj === null || typeof obj === 'undefined') {
    return
  }

  if (typeof obj !== 'object') {
    obj = [obj]
  }

  if (isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      fn.call(null, obj[i], i, obj)
    }
  } else {
    for (let key of Object.keys(obj)) {
      fn.call(null, obj[key], key, obj)
    }
  }
}
