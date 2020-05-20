const Axios = require('axios-extra')
const { compose, map, mapValues, mapKeys, camelCase, isPlainObject, snakeCase, identity, set, get, find } = require('lodash/fp')
const puppeteer = require('puppeteer')

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
    this.token = token
    this.client = Axios.create({
      baseURL: process.env.BASEURL || this.host,
      headers: {
        'Origin': this.host,
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
  async getToken() {
    const getToken = compose(get('value'), find(['name', 'xq_a_token']))
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.xueqiu.com')
    const cookies = await page.cookies()
    await browser.close()
    this.token = getToken(cookies)
    return this.token
  }
  async getRequest(path, params, axiosConfig) {
    if (!this.token) {
      this.token = await this.getToken()
    }
    return new Promise((resolve, reject) => {
      this.client.get(`/v5/stock/${path}`, {
        ...axiosConfig,
        params,
        headers: { 'Cookie': `xq_a_token=${this.token}` }
      }).then((response) => {
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
        this.getToken().then(token => {
          this.token = token
          return this.getRequest(path, params, axiosConfig).then(data => {
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }).catch(error => {
          reject(error)
        })
      })
    })
  }
}


module.exports = Request
