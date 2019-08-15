import JL from "../";
import { executionAsyncId } from "async_hooks";

const logic = new JL();

test( "Operator Lookup", (done) => {
  expect(logic).toBeDefined();
  expect(logic.operations).toBeDefined();
  expect(logic.operations.has("<")).toBeTruthy();
  
  let op = logic.oper("<");
  expect(op).toBeDefined();
  expect(typeof op).toBe("function");
  expect(logic.applyPred({"<":[1,2]}, {} )).toBeTruthy();
  done();
})

test( "Relational", (done) => {
  //testing Less than operator
  let lt = logic.oper("<");
  let data = {};
  let args: (string | number | Boolean)[] = [1,2]
  expect(lt).toBeDefined();
  expect(typeof lt).toBe("function");
  expect(logic.applyPred({"<":args})).toBeTruthy();
  args = [1,2,3];
  expect(logic.applyPred({"<":args})).toBeTruthy();
  args = [1,4,3];
  expect(logic.applyPred({"<":args})).toBeFalsy();
  args = [2,3,1];
  expect(logic.applyPred({"<":args})).toBeFalsy();

  //testing less than equal operator
  let lte = logic.oper("<=");
  expect(lte).toBeDefined();
  expect(typeof lte).toBe("function");
  args = [2,2];
  expect(logic.applyPred({"<=":args})).toBeTruthy();
  args = [1,2,2]
  expect(logic.applyPred({"<=":args})).toBeTruthy();
  args = [1,3,2]
  expect(logic.applyPred({"<=":args})).toBeFalsy();
  
  //testing greater than operator
  let gt = logic.oper(">");
  expect(gt).toBeDefined();
  expect(typeof gt).toBe("function");
  args = [2,1,0];
  expect(logic.applyPred({">":args})).toBeTruthy();
  expect(!logic.applyPred({">":args})).toBeFalsy();
  expect(logic.applyPred({">":args})).toEqual(!logic.applyPred({"<=":args}));
  
  //testing greater than equal operator
  let gte = logic.oper(">=");
  expect(gte).toBeDefined();
  expect(typeof gte).toBe("function");
  args = [2,1,1];
  expect(logic.applyPred({">=":args})).toBeTruthy();
  expect(!logic.applyPred({">=":args})).toBeFalsy();
  expect(logic.applyPred({">=":args})).toEqual(!logic.applyPred({"<":args}));

  //testing min operator
  let min = logic.oper("min");
  expect(min).toBeDefined();
  expect(typeof min).toBe("function");
  args = [1,1];
  expect(logic.applyPred({"min":args})).toEqual(1);
  args = [1,2];
  expect(logic.applyPred({"min":args})).toEqual(1);
  args = [2,1];
  expect(logic.applyPred({"min":args})).toEqual(1);
  args = [2,1,3];
  expect(logic.applyPred({"min":args})).toEqual(1);
  args = [2,"1",3];
  expect(logic.applyPred({"min":args})).toEqual(1);
  args = [2,"",3];
  expect(logic.applyPred({"min":args})).toEqual(0);

  //testing max operator
  let max = logic.oper("max");
  expect(max).toBeDefined();
  expect(typeof max).toBe("function");
  args = [1,1];
  expect(logic.applyPred({"max":args})).toEqual(1);
  args = [1,2];
  expect(logic.applyPred({"max":args})).toEqual(2);
  args = [2,1];
  expect(logic.applyPred({"max":args})).toEqual(2);
  args = [1,2,3];
  expect(logic.applyPred({"max":args})).toEqual(3);
  args = [1,3,1];
  expect(logic.applyPred({"max":args})).toEqual(3);
  args = [1,"2"];
  expect(logic.applyPred({"max":args})).toEqual(2);
  done();
})


