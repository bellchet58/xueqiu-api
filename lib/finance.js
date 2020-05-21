const { last, get, compose, slice, uniqBy, snakeCase, isNaN } = require('lodash/fp')
const { getSymbol } = require('./utils')
const getLimitRecords = (async (method, params, length) => {
  let result = [];
  let newTimeStamp;
  let lastTimeStamp;
  const getNewestTimeStamp = compose(x => x + 1, get('reportDate'), last);
  while (result.length < length && ((lastTimeStamp && newTimeStamp && lastTimeStamp !== newTimeStamp) || !lastTimeStamp || !newTimeStamp) && !isNaN(newTimeStamp)) {
    lastTimeStamp = newTimeStamp
    const lastResult = await method({ ...params, timestamp: newTimeStamp || params.timestamp })
    newTimeStamp = getNewestTimeStamp(lastResult)
    result = uniqBy('reportName')([...result, ...lastResult])
  }
  return slice(0, length)(result)
})
class Finance {
  constructor({ getRequest }) {
    this.getRequest = getRequest
    this.prefix = 'finance/cn'
  }
  async commonRequest(method, params) {
    const { data } = await this.getRequest(`${this.prefix}/${snakeCase(method)}.json`, {
      symbol: getSymbol(params.scode),
      type: params.type,
      isDetail: true,
      count: 5,
      timestamp: params.timestamp
    })
    return get('list')(data)
  }
  /**
   * 获取主要指标
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async indicator({ scode, type = 'Q4', timestamp }) {
    return await this.commonRequest('indicator', { scode, type, timestamp })
  }
  /**
   * 获取利润表
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async income({ scode, type = 'Q4', timestamp }) {
    return await this.commonRequest('income', { scode, type, timestamp })
  }
  /**
   * 获取资产负债表
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async balance({ scode, type = 'Q4', timestamp }) {
    return await this.commonRequest('balance', { scode, type, timestamp })
  }
  /**
   * 获取现金流量表
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async cashFlow({ scode, type = 'Q4', timestamp }) {
    return await this.commonRequest('cashFlow', { scode, type, timestamp })
  }
  async business({ scode, type = 'Q4', timestamp }) {
    return await this.commonRequest('business', { scode, type, timestamp })
  }
  async getLimitRecords(method, params, length) {
    return await getLimitRecords(method, params, length)
  }
}

module.exports = Finance