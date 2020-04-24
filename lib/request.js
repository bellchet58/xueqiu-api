const Axios = require('axios')
const { compose, map, mapValues, mapKeys, camelCase, isPlainObject } = require('lodash/fp')

class Request {
  constructor({ token }) {
    this.host = 'https://stock.xueqiu.com'
    const baseURL = `${this.host}/v5`
    this.client = Axios.create({
      baseURL: process.env.BASEURL || baseURL,
      headers: {
        'Origin': this.host,
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
      }
    });
    const camelCaseDeep = (respData) => {
       return compose(mapValues(value => {
         if(value instanceof Array) {
           return map(camelCaseDeep)
         }else if(isPlainObject(value)){
           return camelCaseDeep(respData)
         }else {
           return value
         }
       }), mapKeys(camelCase))(respData)
    }
    this.client.interceptors.request.use(function (config) {
      config.data = mapKeys(camelCase)(config.data)
      return config
    }, function (err) {
      return Promise.reject(err)
    });
    this.client.interceptors.response.use(function(response) {
      
    })
  }
  static camelCaseDeep(respData) {
    return isPlainObject(respData) ? compose(mapValues(value => {
      if (value instanceof Array) {
        return map(Request.camelCaseDeep)(value)
      } else if (isPlainObject(value)) {
        return Request.camelCaseDeep(value)
      } else {
        return value
      }
    }), mapKeys(camelCase))(respData) : respData
  }
  getRequest(path, params) {
    return new Promise((resolve, reject) => {
      this.client.get(`/stock/${path}`, {
        ...params
      }).then((response) => {
        var data = response.data;
        if (data.code && data.code != 0) {
          let returnMessage = data.message || 'NOTOK';
          if (data.data && typeof data.data === 'string') {
            returnMessage = data.result;
          } else if (data.message && typeof data.message === 'string') {
            returnMessage = data.message;
          }
          return reject(returnMessage);
        }

        if (data.error) {
          var message = data.error;
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
