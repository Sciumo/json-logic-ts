import { search } from "jmespath";


/**
 * Logic works on a predicate expression structured as a 
 * @interface Clause JSON object.
 * Each Clause is a JavaScript Object with each property
 * being an @type Operation and each entry being an array of arguments
 * to that @type Operation.
 * **Note** any value that is an object with a property name that
 * is in the current @interface ILogic operations will be considered
 * to be a @interface Clause.
 */
export interface Clause {
  /**
   * Operation arguments may be other Clauses and so can recurse.
   */
  [operation: string]: (Clause|any)[];
}

/**
 * ILogic.applyPred can operate a single Clause or Clause array.
 */
export type Clauses = Clause | Clause[];

export type Operation = (data: any, ...values: any[]) => any;
export type OperOrLogic = Operation | ILogic | Function;

/**
 * @interface ILogic
 * Clause Command Pattern interface to evaluate.
 */
export interface ILogic {
  excluded: Set<string>;
  oper(...ops: string[]): Function | null;
  applyPred(preds: Clauses, data: {}): any;
}

export class Logic implements ILogic {
  excluded = new Set(["applyPred","excluded","operations"]);
  operations: Map<string, OperOrLogic> = new Map();

  constructor() {
    for (var name in this) {
      if (!this.hasOwnProperty(name) || this.excluded.has(name)) {
        continue;
      }
      let val = (this as any)[name];
      if (typeof val == "function") {
        // presume all local functions except
        let func = val as Function;
        this.operations.set(name, func);
        if( func.name != name ){
          this.operations.set(func.name, func);
        }
      }
    }
  }
  "=="(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    const first = values[0];
    for( let i = 1; i < values.length; i++ ){
      if( !(first == values[i]) ){
        return false;
      }
    }
    return true;
  }
  coercionEqual = this["=="]
  "==="(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    const first = values[0];
    for( let i = 1; i < values.length; i++ ){
      if( !(first === values[i]) ){
        return false;
      }
    }
    return true;
  }
  equal = this["==="]
  "!="(data: any, ...values:any[]) {
    if( values.length < 1 ){
      return false;
    }
    const first = values[0];
    for( let i = 1; i < values.length; i++ ){
      if( first == values[i] ){
        return false;
      }
    }
    return true;
  }
  coercionNotEqual = this["!="];
  "!=="(data: any, ...values:any[]) {
    if( values.length < 1 ){
      return false;
    }
    const first = values[0];
    for( let i = 1; i < values.length; i++ ){
      if( first === values[i] ){
        return false;
      }
    }
    return true;
  }
  notEqual = this["!=="];
  ">"(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    let lhs = values[0];
    for( let i = 1; i < values.length; i++ ){
      let rhs = values[i];
      if( lhs <= rhs ){
        return false;
      }
      lhs = rhs;
    }
    return true;
  }
  greaterThan = this[">"];
  ">="(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    let lhs = values[0];
    for( let i = 1; i < values.length; i++ ){
      let rhs = values[i];
      if( lhs < rhs ){
        return false;
      }
      lhs = rhs;
    }
    return true;
  }
  greaterThanEqual = this[">="];
  "<"(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    let lhs = values[0];
    for( let i = 1; i < values.length; i++ ){
      let rhs = values[i];
      if( lhs >= rhs ){
        return false;
      }
      lhs = rhs;
    }
    return true;
  }
  lessThan = this["<"];
  "<="(data: any, ...values:any[]) {
    if( values.length < 2 ){
      return false;
    }
    let lhs = values[0];
    for( let i = 1; i < values.length; i++ ){
      let rhs = values[i];
      if( lhs > rhs ){
        return false;
      }
      lhs = rhs;
    }
    return true;
  }
  lessThanEqual = this["<="];
  "!!"(data: any, ...values:any[]) {
    for( let v of values ){
      if( !this.truthy(v) ){
        return false;
      }
    }
    return true;
  }
  notNot = this["!!"];
  "!"(data: any, ...values:any[]) {
    for( let v of values ){
      if( !this.truthy(v) ){
        return true;
      }
    }
    return false;
  }
  not = this["!"]
  "%"(data: any, a: number, b: number) {
    return a % b;
  }
  mod = this["%"];
  "in"(data: any, a: any, b: { indexOf: (arg0: any) => number }) {
    if (!b || typeof b.indexOf === "undefined") return false;
    return b.indexOf(a) !== -1;
  }
  inside = this["in"];
  "cat"(data: any, ...values: any[]) {
    return Array.prototype.join.call(values, "");
  }
  concat = this["cat"];
  "substr"(data: any, source: any, start: number, end: number | undefined) {
    if (end && end < 0) {
      // JavaScript doesn't support negative end, this emulates PHP behavior
      var temp = String(source).substr(start);
      return temp.substr(0, temp.length + end);
    }
    return String(source).substr(start, end);
  }
  substring = this["substr"];
  "+"(data: any, ...values: any[]) {
    return Array.prototype.reduce.call(
      values,
      function(a:any, b:any) {
        return parseFloat(a + "") + parseFloat(b + "");
      },
      0
    );
  }
  plus = this["+"];
  "*"(data: any, ...values: any[]) {
    return values.reduce( (a:any, b:any) => {
      if( typeof a == "number" ) {
        if( typeof b == "number" ){
          return a*b;
        }else{
          return a * parseFloat(b + "");
        }
      }else{
        if( typeof b == "number" ){
          return parseFloat(a + "")*b;
        }else{
          return parseFloat(a + "") * parseFloat(b + "");
        }
      }
    }, 1 );
  }
  times = this["*"];
  multiply = this["*"];
  "-"(data: any, a: number, b: number | undefined) {
    if (b === undefined) {
      return -a;
    } else {
      return a - b;
    }
  }
  minus = this["-"];
  "/"(data: any, a: number, b: number) {
    return a / b;
  }
  divide = this["/"];
  "min"(data: any, ...values: number[]) {
    return Math.min(...values);
  }
  minimum = this["min"];
  "max"(data: any, ...values: number[]) {
    return Math.max(...values);
  }
  maximum = this["max"];
  "merge"(data: any, ...values: any[]) {
    return values.reduce(
      function(a: any, b: any) {
        if (Array.isArray(a)) {
          if (Array.isArray(b)) {
            return a.concat(b);
          } else {
            return a.push(b);
          }
        }
      }
    );
  }
  combine = this["merge"];
  "var"(data: any, a: string | null, b: undefined) {
    var not_found = b === undefined ? null : b;
    if (typeof a === "undefined" || a === "" || a === null) {
      return data;
    }
    var sub_props = String(a).split(".");
    for (var i = 0; i < sub_props.length; i++) {
      if (data === null) {
        return not_found;
      }
      // Descending into data
      data = data[sub_props[i]];
      if (data === undefined) {
        return not_found;
      }
    }
    return data;
  }
  val = this["var"];

