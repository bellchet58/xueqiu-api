const init = require('../lib/init')
const { camelCaseDeep } = require('../lib/request')

const { f10 } = init({ token: '48575b79f8efa6d34166cc7bdc5abb09fd83ce63'})

describe("f10 related api", () => {
  test("industry compare data", async () => {
    const result = await f10.industryCompare({ scode: '603585'})
    console.log(JSON.stringify(result))
    expect(result.length).toBe(5);
  });
});