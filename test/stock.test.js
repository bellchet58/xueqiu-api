const init = require('../lib/init')
const { camelCaseDeep } = require('../lib/request')

const { stock } = init({ token: ''})

describe("f10 related api", () => {
  test("industry compare data", async () => {
    const result = await stock.quote({ scode: '603585'})
    expect(result.quote.current).toBe("化学制品");
  });
});