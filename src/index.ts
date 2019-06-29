import { AxiosRequestConfig } from './types'
import buildURL from './helpers/buildURL'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  const { url, params } = config
  config.url = buildURL(url, params)
}

export default axios
