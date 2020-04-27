const init = require('../lib/init')
const { camelCaseDeep } = require('../lib/request')

const { f10 } = init({ token: ''})

describe("f10 related api", () => {
  test("industry compare data", async () => {
    const result = await f10.industryCompare({ scode: '603585'})
    expect(result.indName).toBe("化学制品");
  });
});