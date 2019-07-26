> # Class: Logic

## Hierarchy

* **Logic**

## Implements

* [ILogic](../interfaces/_logic_.ilogic.md)

### Index

#### Constructors

* [constructor](_logic_.logic.md#constructor)

#### Properties

* [divide](_logic_.logic.md#divide)
* [excluded](_logic_.logic.md#excluded)
* [greaterThan](_logic_.logic.md#greaterthan)
* [greaterThanEqual](_logic_.logic.md#greaterthanequal)
* [lessThan](_logic_.logic.md#lessthan)
* [lessThanEqual](_logic_.logic.md#lessthanequal)
* [minus](_logic_.logic.md#minus)
* [mod](_logic_.logic.md#mod)
* [notEqual](_logic_.logic.md#notequal)
* [operations](_logic_.logic.md#operations)
* [plus](_logic_.logic.md#plus)
* [times](_logic_.logic.md#times)

#### Methods

* [!](_logic_.logic.md#!)
* [!!](_logic_.logic.md#!!)
* [!=](_logic_.logic.md#!&#x3D;)
* [!==](_logic_.logic.md#!&#x3D;&#x3D;)
* [%](_logic_.logic.md#%)
* [*](_logic_.logic.md#*)
* [+](_logic_.logic.md#+)
* [-](_logic_.logic.md#-)
* [/](_logic_.logic.md#)
* [<](_logic_.logic.md#&lt;)
* [<=](_logic_.logic.md#&lt;&#x3D;)
* [==](_logic_.logic.md#&#x3D;&#x3D;)
* [===](_logic_.logic.md#&#x3D;&#x3D;&#x3D;)
* [>](_logic_.logic.md#&gt;)
* [>=](_logic_.logic.md#&gt;&#x3D;)
* [?:](_logic_.logic.md#?:)
* [applyPred](_logic_.logic.md#applypred)
* [cat](_logic_.logic.md#cat)
* [in](_logic_.logic.md#in)
* [is_logic](_logic_.logic.md#is_logic)
* [max](_logic_.logic.md#max)
* [merge](_logic_.logic.md#merge)
* [min](_logic_.logic.md#min)
* [missing](_logic_.logic.md#missing)
* [missing_some](_logic_.logic.md#missing_some)
* [oper](_logic_.logic.md#oper)
* [substr](_logic_.logic.md#substr)
* [truthy](_logic_.logic.md#truthy)
* [var](_logic_.logic.md#var)

## Constructors

###  constructor

\+ **new Logic**(): *[Logic](_logic_.logic.md)*

Defined in logic.ts:41

**Returns:** *[Logic](_logic_.logic.md)*

## Properties

###  divide

• **divide**: *[/](_logic_.logic.md#)* =  this["/"]

Defined in logic.ts:144

___

###  excluded

• **excluded**: *`Set<string>`* =  new Set(["applyPred","excluded","operations"])

*Implementation of [ILogic](../interfaces/_logic_.ilogic.md).[excluded](../interfaces/_logic_.ilogic.md#excluded)*

Defined in logic.ts:40

___

###  greaterThan

• **greaterThan**: *[>](_logic_.logic.md#>)* =  this[">"]

Defined in logic.ts:75

___

###  greaterThanEqual

• **greaterThanEqual**: *[>=](_logic_.logic.md#>=)* =  this[">="]

Defined in logic.ts:79

___

###  lessThan

• **lessThan**: *[<](_logic_.logic.md#<)* =  this["<"]

Defined in logic.ts:83

___

###  lessThanEqual

• **lessThanEqual**: *[<=](_logic_.logic.md#<=)* =  this["<="]

Defined in logic.ts:87

___

###  minus

• **minus**: *[-](_logic_.logic.md#-)* =  this["-"]

Defined in logic.ts:140

___

###  mod

• **mod**: *[%](_logic_.logic.md#%)* =  this["%"]

Defined in logic.ts:97

___

###  notEqual

• **notEqual**: *[!=](_logic_.logic.md#!=)* =  this["!="]

Defined in logic.ts:68

___

###  operations

• **operations**: *`Map<string, OperOrLogic>`* =  new Map()

Defined in logic.ts:41

___

###  plus

• **plus**: *[+](_logic_.logic.md#+)* =  this["+"]

Defined in logic.ts:122

___

###  times

• **times**: *[*](_logic_.logic.md#*)* =  this["*"]

Defined in logic.ts:132

## Methods

###  !

▸ **!**(`data`: any, `a`: any): *boolean*

Defined in logic.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |

**Returns:** *boolean*

___

###  !!

▸ **!!**(`data`: any, `a`: any): *boolean*

Defined in logic.ts:88

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |

**Returns:** *boolean*

___

###  !=

▸ **!=**(`data`: any, `a`: any, `b`: any): *boolean*

Defined in logic.ts:65

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |
`b` | any |

**Returns:** *boolean*

___

###  !==

▸ **!==**(`data`: any, `a`: any, `b`: any): *boolean*

Defined in logic.ts:69

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |
`b` | any |

**Returns:** *boolean*

___

###  %

▸ **%**(`data`: any, `a`: number, `b`: number): *number*

Defined in logic.ts:94

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |

**Returns:** *number*

___

###  *

▸ *****(`data`: any, ...`values`: any[]): *Object*

Defined in logic.ts:123

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | any[] |

**Returns:** *Object*

___

###  +

▸ **+**(`data`: any, ...`values`: any[]): *Object*

Defined in logic.ts:113

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | any[] |

**Returns:** *Object*

___

###  -

▸ **-**(`data`: any, `a`: number, `b`: number | undefined): *number*

Defined in logic.ts:133

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number \| undefined |

**Returns:** *number*

___

###  /

▸ **/**(`data`: any, `a`: number, `b`: number): *number*

Defined in logic.ts:141

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |

**Returns:** *number*

___

###  <

▸ **<**(`data`: any, `a`: number, `b`: number, `c`: number | undefined): *boolean*

Defined in logic.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |
`c` | number \| undefined |

**Returns:** *boolean*

___

###  <=

▸ **<=**(`data`: any, `a`: number, `b`: number, `c`: number | undefined): *boolean*

Defined in logic.ts:84

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |
`c` | number \| undefined |

**Returns:** *boolean*

___

###  ==

▸ **==**(`data`: any, `a`: any, `b`: any): *boolean*

Defined in logic.ts:59

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |
`b` | any |

**Returns:** *boolean*

___

###  ===

▸ **===**(`data`: any, `a`: any, `b`: any): *boolean*

Defined in logic.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | any |
`b` | any |

**Returns:** *boolean*

___

###  >

▸ **>**(`data`: any, `a`: number, `b`: number): *boolean*

Defined in logic.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |

**Returns:** *boolean*

___

###  >=

▸ **>=**(`data`: any, `a`: number, `b`: number): *boolean*

Defined in logic.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | number |
`b` | number |

**Returns:** *boolean*

___

###  ?:

▸ **?:**(`data`: any, ...`values`: [Clause](../interfaces/_logic_.clause.md)[]): *any*

Defined in logic.ts:249

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | [Clause](../interfaces/_logic_.clause.md)[] |

**Returns:** *any*

___

###  applyPred

▸ **applyPred**(`preds`: [Clauses](../modules/_logic_.md#clauses), `data`: `__type`): *any*

*Implementation of [ILogic](../interfaces/_logic_.ilogic.md)*

Defined in logic.ts:300

Interpret and execute Clause[s]

**Parameters:**

Name | Type |
------ | ------ |
`preds` | [Clauses](../modules/_logic_.md#clauses) |
`data` | `__type` |

**Returns:** *any*

___

###  cat

▸ **cat**(`data`: any, ...`values`: any[]): *string*

Defined in logic.ts:102

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | any[] |

**Returns:** *string*

___

###  in

▸ **in**(`data`: any, `a`: any, `b`: object): *boolean*

Defined in logic.ts:98

**Parameters:**

▪ **data**: *any*

▪ **a**: *any*

▪ **b**: *object*

Name | Type |
------ | ------ |
`indexOf` | function |

**Returns:** *boolean*

___

###  is_logic

▸ **is_logic**(`logic`: [Clause](../interfaces/_logic_.clause.md) | `__type` | null): *boolean*

Defined in logic.ts:216

**Parameters:**

Name | Type |
------ | ------ |
`logic` | [Clause](../interfaces/_logic_.clause.md) \| `__type` \| null |

**Returns:** *boolean*

___

###  max

▸ **max**(`data`: any, ...`values`: number[]): *number*

Defined in logic.ts:148

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | number[] |

**Returns:** *number*

___

###  merge

▸ **merge**(`data`: any, ...`values`: any[]): *any*

Defined in logic.ts:151

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | any[] |

**Returns:** *any*

___

###  min

▸ **min**(`data`: any, ...`values`: number[]): *number*

Defined in logic.ts:145

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | number[] |

**Returns:** *number*

___

###  missing

▸ **missing**(`data`: any, ...`values`: any[]): *any[]*

Defined in logic.ts:183

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`...values` | any[] |

**Returns:** *any[]*

___

###  missing_some

▸ **missing_some**(`data`: any, `need_count`: number, `options`: object): *any[]*

Defined in logic.ts:205

**Parameters:**

▪ **data**: *any*

▪ **need_count**: *number*

▪ **options**: *object*

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *any[]*

___

###  oper

▸ **oper**(...`ops`: string[]): *`Function` | null*

*Implementation of [ILogic](../interfaces/_logic_.ilogic.md)*

Defined in logic.ts:272

Look

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...ops` | string[] |   |

**Returns:** *`Function` | null*

___

###  substr

▸ **substr**(`data`: any, `source`: any, `start`: number, `end`: number | undefined): *string*

Defined in logic.ts:105

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`source` | any |
`start` | number |
`end` | number \| undefined |

**Returns:** *string*

___

###  truthy

▸ **truthy**(`value`: object): *boolean*

Defined in logic.ts:230

**Parameters:**

▪ **value**: *object*

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *boolean*

___

###  var

▸ **var**(`data`: any, `a`: string | null, `b`: undefined): *any*

Defined in logic.ts:164

**Parameters:**

Name | Type |
------ | ------ |
`data` | any |
`a` | string \| null |
`b` | undefined |

**Returns:** *any*