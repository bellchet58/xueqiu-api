const Axios = require('axios-extra')
const { compose, map, mapValues, mapKeys, camelCase, isPlainObject, snakeCase } = require('lodash/fp')
const qs = require('qs')

const camelCaseDeep = (respData) => {
  return isPlainObject(respData) ? compose(mapValues(value => {
    if (value instanceof Array) {
      return map(camelCaseDeep)(value)
    } else if (isPlainObject(value)) {
      return camelCaseDeep(value)
    } else {
      return value
    }
  }), mapKeys(camelCase))(respData) : respData
}

class Request {
  constructor({ token, retry = 3, retryIsJump = false, maxConcurrent = 1 }) {
    this.host = 'https://stock.xueqiu.com'
    const baseURL = `${this.host}/v5`
    this.client = Axios.create({
      baseURL: process.env.BASEURL || baseURL,
      headers: {
        'Origin': this.host,
        'Cookie': `xq_a_token=${token}`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
      },
      maxConcurrent, //并发为1
      queueOptions: {
        retry, //请求失败时,最多会重试3次
        retryIsJump, //是否立即重试, 否则将在请求队列尾部插入重试请求
      }
    });
    this.client.interceptors.request.use(function (config) {
      config.params = mapKeys(snakeCase)(config.params)
      return config
    }, function (err) {
      return Promise.reject(err)
    });
  }
  static camelCaseDeep(respData) {
    return camelCaseDeep(respData)
  }
  getRequest(path, params, axiosConfig) {
    return new Promise((resolve, reject) => {
      this.client.get(`/stock/${path}`, {
        params
      }, axiosConfig).then((response) => {
        var data = camelCaseDeep(response.data);
        if (data.errorCode && data.errorCode != 0) {
          let returnMessage = data.errorDescription || 'NOTOK';
          if (data.data && typeof data.data === 'string') {
            returnMessage = data.result;
          } else if (data.message && typeof data.message === 'string') {
            returnMessage = data.message;
          }
          return reject(returnMessage);
        }

        if (data.errorDescription) {
          var message = data.errorDescription;
          if (typeof data.error === 'object' && data.error.message) {
            message = data.error.message;
          }
          return reject(new Error(message));
        }

        resolve(data);
      }).catch(err => {
        return reject(err)
      })
    })
  }
}


module.exports = Request