test( "Arithmetic", (done) => {
  let args: (string | number | Boolean)[] = [1,2,"3",4,5];
  //testing multiplication operator
  let mult = logic.oper("*");
  expect(mult).toBeDefined();
  expect(typeof mult).toBe("function");
  expect(logic.applyPred({"*":args})).toEqual(120);
  
  //testing sum operator
  let sum = logic.oper("+");
  expect(sum).toBeDefined();
  expect(typeof sum).toBe("function");
  args = [2,2];
  expect(logic.applyPred({"+":args})).toEqual(4);
  args = [2,2,2]
  expect(logic.applyPred({"+":args})).toEqual(6);
  args = ["2",2,2];
  expect(logic.applyPred({"+":args})).toEqual(6);
  
  //testing division operator
  let div = logic.oper("/");
  expect(div).toBeDefined();
  expect(typeof div).toBe("function");
  args = [2,2];
  expect(logic.applyPred({"/":args})).toEqual(1);
  args = ["6",2];
  expect(logic.applyPred({"/":args})).toEqual(3);
  
  //testing subtraction operator
  let sub = logic.oper("-");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  args = [2,2]
  expect(logic.applyPred({"-":args})).toEqual(0);
  args = ["6",2];
  expect(logic.applyPred({"-":args})).toEqual(4);

  //testing modulo operator
  let mod = logic.oper("%")
  expect(mod).toBeDefined();
  expect(typeof mod).toBe("function");
  args = [50,2];
  expect(logic.applyPred({"%":args})).toEqual(0)
  args = [77,2];
  expect(logic.applyPred({"%":args})).toEqual(1)
  args = [50,3];
  expect(logic.applyPred({"%":args})).toEqual(2)
  done();
})

test("Logic", (done) =>{
  let args: (string | number | Boolean)[] = [1,1];

  //testing type coercion not equal
  let ne = logic.oper("!=");
  expect(ne).toBeDefined();
  expect(typeof ne).toBe("function");
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [2,2];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [1,"1"];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [1,2];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [1,"2"];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [0,""];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [true, true];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [true,"1"];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [true, 1];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [true,1];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [true,0];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [true,false];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [false,false];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [false,""];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [false,0];
  expect(logic.applyPred({"!=":args})).toBeFalsy();
  args = [false,1];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [false,"1"];
  expect(logic.applyPred({"!=":args})).toBeTruthy();
  args = [false, true]
  expect(logic.applyPred({"!=":args})).toBeTruthy();

  //testing not equal
  let tne = logic.oper("!==");
  expect(tne).toBeDefined();
  expect(typeof tne).toBe("function");
  args = [1,1];
  expect(logic.applyPred({"!==":args})).toBeFalsy();
  args = [2,2];
  expect(logic.applyPred({"!==":args})).toBeFalsy();
  args = [1,"1"];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [1,2];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [1,"2"];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [0,""];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [true, true];
  expect(logic.applyPred({"!==":args})).toBeFalsy();
  args = [true,"1"];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [true, 1];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [true,1];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [true,0];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [true,false];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [false,false];
  expect(logic.applyPred({"!==":args})).toBeFalsy();
  args = [false,""];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [false,0];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [false,1];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [false,"1"];
  expect(logic.applyPred({"!==":args})).toBeTruthy();
  args = [false, true]
  expect(logic.applyPred({"!==":args})).toBeTruthy();


  //testing type coercion equal
  let equal = logic.oper("==");
  expect(equal).toBeDefined();
  expect(typeof equal).toBe("function");
  args = [1,1];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [2,2];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [1,"1"];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [1,2];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [1,"2"];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [0,""];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [true, true];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [true,"1"];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [true, 1];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [true,0];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [true,false];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [false,false];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [false,""];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [false,0];
  expect(logic.applyPred({"==":args})).toBeTruthy();
  args = [false,1];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [false,"1"];
  expect(logic.applyPred({"==":args})).toBeFalsy();
  args = [false, true]
  expect(logic.applyPred({"==":args})).toBeFalsy();

  //testing equal
  let typeEqual = logic.oper("===");
  expect(typeEqual).toBeDefined();
  expect(typeof typeEqual).toBe("function");
  args = [1,1];
  expect(logic.applyPred({"===":args})).toBeTruthy();
  args = [2,2];
  expect(logic.applyPred({"===":args})).toBeTruthy();
  args = [1,"1"];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [1,2];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [1,"2"];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [0,""];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [true, true];
  expect(logic.applyPred({"===":args})).toBeTruthy();
  args = [true,"1"];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [true, 1];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [true,0];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [true,false];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [false,false];
  expect(logic.applyPred({"===":args})).toBeTruthy();
  args = [false,""];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [false,0];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [false,1];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [false,"1"];
  expect(logic.applyPred({"===":args})).toBeFalsy();
  args = [false, true]
  expect(logic.applyPred({"===":args})).toBeFalsy();
  
  //testing notnot/cast to bool operator
  let notNot = logic.oper("!!")
  expect(notNot).toBeDefined();
  expect(typeof notNot).toBe("function");
  args = [true];
  expect(logic.applyPred({"!!":args})).toBeTruthy();
  args = [false]
  expect(logic.applyPred({"!!":args})).toBeFalsy();
  args = [1];
  expect(logic.applyPred({"!!":args})).toBeTruthy();
  args = [2]
  expect(logic.applyPred({"!!":args})).toBeTruthy();
  args = [0]
  expect(logic.applyPred({"!!":args})).toBeFalsy();
  args = ["hello"]
  expect(logic.applyPred({"!!":args})).toBeTruthy();
  args = [""]
  expect(logic.applyPred({"!!":args})).toBeFalsy();

  //testing not operator
  let not = logic.oper("!")
  expect(not).toBeDefined();
  expect(typeof not).toBe("function");
  args = [true];
  expect(logic.applyPred({"!":args})).toBeFalsy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  args = [false];
  expect(logic.applyPred({"!":args})).toBeTruthy();
  expect(not!.apply(logic,[{},false])).toEqual(!logic.applyPred({"!!":args}));
  args = [1];
  expect(logic.applyPred({"!":args})).toBeFalsy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  args = [2];
  expect(logic.applyPred({"!":args})).toBeFalsy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  args = [0];
  expect(logic.applyPred({"!":args})).toBeTruthy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  args = ["hello"];
  expect(logic.applyPred({"!":args})).toBeFalsy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  args = [""];
  expect(logic.applyPred({"!":args})).toBeTruthy();
  expect(logic.applyPred({"!":args})).toEqual(!logic.applyPred({"!!":args}));
  done();
})

