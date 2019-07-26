> # Interface: Clause

Logic works on a predicate expression structured as a

**`interface`** Clause JSON object.
Each Clause is a JavaScript Object with each property
being an @type Operation and each entry being an array of arguments
to that @type Operation.
**Note** any value that is an object with a property name that
is in the current @interface ILogic operations will be considered
to be a @interface Clause.

## Hierarchy

* **Clause**

## Indexable

● \[▪ **operation**: *string*\]: any[]

Operation arguments may be other Clauses and so can recurse.