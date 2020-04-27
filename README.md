# xueqiu-api
A node.js wrapper for the [xueqiu](https://xueqiu.com/)  api to fetch data.

> 雪球APP Node.js API

## 快速指引

安装

```bash
npm install xueqiu-api
```

示例

```javascript
const XueqiuInit = require('xueqiu-api')
const { finance, f10 } = init({ token: '这是token(可选)' })
const indicator = await finance.indicator({ scode: '603585', type: 'Q4'})  //获取主要指标
```

构造参数：
* token -> 可选，若不提供可自动通过`puppeteer`获取`httpOnly`的`cookie`的功能。
* maxConcurrent -> 并发数。默认1
* retry -> 请求失败后的重试次数。默认3
* retryIsJump -> 是否立即重试, 否则将在请求队列尾部插入重试请求。默认false

## APIs
1. 请求参数、响应格式中的`key`都是自动转成用`camelCase`表示的。
2. 因为请求自带分页，若想获取到多页数据，用`finance.getLimitRecords(method, params, length)`指定返回的条数。例：
```javascript
const result = await finance.getLimitRecords(finance.indicator.bind(finance), { scode: '603585' }, 20)
// 返回近20年的业绩指标数据
```

### 业绩指标

按年度、季度获取业绩报表数据。

```javascript
const indicator = await finance.indicator({ scode: '603585', type: 'Q4'})  //获取主要指标
```

输入参数对象：

* scode -> 股票代码
* type -> 只获取年报,默认为Q4。可取all / Q1 / Q2 / Q3 / Q4
* timestamp -> 返回时间戳以前的数据

结果显示：

```json
[{
	"accountReceivableTurnover": [6.5902, 0.008601163146617765],
	"accountsPayableTurnover": [7.9542, -0.14337407786333536],
	"accountsPayableTurnoverDays": [45.2591, 0.16737124743036508],
	"assetLiabRatio": [11.1068, 0.22150736304947913],
	"avgRoe": [16.28, -0.14360862703840085],
	"basicEps": [1.68, -0.02890173410404627],
	"capitalReserve": [3.8349, 0],
	"cashCycle": [62.0846, -0.2881757415242091],
	"ctime": 1587466871000,
	"currentAssetTurnoverRate": [0.988, -0.005135434498036445],
	"currentRatio": [5.9881, -0.301459351632584],
	"equityMultiplier": [1.1249, 0.022636363636363562],
	"equityRatio": [0.1617, 0.27222659323367443],
	"fixedAssetTurnoverRatio": [4.7393, 0.015687619210904166],
	"grossSellingRate": [36.6012, -0.09783487468696392],
	"holderEquity": [88.8932, -0.02215553646406849],
	"inventoryTurnover": [5.5231, 0.13751699139102852],
	"inventoryTurnoverDays": [65.1808, -0.12089263773479547],
	"ncfFromOaToTotalLiab": [1.5341, -0.1837722798616653],
	"netInterestOfTotalAssets": [15.3517, -0.1894690158022841],
	"netProfitAfterNrgalAtsolc": [295707200.35, -0.01780769881188457],
	"netProfitAtsopc": [303187370.14, -0.02857022013091711],
	"netProfitAtsopcYoy": [-2.857, -1.073308666177429],
	"netSellingRate": [22.5063, -0.13080268178517915],
	"npAtsopcNrgalYoy": [-1.7808, -1.044556090433251],
	"npPerShare": [10.8897, 0.11351180007362256],
	"operateCashFlowPs": [2.7018, 0.15659246575342473],
	"operatingCycle": [119.8074, -0.07299016486292632],
	"operatingIncomeYoy": [10.1286, -0.22056514913657765],
	"oreDlt": [15.4676, -0.12760293288212077],
	"quickRatio": [5.1531, -0.3146835476706608],
	"receivableTurnoverDays": [54.6266, -0.008526872899136773],
	"reportDate": 1577721600000,
	"reportName": "2019年报",
	"rop": [323.052, -0.1845111337963958],
	"totalCapitalTurnover": [0.6821, -0.06753246753246753],
	"totalRevenue": [1812605555.46, 0.10128598600025017],
	"undistriProfitPs": [5.3725, 0.23047501259676595]
}, ...]
```

### 利润表

```javascript
const income = await finance.income({ scode: '603585', type: 'Q4'})  
```

输入参数对象：

* scode -> 股票代码
* type -> 只获取年报,默认为Q4。可取all / Q1 / Q2 / Q3 / Q4
* timestamp -> 返回时间戳以前的数据

结果显示：

```json
[{
	"reportDate": 1577721600000,
	"reportName": "2019年报",
	"ctime": 1587466871000,
	"netProfit": [407949553.71, -0.0427677795063313],
	"netProfitAtsopc": [303187370.14, -0.02857022013091711],
	"totalRevenue": [1812605555.46, 0.10128598600025017],
	"op": [485925996.59, -0.043927976279008324],
	"incomeFromChgInFv": [118422, null],
	"investIncomesFromRr": [6687076.82, 0.08559716826652262],
	"investIncome": [8619306.35, -0.261271108568148],
	"exchgGain": [null, null],
	"operatingTaxesAndSurcharge": [12543761.44, -0.017261266089335005],
	"assetImpairmentLoss": [2369568.37, 1.3036178051207155],
	"nonOperatingIncome": [394846.6, 0.2722748699334644],
	"nonOperatingPayout": [1392676.18, 0.2754422710869371],
	"profitTotalAmt": [484928167.01, -0.044421783854081597],
	"minorityGal": [104762183.57, -0.0816127409553499],
	"basicEps": [1.68, -0.02890173410404627],
	"dltEarningsPerShare": [1.68, -0.02890173410404627],
	"othrCompreIncomeAtoopc": [null, null],
	"othrCompreIncomeAtms": [null, null],
	"totalCompreIncome": [407949553.71, -0.0427677795063313],
	"totalCompreIncomeAtsopc": [303187370.14, -0.02857022013091711],
	"totalCompreIncomeAtms": [104762183.57, -0.0816127409553499],
	"othrCompreIncome": [null, null],
	"netProfitAfterNrgalAtsolc": [295707200.35, -0.01780769881188457],
	"incomeTaxExpenses": [76978613.3, -0.05309266430060702],
	"creditImpairmentLoss": [437019.66, null],
	"revenue": [1812605555.46, 0.10128598600025017],
	"operatingCosts": [1343911588.97, 0.16627615935595097],
	"operatingCost": [1149169992.58, 0.17483951095975028],
	"salesFee": [37396198.47, 0.1133934348927091],
	"manageFee": [73078972.21, 0.14289658963114021],
	"financingExpenses": [-23141143.55, -1.0232089531444388],
	"radCost": [92057219.79, 0.10768148721533527],
	"financeCostInterestFee": [null, null],
	"financeCostInterestIncome": [15504332.57, 1.650309119004214],
	"assetDisposalIncome": [74767.83, -0.7861264554807451],
	"otherIncome": [8419533.92, 2.1819475838312163],
	"noncurrentAssetsDisposeGain": [null, null],
	"noncurrentAssetDisposalLoss": [null, null],
	"netProfitBi": [null, null],
	"continousOperatingNp": [407949553.71, -0.0427677795063313]
}, ...]
```

### 资产负债表

```javascript
const balance = await finance.balance({ scode: '603585', type: 'Q4'})  
```

输入参数对象：

* scode -> 股票代码
* type -> 只获取年报,默认为Q4。可取all / Q1 / Q2 / Q3 / Q4
* timestamp -> 返回时间戳以前的数据

结果显示：

```json
[{
	"reportDate": 1577721600000,
	"reportName": "2019年报",
	"ctime": null,
	"totalAssets": [2854246347.4, 0.16004188746441303],
	"totalLiab": [317014976.67, 0.4169921218201962],
	"assetLiabRatio": [0.11106784001275026, 0.2215008243516256],
	"totalQuityAtsopc": [1960142189.23, 0.11351489806709564],
	"tradableFnnclAssets": [118422, null],
	"interestReceivable": [null, null],
	"saleableFinacialAssets": [null, null],
	"heldToMaturityInvest": [null, null],
	"fixedAsset": [null, null],
	"intangibleAssets": [71610908.33, -0.00028373279785943295],
	"constructionInProcess": [null, null],
	"dtAssets": [5434119.19, 0.13525047878097013],
	"tradableFnnclLiab": [null, null],
	"payrollPayable": [30658546.15, 0.18807071555676913],
	"taxPayable": [13189396.98, -0.442731459100817],
	"estimatedLiab": [null, null],
	"dtLiab": [17763.3, null],
	"bondPayable": [null, null],
	"shares": [180000000, 0],
	"capitalReserve": [690290641.85, 0],
	"earnedSurplus": [61759031.2, 0.29451706021894514],
	"undstrbtdProfit": [967053831.29, 0.23047780656588354],
	"minorityEquity": [577089181.5, 0.21129126008176954],
	"totalHoldersEquity": [2537231370.73, 0.13434118519496618],
	"totalLiabAndHoldersEquity": [2854246347.4, 0.16004188746441303],
	"ltEquityInvest": [49750012.66, 0.16973005095254853],
	"derivativeFnnclLiab": [null, null],
	"generalRiskProvision": [null, null],
	"frgnCurrencyConvertDiff": [null, null],
	"goodwill": [null, null],
	"investProperty": [null, null],
	"interestPayable": [null, null],
	"treasuryStock": [null, null],
	"othrCompreIncome": [null, null],
	"othrEquityInstruments": [null, null],
	"currencyFunds": [1258558437.69, 0.013303651639138641],
	"billsReceivable": [null, null],
	"accountReceivable": [273972696.07, -0.007776558338866645],
	"prePayment": [19176150.44, 0.10393550131734856],
	"dividendReceivable": [null, null],
	"othrReceivables": [null, null],
	"inventory": [212328371.63, 0.04182698897641822],
	"ncaDueWithinOneYear": [null, null],
	"othrCurrentAssets": [25508513.25, 7.139619883379157],
	"currentAssetsSi": [null, null],
	"totalCurrentAssets": [1843121421.66, 0.00932915473094889],
	"ltReceivable": [null, null],
	"devExpenditure": [null, null],
	"ltDeferredExpense": [25014822.24, 0.34811376208370126],
	"othrNoncurrentAssets": [173515532.62, 1.617605779166318],
	"noncurrentAssetsSi": [null, null],
	"totalNoncurrentAssets": [1011124925.74, 0.5938720061199549],
	"stLoan": [null, null],
	"billPayable": [61903854.18, 2.5034891387910636],
	"accountsPayable": [168560669.27, 0.4001591860707612],
	"preReceivable": [20680334.19, 1.0326998991714578],
	"dividendPayable": [null, null],
	"othrPayables": [null, null],
	"noncurrentLiabDueIn1Y": [null, null],
	"currentLiabSi": [null, null],
	"totalCurrentLiab": [307794801.24, 0.44490400197348523],
	"ltLoan": [null, null],
	"ltPayable": [null, null],
	"specialPayable": [null, null],
	"othrNonCurrentLiab": [null, null],
	"noncurrentLiabSi": [null, null],
	"totalNoncurrentLiab": [9220175.43, -0.13853854939313656],
	"salableFinancialAssets": [null, null],
	"othrCurrentLiab": [null, null],
	"arAndBr": [273972696.07, -0.19974778434743343],
	"contractualAssets": [null, null],
	"bpAndAp": [230464523.45, 0.669355471995278],
	"contractLiabilities": [null, null],
	"toSaleAsset": [null, null],
	"otherEqInsInvest": [null, null],
	"otherIlliquidFnnclAssets": [null, null],
	"fixedAssetSum": [379048743.98, -0.017677670382265476],
	"fixedAssetsDisposal": [null, null],
	"constructionInProcessSum": [306750786.72, 5.8593193232134615],
	"projectGoodsAndMaterial": [null, null],
	"productiveBiologicalAssets": [null, null],
	"oilAndGasAsset": [null, null],
	"toSaleDebt": [null, null],
	"ltPayableSum": [0, null],
	"noncurrentLiabDi": [9202412.13, -0.14019821393007953],
	"perpetualBond": [null, null],
	"specialReserve": [61038684.89, 0.08217814749564409]
}, ...]
```

### 现金流量表

```javascript
const cashFlow = await finance.cashFlow({ scode: '603585', type: 'Q4'})  
```

输入参数对象：

* scode -> 股票代码
* type -> 只获取年报,默认为Q4。可取all / Q1 / Q2 / Q3 / Q4
* timestamp -> 返回时间戳以前的数据

结果显示：

```json
[{
	"reportDate": 1577721600000,
	"reportName": "2019年报",
	"ctime": null,
	"ncfFromOa": [486332393.01, 0.15659356101644217],
	"ncfFromIa": [-381026741.25, -2.331213934269859],
	"ncfFromFa": [-113357103.91, -0.4603451778134199],
	"cashReceivedOfOthrOa": [48530853.31, 0.9052586476558873],
	"subTotalOfCiFromOa": [1696124464.6, 0.07578428326974436],
	"cashPaidToEmployeeEtc": [135387133.5, 0.13864114827024554],
	"paymentsOfAllTaxes": [118588150.72, -0.026601753040571184],
	"othrcashPaidRelatingToOa": [86799724.2, 0.07472531933193247],
	"subTotalOfCosFromOa": [1209792071.59, 0.04639436945379551],
	"cashReceivedOfDspslInvest": [630000000, -0.07352941176470588],
	"investIncomeCashReceived": [6986716.7, 0.19668032179896494],
	"netCashOfDisposalAssets": [833613.11, 0.3667362675783563],
	"netCashOfDisposalBranch": [null, null],
	"cashReceivedOfOthrIa": [null, null],
	"subTotalOfCiFromIa": [637820329.81, -0.0957272822872089],
	"investPaidCash": [630000000, -0.07352941176470588],
	"cashPaidForAssets": [383812589.06, 1.7469845274701423],
	"othrcashPaidRelatingToIa": [5034482, null],
	"subTotalOfCosFromIa": [1018847071.06, 0.24291868139934755],
	"cashReceivedOfAbsorbInvest": [32361150, 0.5228525647812859],
	"cashReceivedFromInvestor": [32361150, 0.5228525647812859],
	"cashReceivedFromBondIssue": [null, null],
	"cashReceivedOfBorrowing": [null, null],
	"cashReceivedOfOthrFa": [null, null],
	"subTotalOfCiFromFa": [32361150, 0.5228525647812859],
	"cashPayForDebt": [null, null],
	"cashPaidOfDistribution": [145718253.91, 0.4737795070182864],
	"branchPaidToMinorityHolder": [37500000, 0.5707562877374198],
	"othrcashPaidRelatingToFa": [null, null],
	"subTotalOfCosFromFa": [145718253.91, 0.4737795070182864],
	"effectOfExchangeChgOnCce": [-2136546, -1.6396489670072723],
	"netIncreaseInCce": [-10187998.15, -1.0439473526192258],
	"initialBalanceOfCce": [1242034838.87, 0.22947934280611457],
	"finalBalanceOfCce": [1231846840.72, -0.008202666971297578],
	"cashReceivedOfSalesService": [1613618910.01, 0.04931065539903073],
	"refundOfTaxAndLevies": [33974701.28, 1.5395228067694766],
	"goodsBuyAndServiceCashPay": [869017063.17, 0.041166531834314374],
	"netCashAmtFromBranch": [null, null]
}, ...] 
```

### 主营业务构成

```javascript
const business = await finance.business({ scode: '603585', type: 'Q4'})  
```

输入参数对象：

* scode -> 股票代码
* type -> 只获取年报,默认为Q4。可取all / Q1 / Q2 / Q3 / Q4
* timestamp -> 返回时间戳以前的数据

结果显示：

```json
[{
	"reportDate": 1577721600000,
	"reportName": "2019年报",
	"ctime": null,
	"classList": [{
		"classStandard": 1,
		"businessList": [{
			"projectAnnouncedName": "化学原料和化学制品制造业",
			"primeOperatingIncome": 1771428495.11,
			"incomeRatio": 1,
			"grossProfitRate": 0.37184359094274194
		}]
	}, {
		"classStandard": 2,
		"businessList": [{
			"projectAnnouncedName": "农药及农药中间体",
			"primeOperatingIncome": 1143448256.65,
			"incomeRatio": 0.6455,
			"grossProfitRate": 0.45041684518274266
		}, {
			"projectAnnouncedName": "阻燃剂及中间体",
			"primeOperatingIncome": 419342162.83,
			"incomeRatio": 0.2367,
			"grossProfitRate": 0.2610573734851932
		}, {
			"projectAnnouncedName": "其他精细化工产品",
			"primeOperatingIncome": 208638075.63,
			"incomeRatio": 0.1178,
			"grossProfitRate": 0.16388960934742883
		}]
	}, {
		"classStandard": 3,
		"businessList": [{
			"projectAnnouncedName": "国内",
			"primeOperatingIncome": 999980202.16,
			"incomeRatio": 0.5645,
			"grossProfitRate": 0.32802491986487947
		}, {
			"projectAnnouncedName": "国外",
			"primeOperatingIncome": 771448292.95,
			"incomeRatio": 0.4355,
			"grossProfitRate": 0.4286429953399769
		}]
	}]
}, ...]
```

### F10 行业对比

```javascript
const compare = await f10.industryCompare({ scode: '603585'})  
```

输入参数对象：

* scode -> 股票代码

结果显示：

```json
{
	"indName": "化学制品",
	"quoteTime": 1587711843000,
	"avg": {
		"peTtm": 22.855194444444447,
		"basicEps": 0.09482714285714286,
		"avgRoe": 1.3967722222222223,
		"grossSellingRate": 27.306720833333333,
		"totalRevenue": 537952205.5905555,
		"netProfitAtsopc": 43135688.435277775,
		"npPerShare": 5.87379,
		"operateCashFlowPs": -0.06766571428571427,
		"totalAssets": 4502050630.613472,
		"totalShares": 491827204.4444444
	},
	"min": {
		"peTtm": -623.303,
		"basicEps": -0.68,
		"avgRoe": -7.6204,
		"grossSellingRate": -0.6203,
		"totalRevenue": 20857657.03,
		"netProfitAtsopc": -155481764.86,
		"npPerShare": 0.6735,
		"operateCashFlowPs": -4.4533,
		"totalAssets": 540105424.57,
		"totalShares": 42745652
	},
	"max": {
		"peTtm": 128.818,
		"basicEps": 1.01,
		"avgRoe": 7.3438,
		"grossSellingRate": 61.3269,
		"totalRevenue": 3702860659.67,
		"netProfitAtsopc": 901257471.39,
		"npPerShare": 22.3277,
		"operateCashFlowPs": 0.8671,
		"totalAssets": 30392026827.93,
		"totalShares": 2681901273
	},
	"count": 1,
	"indCode": "BK0009",
	"indClass": "SW2014",
	"reportName": "2020一季报",
	"items": [{
		"symbol": "SH603585",
		"name": "苏利股份",
		"basicEps": 0.22,
		"totalRevenue": 323243357.61,
		"grossSellingRate": 31.0255,
		"netProfitAtsopc": 39127115.26,
		"npPerShare": 11.1171,
		"avgRoe": 1.9755,
		"peTtm": 12.751,
		"totalAssets": 2906807657.74,
		"operateCashFlowPs": 0.0285,
		"totalShares": 180000000
	}]
}
```