  missing(data: any, ...values: any[]) {
    /*
      Missing can receive many keys as many arguments, like {"missing:[1,2]}
      Missing can also receive *one* argument that is an array of keys,
      which typically happens if it's actually acting on the output of another command
      (like 'if' or 'merge')
      */

    var missing = [];
    var keys = Array.isArray(values[0]) ? values[0] : values;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = this.applyPred({ var: key }, data);
      if (value === null || value === "") {
        missing.push(key);
      }
    }

    return missing;
  }
  miss = this["missing"];

  "missing_some"(data: any, need_count: number, options: any[]) {
    // missing_some takes two arguments, how many (minimum) items must be present, and an array of keys (just like 'missing') to check for presence.
    var are_missing = this.missing(data,options);

    if (options.length - are_missing.length >= need_count) {
      return [];
    } else {
      return are_missing;
    }
  }
  missSome = this["missing_some"];

  is_logic(logic: Clause | {} | null) {
    return (
      typeof logic === "object" && // An object
      logic !== null && // but not null
      !Array.isArray(logic) && // and not an array
      Object.keys(logic).length === 1 // with exactly one key
    );
  }

  /*
  This helper will defer to the JsonLogic spec as a tie-breaker when different language interpreters define different behavior for the truthiness of primitives.  E.g., PHP considers empty arrays to be falsy, but Javascript considers them to be truthy. JsonLogic, as an ecosystem, needs one consistent answer.

  Spec and rationale here: http://com/truthy
  */
  truthy(value: { length: number }) {
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    return !!value;
  }
  /* 'if' should be called with a odd number of parameters, 3 or greater
        This works on the pattern:
        if( 0 ){ 1 }else{ 2 };
        if( 0 ){ 1 }else if( 2 ){ 3 }else{ 4 };
        if( 0 ){ 1 }else if( 2 ){ 3 }else if( 4 ){ 5 }else{ 6 };
  
        The implementation is:
        For pairs of values (0,1 then 2,3 then 4,5 etc)
        If the first evaluates truthy, evaluate and return the second
        If the first evaluates falsy, jump to the next pair (e.g, 0,1 to 2,3)
        given one parameter, evaluate and return it. (it's an Else and all the If/ElseIf were false)
        given 0 parameters, return NULL (not great practice, but there was no Else)
        */
  "?:"(data: any, ...values: Clause[]): any {
    let i = 0;
    if (values.length < 2) {
      return null;
    }
    let len = values.length - 1;
    let result = this.applyPred(values[i], data);
    let isTrue = this.truthy(result);
    while (i < len) {
      result = this.applyPred(values[i], data);
      isTrue = this.truthy(result);
      if(isTrue)
        break;
      i += 2;
    }
    if (i < len) {
      return this.applyPred(values[i + 1], data);
    }
    else if (i == len) {
      return this.applyPred(values[i], data);
    }
    return null;
  }
  select = this["?:"];

  "and"(data: any, ...values: Clause[]): any {
    var current;
    // Return first falsy, or last
    for (let i = 0; i < values.length; i += 1) {
      current = this.applyPred(values[i], data);
      if (!this.truthy(current)) {
        return current;
      }
    }
    return current; // Last
  }
  also = this["and"];

  "or"(data: any, ...values: Clause[]): any {
    var current;
    // Return first truthy, or last
    for (let i = 0; i < values.length; i += 1) {
      current = this.applyPred(values[i], data);
      if (this.truthy(current)) {
        return current;
      }
    }
    return current; // Last
  }
  either = this["or"];

  "filter"(data: any, ...values: Clause[]): any {
    let _this = this;
    let scopedData = this.applyPred(values[0], data);
    let scopedLogic = values[1];

    if (!Array.isArray(scopedData)) {
      return [];
    }
    // Return only the elements from the array in the first argument,
    // that return truthy when passed to the logic in the second argument.
    // For parity with JavaScript, reindex the returned array
    return scopedData.filter(function(datum) {
      return _this.truthy(_this.applyPred(scopedLogic, datum));
    });
  }
  choose = this["filter"];

  "map"(data: any, ...values: Clause[]): any {
    let _this = this;
    let scopedData = this.applyPred(values[0], data);
    let scopedLogic = values[1];

    if (!Array.isArray(scopedData)) {
      return [];
    }

    return scopedData.map(function(datum) {
      return _this.applyPred(scopedLogic, datum);
    });
  }
  doAll = this["map"]

  "reduce"(data: any, ...values: Clause[]): any {
    let _this = this;
    let scopedData = this.applyPred(values[0], data);
    let scopedLogic = values[1];
    let initial = typeof values[2] !== "undefined" ? values[2] : null;

    if (!Array.isArray(scopedData)) {
      return initial;
    }

    return scopedData.reduce(function(accumulator, current) {
      return _this.applyPred(scopedLogic, {
        current: current,
        accumulator: accumulator
      });
    }, initial);
  }
  remove = this["reduce"];

  //takes two value inputs
  "all"(data: any, ...values: Clause[]): any {
    let scopedData = this.applyPred(values[0], data);
    let scopedLogic = values[1];
    // All of an empty set is false. Note, some and none have correct fallback after the for loop
    if (!scopedData.length) {
      return false;
    }
    for (let i = 0; i < scopedData.length; i += 1) {
      if (!this.truthy(this.applyPred(scopedLogic, scopedData[i]))) {
        return false; // First falsy, short circuit
      }
    }
    return true; // All were truthy
  } 
  total = this["all"];

  "none"(data: any, ...values: Clause[]): any {
    let filtered = this.applyPred({ "filter": values }, data);
    return filtered.length === 0;
  }
  nothing = this["none"];

  "some"(data: any, ...values: Clause[]): any {
    let filtered = this.applyPred({ "filter": values }, data);
    return filtered.length > 0;
  }
  few = this["some"];

  /**
   * Look
   * @param ops
   */
  oper(...ops: string[]): Function | null {
    if (!ops || ops.length < 1) {
      return null;
    }
    let op = ops.shift();
    if (op == undefined) {
      return null;
    }
    if (op.indexOf(".") > 0) {
      ops = ops.concat(op.split("."));
      op = ops.shift();
      if (op == undefined) {
        return null;
      }
    }
    let oplog = this.operations.get(op);
    if (typeof oplog == "function") {
      return oplog as Function;
    }
    return (oplog as ILogic).oper(...ops);
  }

  /**
   * Interpret and execute Clause[s]
   * @param preds
   * @param data
   * @param operations Uses the default Logic operations, which can be expanded.
   */
  applyPred(preds: Clauses, data: any = {}): any {
    // Does this array contain logic? Only one way to find out.
    var _this = this;

    if (Array.isArray(preds)) {
      return preds.map(function(l) {
        return _this.applyPred(l, data);
      });
    }

    // You've recursed to a primitive, stop!
    if (!this.is_logic(preds)) {
      return preds;
    }

    let pred = preds as Clause;

    data = data || {};

    var op = Object.keys(pred)[0];
    var operation = this.oper(op);
    if (!operation) {
      return null;
    }
    var values = pred[op];
    var current;
    var scopedLogic: any, scopedData, filtered, initial;

    // easy syntax for unary operators, like {"var" : "x"} instead of strict {"var" : ["x"]}
    if (!Array.isArray(values)) {
      values = [values];
    }
    //*
    if (op === "and") {
      // Return first falsy, or last
      for (let i = 0; i < values.length; i += 1) {
        current = this.applyPred(values[i], data);
        if (!this.truthy(current)) {
          return current;
        }
      }
      return current; // Last
    } else if (op === "or") {
      // Return first truthy, or last
      for (let i = 0; i < values.length; i += 1) {
        current = this.applyPred(values[i], data);
        if (this.truthy(current)) {
          return current;
        }
      }
      return current; // Last
    } else if (op === "filter") {
      scopedData = this.applyPred(values[0], data);
      scopedLogic = values[1];

      if (!Array.isArray(scopedData)) {
        return [];
      }
      // Return only the elements from the array in the first argument,
      // that return truthy when passed to the logic in the second argument.
      // For parity with JavaScript, reindex the returned array
      return scopedData.filter(function(datum) {
        return _this.truthy(_this.applyPred(scopedLogic, datum));
      });
    } else if (op === "map") {
      scopedData = this.applyPred(values[0], data);
      scopedLogic = values[1];

      if (!Array.isArray(scopedData)) {
        return [];
      }

      return scopedData.map(function(datum) {
        return _this.applyPred(scopedLogic, datum);
      });
    } else if (op === "reduce") {
      scopedData = this.applyPred(values[0], data);
      scopedLogic = values[1];
      initial = typeof values[2] !== "undefined" ? values[2] : null;

      if (!Array.isArray(scopedData)) {
        return initial;
      }

      return scopedData.reduce(function(accumulator, current) {
        return _this.applyPred(scopedLogic, {
          current: current,
          accumulator: accumulator
        });
      }, initial);
    } else if (op === "all") {
      scopedData = this.applyPred(values[0], data);
      scopedLogic = values[1];
      // All of an empty set is false. Note, some and none have correct fallback after the for loop
      if (!scopedData.length) {
        return false;
      }
      for (let i = 0; i < scopedData.length; i += 1) {
        if (!this.truthy(this.applyPred(scopedLogic, scopedData[i]))) {
          return false; // First falsy, short circuit
        }
      }
      return true; // All were truthy
    } else if (op === "none") {
      filtered = this.applyPred({ filter: values }, data);
      return filtered.length === 0;
    } else if (op === "some") {
      filtered = this.applyPred({ filter: values }, data);
      return filtered.length > 0;
    }
    //*/
    // Everyone else gets immediate depth-first recursion
    values = values.map(function(val: any) {
      switch( typeof val ){
        case "number":
        case "string": return val;
      }
      return _this.applyPred(val, data);
    });

    if (typeof operation === "function") {
      let opFun = operation as Function;
      return opFun.apply(this, [data, ...values]);
    }

    throw new Error("Unrecognized operation " + op);
  }
}

export default Logic;
