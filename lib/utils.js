class Utils {
  static getSymbol(scode) {
    return Number(scode.slice(0, 2)) ? `${scode.slice(0, 2) === '60' ? 'SH' : 'SZ'}${scode}` : scode
  }
}

module.exports = Utils