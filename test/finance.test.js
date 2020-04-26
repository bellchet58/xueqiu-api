const init = require('../lib/init')
const { camelCaseDeep } = require('../lib/request')

const { finance } = init({ token: '48575b79f8efa6d34166cc7bdc5abb09fd83ce63'})

describe("finance related api", () => {
  test("test camelCase repsonse data", async () => {
    const input = { "data": { "quote_name": "苏利股份", "currency_name": "人民币", "org_type": 1, "last_report_name": "2020一季报", "statuses": null, "currency": "CNY", "list": [{ "report_date": 1585584000000, "report_name": "2020一季报", "ctime": 1587466868000, "avg_roe": [1.97, -0.5553047404063206], "np_per_share": [11.1171, 0.08665180927804819], "operate_cash_flow_ps": [0.0285, -0.962286621675268], "basic_eps": [0.22, -0.5], "capital_reserve": [3.8349, 0], "undistri_profit_ps": [5.5899, 0.16214137214137225], "net_interest_of_total_assets": [1.8734, -0.5684603335483276], "net_selling_rate": [16.6942, -0.32529877016218667], "gross_selling_rate": [31.0255, -0.2517142161154403], "total_revenue": [323243357.61, -0.26949004821287076], "operating_income_yoy": [-26.949, -2.6497603320457177], "net_profit_atsopc": [39127115.26, -0.5102249709408025], "net_profit_atsopc_yoy": [-51.0225, -2.4846277846318587], "net_profit_after_nrgal_atsolc": [40162001.52, -0.4746194514710943], "np_atsopc_nrgal_yoy": [-47.4619, -2.5102172640260667], "ore_dlt": [1.9553, -0.5492831128117651], "rop": [146.8809, -0.598796560947149], "asset_liab_ratio": [10.778, 0.18135782712585224], "current_ratio": [5.968, -0.28432665787264666], "quick_ratio": [4.9364, -0.3251582386635497], "equity_multiplier": [1.1208, 0.01853871319520172], "equity_ratio": [0.1566, 0.2234374999999999], "holder_equity": [89.222, -0.018207107220120495], "ncf_from_oa_to_total_liab": [0.0164, -0.971582048171894], "inventory_turnover_days": [96.123, 0.36419953704952096], "receivable_turnover_days": [73.6437, 0.2988283971280473], "accounts_payable_turnover_days": [68.3164, null], "cash_cycle": [75.654, 0.014584297238035731], "operating_cycle": [169.7667, 0.3350511004929176], "total_capital_turnover": [0.1122, -0.3606837606837607], "inventory_turnover": [0.9363, -0.2669693885539811], "account_receivable_turnover": [1.2221, -0.23007623007623007], "accounts_payable_turnover": [1.3174, null], "current_asset_turnover_rate": [0.1766, -0.26046901172529313], "fixed_asset_turnover_ratio": [0.8161, -0.2965867953801068] }, { "report_date": 1577721600000, "report_name": "2019年报", "ctime": 1587466871000, "avg_roe": [16.28, -0.14360862703840085], "np_per_share": [10.8897, 0.11351180007362256], "operate_cash_flow_ps": [2.7018, 0.15659246575342473], "basic_eps": [1.68, -0.02890173410404627], "capital_reserve": [3.8349, 0], "undistri_profit_ps": [5.3725, 0.23047501259676595], "net_interest_of_total_assets": [15.3517, -0.1894690158022841], "net_selling_rate": [22.5063, -0.13080268178517915], "gross_selling_rate": [36.6012, -0.09783487468696392], "total_revenue": [1812605555.46, 0.10128598600025017], "operating_income_yoy": [10.1286, -0.22056514913657765], "net_profit_atsopc": [303187370.14, -0.02857022013091711], "net_profit_atsopc_yoy": [-2.857, -1.073308666177429], "net_profit_after_nrgal_atsolc": [295707200.35, -0.01780769881188457], "np_atsopc_nrgal_yoy": [-1.7808, -1.044556090433251], "ore_dlt": [15.4676, -0.12760293288212077], "rop": [323.052, -0.1845111337963958], "asset_liab_ratio": [11.1068, 0.22150736304947913], "current_ratio": [5.9881, -0.301459351632584], "quick_ratio": [5.1531, -0.3146835476706608], "equity_multiplier": [1.1249, 0.022636363636363562], "equity_ratio": [0.1617, 0.27222659323367443], "holder_equity": [88.8932, -0.02215553646406849], "ncf_from_oa_to_total_liab": [1.5341, -0.1837722798616653], "inventory_turnover_days": [65.1808, -0.12089263773479547], "receivable_turnover_days": [54.6266, -0.008526872899136773], "accounts_payable_turnover_days": [45.2591, 0.16737124743036508], "cash_cycle": [62.0846, -0.2881757415242091], "operating_cycle": [119.8074, -0.07299016486292632], "total_capital_turnover": [0.6821, -0.06753246753246753], "inventory_turnover": [5.5231, 0.13751699139102852], "account_receivable_turnover": [6.5902, 0.008601163146617765], "accounts_payable_turnover": [7.9542, -0.14337407786333536], "current_asset_turnover_rate": [0.988, -0.005135434498036445], "fixed_asset_turnover_ratio": [4.7393, 0.015687619210904166] }, { "report_date": 1569772800000, "report_name": "2019三季报", "ctime": 1576440249000, "avg_roe": [13.15, -0.07524613220815754], "np_per_share": [10.5505, 0.13448676315619693], "operate_cash_flow_ps": [2.5625, 0.35410061297822865], "basic_eps": [1.35, 0.0714285714285715], "capital_reserve": [3.8349, 0], "undistri_profit_ps": [5.1177, 0.29398230088495575], "net_interest_of_total_assets": [12.6932, -0.11683504494726013], "net_selling_rate": [23.8068, -0.08042442900239101], "gross_selling_rate": [39.716, -0.024095378975147692], "total_revenue": [1382821707.22, 0.1494148303477872], "operating_income_yoy": [14.9415, 0.14802151363810978], "net_profit_atsopc": [243261665.44, 0.06835350529566044], "net_profit_atsopc_yoy": [6.8354, -0.8141751463268097], "net_profit_after_nrgal_atsolc": [239998132.17, 0.09779305871378802], "np_atsopc_nrgal_yoy": [9.7793, -0.729979650384213], "ore_dlt": [12.8093, -0.05830588719637704], "rop": [386.385, -0.04499970958361707], "asset_liab_ratio": [9.6972, 0.13437445165818562], "current_ratio": [7.4069, -0.20256448904009294], "quick_ratio": [5.8619, -0.2857786875258912], "equity_multiplier": [1.1074, 0.012711476909007795], "equity_ratio": [0.1392, 0.1877133105802047], "holder_equity": [90.3028, -0.01256075624784712], "ncf_from_oa_to_total_liab": [1.7445, 0.004491276558991207], "inventory_turnover_days": [72.7214, 0.03455565608799816], "receivable_turnover_days": [48.4844, -0.03973983430677612], "accounts_payable_turnover_days": [38.2052, null], "cash_cycle": [73.0423, -0.17972948995245186], "operating_cycle": [121.2058, 0.0034980001374362137], "total_capital_turnover": [0.5332, -0.039625360230547586], "inventory_turnover": [3.7128, -0.03340189008356977], "account_receivable_turnover": [5.5688, 0.04138382421692385], "accounts_payable_turnover": [7.0671, null], "current_asset_turnover_rate": [0.7449, -0.007197121151539332], "fixed_asset_turnover_ratio": [3.6874, 0.03578651685393251] }, { "report_date": 1561824000000, "report_name": "2019中报", "ctime": 1576440258000, "avg_roe": [9.26, -0.03138075313807539], "np_per_share": [10.1427, 0.1431228022721125], "operate_cash_flow_ps": [1.4972, 0.1949876287014129], "basic_eps": [0.95, 0.11764705882352938], "capital_reserve": [3.8349, 0], "undistri_profit_ps": [4.7165, 0.33317315846005996], "net_interest_of_total_assets": [9.1688, -0.07279089052039733], "net_selling_rate": [24.4498, -0.05107545661302964], "gross_selling_rate": [41.2311, -0.01130862030516015], "total_revenue": [953949940.55, 0.17536900680202586], "operating_income_yoy": [17.5369, 0.6370043312672691], "net_profit_atsopc": [171058479.96, 0.12086163851206434], "net_profit_atsopc_yoy": [12.0862, -0.6510781293755251], "net_profit_after_nrgal_atsolc": [168329170.33, 0.14829662082272987], "np_atsopc_nrgal_yoy": [14.8297, -0.5136671159515821], "ore_dlt": [9.3695, -0.019475490811670614], "rop": [422.9476, 0.0016774847817339796], "asset_liab_ratio": [9.991, 0.11570201788964693], "current_ratio": [7.4861, -0.1446509980461832], "quick_ratio": [6.2032, -0.19701755294361314], "equity_multiplier": [1.111, 0.011471230881281814], "equity_ratio": [0.1438, 0.1710097719869707], "holder_equity": [90.009, -0.011380074270883382], "ncf_from_oa_to_total_liab": [1.0267, -0.10729501782453697], "inventory_turnover_days": [68.5767, -0.04396468438024095], "receivable_turnover_days": [54.615, -0.030978868366423506], "accounts_payable_turnover_days": [36.3857, 0.1134821007791318], "cash_cycle": [76.171, -0.2016781621964933], "operating_cycle": [123.1917, -0.03825084139203828], "total_capital_turnover": [0.375, -0.022928608650338654], "inventory_turnover": [2.6248, 0.04598708854706311], "account_receivable_turnover": [3.2958, 0.03196918934151599], "accounts_payable_turnover": [4.947, -0.10191707210805313], "current_asset_turnover_rate": [0.5136, -0.01684532924961721], "fixed_asset_turnover_ratio": [2.5142, 0.06241284597506883] }, { "report_date": 1553961600000, "report_name": "2019一季报", "ctime": 1587466216000, "avg_roe": [4.43, 0.1566579634464751], "np_per_share": [10.2306, -0.027241349801751285], "operate_cash_flow_ps": [0.7557, 0.006124350951937223], "basic_eps": [0.44, 0.09999999999999995], "capital_reserve": [3.8349, -0.2013786209625356], "undistri_profit_ps": [4.81, 0.16623023954999516], "net_interest_of_total_assets": [4.3412, 0.0957092377587076], "net_selling_rate": [24.7431, 0.13657389331140696], "gross_selling_rate": [41.4621, -0.0252399748916792], "total_revenue": [442490012.38, 0.1633508052844794], "operating_income_yoy": [16.3351, 1.121854906800026], "net_profit_atsopc": [79887934.13, 0.3436724937135251], "net_profit_atsopc_yoy": [34.3672, 0.24086784781972895], "net_profit_after_nrgal_atsolc": [76443640.01, 0.31427216877554043], "np_atsopc_nrgal_yoy": [31.4272, 0.19124999526186715], "ore_dlt": [4.3382, 0.15108257270218622], "rop": [366.1008, 0.08335641490003899], "asset_liab_ratio": [9.1234, 0.127278118937887], "current_ratio": [8.339, -0.14321528013233467], "quick_ratio": [7.3149, -0.12553496712492535], "equity_multiplier": [1.1004, 0.011304108078301605], "equity_ratio": [0.128, 0.1657559198542806], "holder_equity": [90.8766, -0.011208105611451661], "ncf_from_oa_to_total_liab": [0.5771, -0.11283627978478097], "inventory_turnover_days": [70.4611, -0.14781223618996006], "receivable_turnover_days": [56.7001, 0.01386144633249229], "accounts_payable_turnover_days": [null, null], "cash_cycle": [74.5665, -0.25084995398594256], "operating_cycle": [127.1612, -0.08258066843424774], "total_capital_turnover": [0.1755, -0.03571428571428575], "inventory_turnover": [1.2773, 0.17344970142397803], "account_receivable_turnover": [1.5873, -0.013670539986329472], "accounts_payable_turnover": [null, null], "current_asset_turnover_rate": [0.2388, -0.036708350141185946], "fixed_asset_turnover_ratio": [1.1602, 0.046262061502389665] }] }, "error_code": 0, "error_description": "" }
    const result = camelCaseDeep(input)
    expect(result.data.list[0].basicEps[0]).toBe(0.22);
  });
  test("mainIndex data", async () => {
    const result = await finance.indicator({ scode: '603585'})
    expect(result.list.length).toBe(5);
  }, 20000);
  test("income data", async () => {
    const result = await finance.income({ scode: '603585'})
    expect(result.list.length).toBe(5);
  }, 20000);
  test("balance data", async () => {
    const result = await finance.balance({ scode: '603585'})
    expect(result.list.length).toBe(5);
  }, 20000);
  test("cashFlow data", async () => {
    const result = await finance.cashFlow({ scode: '603585'})
    expect(result.list.length).toBe(5);
  }, 20000);

  test("get 20 years mainIndex data", async () => {
    const result = await finance.getLimitRecords(finance.indicator.bind(finance), { scode: '603585' }, 20)
    expect(result.length).toBe(9);
  })

});