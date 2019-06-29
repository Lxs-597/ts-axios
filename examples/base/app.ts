import axios from '../../src'

axios({
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios({
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()
axios({
  url: '/base/get',
  params: { date }
})

axios({
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})
axios({
  url: '/base/get',
  params: {
    abc: null,
    foo: {
      foo: 'bar',
      baz: null,
      bar: undefined
    }
  }
})
axios({
  url: '/base/get#hash',
  params: {
    foo: ['bar', 'baz']
  }
})
axios({
  url: '/base/get?foo=abc',
  params: {
    foo: ['bar', 'baz']
  }
})