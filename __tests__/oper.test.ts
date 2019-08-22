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
  expect(lt).toBeDefined();
  expect(typeof lt).toBe("function");
  expect(logic.applyPred({"<":[1,2]})).toBeTruthy();
  expect(logic.applyPred({"<":[1,2,3]})).toBeTruthy();
  expect(logic.applyPred({"<":[1,4,3]})).toBeFalsy();
  expect(logic.applyPred({"<":[2,3,1]})).toBeFalsy();

  //testing less than equal operator
  let lte = logic.oper("<=");
  expect(lte).toBeDefined();
  expect(typeof lte).toBe("function");
  expect(logic.applyPred({"<=":[2,2]})).toBeTruthy();
  expect(logic.applyPred({"<=":[1,2,2]})).toBeTruthy();
  expect(logic.applyPred({"<=":[1,3,2]})).toBeFalsy();
  
  //testing greater than operator
  let gt = logic.oper(">");
  expect(gt).toBeDefined();
  expect(typeof gt).toBe("function");
  expect(logic.applyPred({">":[2,1,0]})).toBeTruthy();
  expect(!logic.applyPred({">":[2,1,0]})).toBeFalsy();
  expect(logic.applyPred({">":[2,1,0]})).toEqual(!logic.applyPred({"<=":[2,1,0]}));
  
  //testing greater than equal operator
  let gte = logic.oper(">=");
  expect(gte).toBeDefined();
  expect(typeof gte).toBe("function");
  expect(logic.applyPred({">=":[2,1,1]})).toBeTruthy();
  expect(!logic.applyPred({">=":[2,1,1]})).toBeFalsy();
  expect(logic.applyPred({">=":[2,1,1]})).toEqual(!logic.applyPred({"<":[2,1,1]}));

  //testing min operator
  let min = logic.oper("min");
  expect(min).toBeDefined();
  expect(typeof min).toBe("function");
  expect(logic.applyPred({"min":[1,1]})).toEqual(1);
  expect(logic.applyPred({"min":[1,2]})).toEqual(1);
  expect(logic.applyPred({"min":[2,1]})).toEqual(1);
  expect(logic.applyPred({"min":[2,1,3]})).toEqual(1);
  expect(logic.applyPred({"min":[2,"1",3]})).toEqual(1);
  expect(logic.applyPred({"min":[2,"",3]})).toEqual(0);

  //testing max operator
  let max = logic.oper("max");
  expect(max).toBeDefined();
  expect(typeof max).toBe("function");
  expect(logic.applyPred({"max":[1,1]})).toEqual(1);
  expect(logic.applyPred({"max":[1,2]})).toEqual(2);
  expect(logic.applyPred({"max":[2,1]})).toEqual(2);
  expect(logic.applyPred({"max":[1,2,3]})).toEqual(3);
  expect(logic.applyPred({"max":[1,3,1]})).toEqual(3);
  expect(logic.applyPred({"max":[1,"2"]})).toEqual(2);
  done();
})


test( "Arithmetic", (done) => {
  //testing multiplication operator
  let mult = logic.oper("*");
  expect(mult).toBeDefined();
  expect(typeof mult).toBe("function");
  expect(logic.applyPred({"*":[1,2,"3",4,5]})).toEqual(120);
  
  //testing sum operator
  let sum = logic.oper("+");
  expect(sum).toBeDefined();
  expect(typeof sum).toBe("function");
  expect(logic.applyPred({"+":[2,2]})).toEqual(4);
  expect(logic.applyPred({"+":[2,2,2]})).toEqual(6);
  expect(logic.applyPred({"+":["2",2,2]})).toEqual(6);
  
  //testing division operator
  let div = logic.oper("/");
  expect(div).toBeDefined();
  expect(typeof div).toBe("function");
  expect(logic.applyPred({"/":[2,2]})).toEqual(1);
  expect(logic.applyPred({"/":["6",2]})).toEqual(3);
  
  //testing subtraction operator
  let sub = logic.oper("-");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  expect(logic.applyPred({"-":[2,2]})).toEqual(0);
  expect(logic.applyPred({"-":["6",2]})).toEqual(4);

  //testing modulo operator
  let mod = logic.oper("%")
  expect(mod).toBeDefined();
  expect(typeof mod).toBe("function");
  expect(logic.applyPred({"%":[50,2]})).toEqual(0)
  expect(logic.applyPred({"%":[77,2]})).toEqual(1)
  expect(logic.applyPred({"%":[50,3]})).toEqual(2)
  done();
})