test("Array", (done) =>{
  let args: (string | number | Boolean | Array<string | number | Boolean>)[] = ["Hello","Hello World"];
  let inside = logic.oper("in");
  expect(inside).toBeDefined();
  expect(typeof inside).toBe("function");
  expect(logic.applyPred({"in":args})).toBeTruthy();
  args = ["Hllo", "Hello World"];
  expect(logic.applyPred({"in":args})).toBeFalsy();
  args = [1, [1,2,3,4]];
  expect(logic.applyPred({"in":args})).toBeTruthy();
  args = [1, [2,3,4]];
  expect(logic.applyPred({"in":args})).toBeFalsy();

  let merge = logic.oper("merge");
  expect(merge).toBeDefined();
  expect(typeof merge).toBe("function");
  args = [[1,2],[3,4]];
  expect(logic.applyPred({"merge":args})).toEqual([1,2,3,4]);
  done();
})

test("String", (done) =>{
  let args: (string | number | Boolean)[] = ["Hello","World"];
  let concat = logic.oper("cat");
  expect(concat).toBeDefined();
  expect(typeof concat).toBe("function");
  expect(logic.applyPred({"cat":args})).toEqual("HelloWorld");
  args = ["Hello",""];
  expect(logic.applyPred({"cat":args})).toEqual("Hello");

  let sub = logic.oper("substr");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  args = ["jsonlogic", 4];
  expect(logic.applyPred({"substr":args})).toEqual("logic");
  args = ["jsonlogic", -5];
  expect(logic.applyPred({"substr":args})).toEqual("logic");
  args = ["jsonlogic", 1, 3];
  expect(logic.applyPred({"substr":args})).toEqual("son");
  args =["jsonlogic", 4, -2];
  expect(logic.applyPred({"substr":args})).toEqual("log");
  done();
})

test("Logic", (done) =>{
  let args: (string | number | Boolean)[] = [true,1];
  let select = logic.oper("?:");
  expect(select).toBeDefined();
  expect(typeof select).toBe("function");
  expect(logic.applyPred({"?:":args})).toEqual(1);
  args = [false,1,2];
  expect(logic.applyPred({"?:":args})).toEqual(2);
  args = [false,1,true,2];
  expect(logic.applyPred({"?:":args})).toEqual(2);
  args = [false,1,false,2,3];
  expect(logic.applyPred({"?:":args})).toEqual(3);

  /*
  expect(logic.applyPred({"and":[true,true,true]})).toBeTruthy();
  expect(logic.applyPred({"and":[false,true,true]})).toBeFalsy();
  expect(logic.applyPred({"and":[true,false,true]})).toBeFalsy();
  expect(logic.applyPred({"and":[true,true,false]})).toBeFalsy();

  expect(logic.applyPred({"or":[false,false,false]})).toBeFalsy();
  expect(logic.applyPred({"or":[false,true,false]})).toBeTruthy();
  expect(logic.applyPred({"or":[true,false,false]})).toBeTruthy();
  expect(logic.applyPred({"or":[false,true,false]})).toBeTruthy();
  */
  done();
})

test("Access", (done) =>{
  done();
})