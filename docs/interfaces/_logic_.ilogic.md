> # Interface: ILogic

**`interface`** ILogic
Clause Command Pattern interface to evaluate.

## Hierarchy

* **ILogic**

## Implemented by

* [Logic](../classes/_logic_.logic.md)

### Index

#### Properties

* [excluded](_logic_.ilogic.md#excluded)

#### Methods

* [applyPred](_logic_.ilogic.md#applypred)
* [oper](_logic_.ilogic.md#oper)

## Properties

###  excluded

• **excluded**: *`Set<string>`*

Defined in logic.ts:34

## Methods

###  applyPred

▸ **applyPred**(`preds`: [Clauses](../modules/_logic_.md#clauses), `data`: `__type`): *any*

Defined in logic.ts:36

**Parameters:**

Name | Type |
------ | ------ |
`preds` | [Clauses](../modules/_logic_.md#clauses) |
`data` | `__type` |

**Returns:** *any*

___

###  oper

▸ **oper**(...`ops`: string[]): *`Function` | null*

Defined in logic.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`...ops` | string[] |

**Returns:** *`Function` | null*