test("Logic", (done) =>{
  //testing type coercion not equal
  let ne = logic.oper("!=");
  expect(ne).toBeDefined();
  expect(typeof ne).toBe("function");
  expect(logic.applyPred({"!=":[1,1]})).toBeFalsy();
  expect(logic.applyPred({"!=":[2,2]})).toBeFalsy();
  expect(logic.applyPred({"!=":[1,"1"]})).toBeFalsy();
  expect(logic.applyPred({"!=":[1,2]})).toBeTruthy();
  expect(logic.applyPred({"!=":[1,"2"]})).toBeTruthy();
  expect(logic.applyPred({"!=":[0,""]})).toBeFalsy();
  expect(logic.applyPred({"!=":[true, true]})).toBeFalsy();
  expect(logic.applyPred({"!=":[true,"1"]})).toBeFalsy();
  expect(logic.applyPred({"!=":[true, 1]})).toBeFalsy();
  expect(logic.applyPred({"!=":[true,1]})).toBeFalsy();
  expect(logic.applyPred({"!=":[true,0]})).toBeTruthy();
  expect(logic.applyPred({"!=":[true,false]})).toBeTruthy();
  expect(logic.applyPred({"!=":[false,false]})).toBeFalsy();
  expect(logic.applyPred({"!=":[false,""]})).toBeFalsy();
  expect(logic.applyPred({"!=":[false,0]})).toBeFalsy();
  expect(logic.applyPred({"!=":[false,1]})).toBeTruthy();
  expect(logic.applyPred({"!=":[false,"1"]})).toBeTruthy();
  expect(logic.applyPred({"!=":[false, true]})).toBeTruthy();

  //testing not equal
  let tne = logic.oper("!==");
  expect(tne).toBeDefined();
  expect(typeof tne).toBe("function");
  expect(logic.applyPred({"!==":[1,1]})).toBeFalsy();
  expect(logic.applyPred({"!==":[2,2]})).toBeFalsy();
  expect(logic.applyPred({"!==":[1,"1"]})).toBeTruthy();
  expect(logic.applyPred({"!==":[1,2]})).toBeTruthy();
  expect(logic.applyPred({"!==":[1,"2"]})).toBeTruthy();
  expect(logic.applyPred({"!==":[0,""]})).toBeTruthy();
  expect(logic.applyPred({"!==":[true, true]})).toBeFalsy();
  expect(logic.applyPred({"!==":[true,"1"]})).toBeTruthy();
  expect(logic.applyPred({"!==":[true, 1]})).toBeTruthy();
  expect(logic.applyPred({"!==":[true,1]})).toBeTruthy();
  expect(logic.applyPred({"!==":[true,0]})).toBeTruthy();
  expect(logic.applyPred({"!==":[true,false]})).toBeTruthy();
  expect(logic.applyPred({"!==":[false,false]})).toBeFalsy();
  expect(logic.applyPred({"!==":[false,""]})).toBeTruthy();
  expect(logic.applyPred({"!==":[false,0]})).toBeTruthy();
  expect(logic.applyPred({"!==":[false,1]})).toBeTruthy();
  expect(logic.applyPred({"!==":[false,"1"]})).toBeTruthy();
  expect(logic.applyPred({"!==":[false, true]})).toBeTruthy();

  //testing type coercion equal
  let equal = logic.oper("==");
  expect(equal).toBeDefined();
  expect(typeof equal).toBe("function");
  expect(logic.applyPred({"==":[1,1]})).toBeTruthy();
  expect(logic.applyPred({"==":[2,2]})).toBeTruthy();
  expect(logic.applyPred({"==":[1,"1"]})).toBeTruthy();
  expect(logic.applyPred({"==":[1,2]})).toBeFalsy();
  expect(logic.applyPred({"==":[1,"2"]})).toBeFalsy();
  expect(logic.applyPred({"==":[0,""]})).toBeTruthy();
  expect(logic.applyPred({"==":[true, true]})).toBeTruthy();
  expect(logic.applyPred({"==":[true,"1"]})).toBeTruthy();
  expect(logic.applyPred({"==":[true, 1]})).toBeTruthy();
  expect(logic.applyPred({"==":[true,0]})).toBeFalsy();
  expect(logic.applyPred({"==":[true,false]})).toBeFalsy();
  expect(logic.applyPred({"==":[false,false]})).toBeTruthy();
  expect(logic.applyPred({"==":[false,""]})).toBeTruthy();
  expect(logic.applyPred({"==":[false,0]})).toBeTruthy();
  expect(logic.applyPred({"==":[false,1]})).toBeFalsy();
  expect(logic.applyPred({"==":[false,"1"]})).toBeFalsy();
  expect(logic.applyPred({"==":[false, true]})).toBeFalsy();

  //testing equal
  let typeEqual = logic.oper("===");
  expect(typeEqual).toBeDefined();
  expect(typeof typeEqual).toBe("function");
  expect(logic.applyPred({"===":[1,1]})).toBeTruthy();
  expect(logic.applyPred({"===":[2,2]})).toBeTruthy();
  expect(logic.applyPred({"===":[1,"1"]})).toBeFalsy();
  expect(logic.applyPred({"===":[1,2]})).toBeFalsy();
  expect(logic.applyPred({"===":[1,"2"]})).toBeFalsy();
  expect(logic.applyPred({"===":[0,""]})).toBeFalsy();
  expect(logic.applyPred({"===":[true, true]})).toBeTruthy();
  expect(logic.applyPred({"===":[true,"1"]})).toBeFalsy();
  expect(logic.applyPred({"===":[true, 1]})).toBeFalsy();
  expect(logic.applyPred({"===":[true,0]})).toBeFalsy();
  expect(logic.applyPred({"===":[true,false]})).toBeFalsy();
  expect(logic.applyPred({"===":[false,false]})).toBeTruthy();
  expect(logic.applyPred({"===":[false,""]})).toBeFalsy();
  expect(logic.applyPred({"===":[false,0]})).toBeFalsy();
  expect(logic.applyPred({"===":[false,1]})).toBeFalsy();
  expect(logic.applyPred({"===":[false,"1"]})).toBeFalsy();
  expect(logic.applyPred({"===":[false, true]})).toBeFalsy();
  
  //testing notnot/cast to bool operator
  let notNot = logic.oper("!!")
  expect(notNot).toBeDefined();
  expect(typeof notNot).toBe("function");
  expect(logic.applyPred({"!!":[true]})).toBeTruthy();
  expect(logic.applyPred({"!!":[false]})).toBeFalsy();
  expect(logic.applyPred({"!!":[1]})).toBeTruthy();
  expect(logic.applyPred({"!!":[2]})).toBeTruthy();
  expect(logic.applyPred({"!!":[0]})).toBeFalsy();
  expect(logic.applyPred({"!!":["hello"]})).toBeTruthy();
  expect(logic.applyPred({"!!":[""]})).toBeFalsy();

  //testing not operator
  let not = logic.oper("!")
  expect(not).toBeDefined();
  expect(typeof not).toBe("function");
  expect(logic.applyPred({"!":[true]})).toBeFalsy();
  expect(logic.applyPred({"!":[true]})).toEqual(!logic.applyPred({"!!":[true]}));
  expect(logic.applyPred({"!":[false]})).toBeTruthy();
  expect(logic.applyPred({"!":[false]})).toEqual(!logic.applyPred({"!!":[false]}));
  expect(logic.applyPred({"!":[1]})).toBeFalsy();
  expect(logic.applyPred({"!":[1]})).toEqual(!logic.applyPred({"!!":[1]}));
  expect(logic.applyPred({"!":[2]})).toBeFalsy();
  expect(logic.applyPred({"!":[2]})).toEqual(!logic.applyPred({"!!":[2]}));
  expect(logic.applyPred({"!":[0]})).toBeTruthy();
  expect(logic.applyPred({"!":[0]})).toEqual(!logic.applyPred({"!!":[0]}));
  expect(logic.applyPred({"!":["hello"]})).toBeFalsy();
  expect(logic.applyPred({"!":["hello"]})).toEqual(!logic.applyPred({"!!":["hello"]}));
  expect(logic.applyPred({"!":[""]})).toBeTruthy();
  expect(logic.applyPred({"!":[""]})).toEqual(!logic.applyPred({"!!":[""]}));
  done();
})

