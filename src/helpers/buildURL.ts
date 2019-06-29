import { isDate, isObject, isArray, forEach } from './utils'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/gi, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export default function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const ports: string[] = []

  forEach(params, function serialize(val: any, key: string): void {
    if (val === null || typeof val === 'undefined') {
      return
    }

    if (isArray(val)) {
      key = key + '[]'
    } else {
      val = [val]
    }

    forEach(val, function parseValue(v: any): void {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isObject(v)) {
        v = JSON.stringify(v)
      }

      ports.push(`${encode(key)}=${encode(v)}`)
    })
  })

  const serializedParams = ports.join('&')

  if (serializedParams) {
    const hashMarkIndex = url.indexOf('#')

    if (hashMarkIndex !== -1) {
      url = url.slice(0, hashMarkIndex)
    }

    url += (url.includes('?') ? '&' : '?') + serializedParams
  }

  return url
}
