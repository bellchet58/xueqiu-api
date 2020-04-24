
/**
 * { token, timeout }
 * @param {*} options 
 */
module.exports = function(options) {
  const token = options && options.token || 'YourXueqiuToken';
  const timeout = options && options.timeout || 10000;
  const req = new Request({ token, timeout });
  const getRequest = req.getRequest.bind(req);
  return {
  }
}