test("Array", (done) =>{
  let inside = logic.oper("in");
  expect(inside).toBeDefined();
  expect(typeof inside).toBe("function");
  expect(logic.applyPred({"in":["Hello","Hello World"]})).toBeTruthy();
  expect(logic.applyPred({"in":["Hllo", "Hello World"]})).toBeFalsy();
  expect(logic.applyPred({"in":[1, [1,2,3,4]]})).toBeTruthy();
  expect(logic.applyPred({"in":[1, [2,3,4]]})).toBeFalsy();

  let merge = logic.oper("merge");
  expect(merge).toBeDefined();
  expect(typeof merge).toBe("function");
  expect(logic.applyPred({"merge":[[1,2],[3,4]]})).toEqual([1,2,3,4]);
  done();
})

test("String", (done) =>{
  let concat = logic.oper("cat");
  expect(concat).toBeDefined();
  expect(typeof concat).toBe("function");
  expect(logic.applyPred({"cat":["Hello","World"]})).toEqual("HelloWorld");
  expect(logic.applyPred({"cat":["Hello",""]})).toEqual("Hello");

  let sub = logic.oper("substr");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  expect(logic.applyPred({"substr":["jsonlogic", 4]})).toEqual("logic");
  expect(logic.applyPred({"substr":["jsonlogic", -5]})).toEqual("logic");
  expect(logic.applyPred({"substr":["jsonlogic", 1, 3]})).toEqual("son");
  expect(logic.applyPred({"substr":["jsonlogic", 4, -2]})).toEqual("log");
  done();
})

