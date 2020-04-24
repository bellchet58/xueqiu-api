const { last, get, compose, slice } = require('lodash/fp')
const getSymbol = (scode) => Number(scode.slice(0, 2)) ? `${scode.slice(0, 2) === '60' ? 'SH' : 'SZ'}${scode}` : scode
const getLimitRecords =  (async (method, params, length) => {
  let result = [];
  let newTimeStamp;
  const getNewestTimeStamp = compose(x => x + 1, get('reportDate'), last, get('list'));
  while(result.length<length) {
    const lastResult = await method({ ...params, timestamp: newTimeStamp || params.timestamp })
    newTimeStamp = getNewestTimeStamp(lastResult)
    result = [...lastResult]
  }
  return slice(0, length)(result)
})
class Finance {
  constructor({ getRequest }) {
    this.getRequest = getRequest
    this.prefix = 'finance/cn'
  }
  /**
   * scode - 代码
   * type all / Q1 / Q2 / Q3 / Q4
   * @param {*} param0 
   */
  async indicator({ scode, type = 'Q4', timestamp }) {
    const { data } = await this.getRequest(`${this.prefix}/indicator.json`, {
      symbol: getSymbol(scode),
      type,
      isDetail: true,
      count: 5,
      timestamp
    })
    return data
  }
}

module.exports = Finance