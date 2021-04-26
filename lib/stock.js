const { map, split, compose, join, snakeCase, get} = require('lodash/fp')
const { getSymbol } = require('./utils')

class Stock {
  constructor({ getRequest }) {
    this.getRequest = getRequest
    this.prefix = ''
  }
  async commonRequest(method, params) {
    const getModelSnakeCase = compose(join('/'), map(snakeCase), split('/'))
    const { data } = await this.getRequest(`${this.prefix}/${getModelSnakeCase(method)}.json`, {
      symbol: getSymbol(params.scode),
      type: params.type,
      extend: params.extend
    })
    return data
  }
  /**
   * 获取价格
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async quote({ scode, type, extend = 'detail'}) {
    return await this.commonRequest('quote', { scode, type, extend })
  }
}

module.exports = Stock