test("Logic", (done) =>{
  let select = logic.oper("?:");
  expect(select).toBeDefined();
  expect(typeof select).toBe("function");
  expect(logic.applyPred({"?:":[true,1]})).toEqual(1);
  expect(logic.applyPred({"?:":[false,1,2]})).toEqual(2);
  expect(logic.applyPred({"?:":[false,1,true,2]})).toEqual(2);
  expect(logic.applyPred({"?:":[false,1,false,2,3]})).toEqual(3);

  let also = logic.oper("and");
  expect(also).toBeDefined();
  expect(logic.applyPred({"and":[true,true,true]})).toBeTruthy();
  expect(logic.applyPred({"and":[true,true,false]})).toBeFalsy();
  expect(logic.applyPred({"and":[true,false,true]})).toBeFalsy();
  expect(logic.applyPred({"and":[false,true,true]})).toBeFalsy();
  expect(logic.applyPred({"and":[true,true,1]})).toEqual(1);
  expect(logic.applyPred({"and":[0,true,true]})).toEqual(0);

  let either = logic.oper("or");
  expect(either).toBeDefined();
  expect(logic.applyPred({"or":[false,false,false]})).toBeFalsy;
  expect(logic.applyPred({"or":[false,true,false]})).toBeTruthy;
  expect(logic.applyPred({"or":[false,false,true]})).toBeTruthy;
  expect(logic.applyPred({"or":[true,false,false]})).toBeTruthy;
  expect(logic.applyPred({"or":[false,false,1]})).toEqual(1);
  expect(logic.applyPred({"or":[false,1,false]})).toEqual(1);
  done();
})

test("Access", (done) =>{
  let val = logic.oper("var");
  expect(val).toBeDefined();
  expect(typeof val).toBe("function");
  expect(logic.applyPred({"var":["hello"]},{"hello":"hello world","pi":3.14,"num":11})).toEqual("hello world");
  expect(logic.applyPred({"var":[""]},{"hello":"hello world","pi":3.14,"num":11})).toEqual({"hello":"hello world","pi":3.14,"num":11});
  expect(logic.applyPred({"var":["not"]},{"hello":"hello world","pi":3.14,"num":11})).toEqual(null);
  expect(logic.applyPred({"var":["not",26]},{"hello":"hello world","pi":3.14,"num":11})).toEqual(26);

  let missing = logic.oper("missing");
  expect(missing).toBeDefined();
  expect(typeof missing).toBe("function");
  expect(logic.applyPred({"missing":["hello","not","pi"]},{"hello":"hello world","pi":3.14,"num":11})).toEqual(["not"]);
  expect(logic.applyPred({"missing":["hello","not","there","pi"]},{"hello":"hello world","pi":3.14,"num":11})).toEqual(["not","there"]);
  expect(logic.applyPred({"missing":["hello","pi"]},{"hello":"hello world","pi":3.14,"num":11})).toEqual([]);
  
  let missome = logic.oper("missing_some");
  expect(missome).toBeDefined();
  expect(typeof missome).toBe("function");
  expect(logic.applyPred({"missing_some":[2,["hello","not","there","pi"]]},{"hello":"hello world","pi":3.14,"num":11})).toEqual([]);
  expect(logic.applyPred({"missing_some":[3,["hello","not","there","pi"]]},{"hello":"hello world","pi":3.14,"num":11})).toEqual(["not","there"]);
  done();
})