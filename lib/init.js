const Request = require('./request')
const Finance = require('./finance')
const F10 = require('./f10')

/**
 * { token, timeout }
 * @param {*} options 
 */
module.exports = function(options) {
  const token = options && options.token || 'YourXueqiuToken';
  const maxConcurrent = options && options.maxConcurrent;
  const retry = options && options.retry;
  const retryIsJump = options && options.retryIsJump;
  const req = new Request({ token, maxConcurrent, retry, retryIsJump });
  const getRequest = req.getRequest.bind(req);
  const finance = new Finance({ getRequest })
  const f10 = new F10({ getRequest })
  return {
    finance,
    f10
  }
}