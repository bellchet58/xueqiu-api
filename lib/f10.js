const { map, split, compose, join, snakeCase, get} = require('lodash/fp')
const { getSymbol } = require('./utils')

class F10 {
  constructor({ getRequest }) {
    this.getRequest = getRequest
    this.prefix = 'f10/cn'
  }
  async commonRequest(method, params) {
    const getModelSnakeCase = compose(join('/'), map(snakeCase), split('/'))
    const { data } = await this.getRequest(`${this.prefix}/${getModelSnakeCase(method)}.json`, {
      symbol: getSymbol(params.scode),
      type: params.type,
    })
    return data
  }
  /**
   * 获取主要指标
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async industryCompare({ scode, type = 'single'}) {
    return await this.commonRequest('industry/compare', { scode, type })
  }
}

module.exports = F10