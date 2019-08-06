import JL from "../";

const logic = new JL();

test( "Operator Lookup", (done) => {
  expect(logic).toBeDefined();
  expect(logic.operations).toBeDefined();
  expect(logic.operations.has("<")).toBeTruthy();
  
  let op = logic.oper("<");
  expect(op).toBeDefined();
  expect(typeof op).toBe("function");
  done();
})

test( "Relational", (done) => {
  //testing Less than operator
  let lt = logic.oper("<");
  expect(lt).toBeDefined();
  expect(typeof lt).toBe("function");
  expect(lt!.apply(logic,[{},1,2])).toBeTruthy();
  expect(lt!.apply(logic,[{},1,2,3])).toBeTruthy();
  expect(lt!.apply(logic,[{},1,4,3])).toBeFalsy();
  expect(lt!.apply(logic,[{},2,3,1])).toBeFalsy();
  
  //testing less than equal operator
  let lte = logic.oper("<=");
  expect(lte).toBeDefined();
  expect(typeof lte).toBe("function");
  expect(lte!.apply(logic,[{},2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,3,2])).toBeFalsy();
  expect(!lte!.apply(logic,[{},1,2,2])).toBeFalsy();
  
  //testing greater than operator
  let gt = logic.oper(">");
  expect(gt).toBeDefined();
  expect(typeof gt).toBe("function");
  expect(gt!.apply(logic,[{},2,1])).toBeTruthy();
  expect(!gt!.apply(logic,[{},2,1,0])).toBeFalsy();
  expect(gt!.apply(logic,[{},2,1,0])).toEqual(!lte!.apply(logic,[{},2,1,0]));
  
  //testing greater than equal operator
  let gte = logic.oper(">=");
  expect(gte).toBeDefined();
  expect(typeof gte).toBe("function");
  expect(gte!.apply(logic,[{},2,1,1])).toBeTruthy();
  expect(!gte!.apply(logic,[{},2,1,1])).toBeFalsy();
  expect(gte!.apply(logic,[{},2,1,1])).toEqual(!lt!.apply(logic,[{},2,1,1]));

  let min = logic.oper("min");
  expect(min).toBeDefined();
  expect(typeof min).toBe("function");
  expect(min!.apply(logic,[{},1,1])).toEqual(1);
  expect(min!.apply(logic,[{},1,2])).toEqual(1);
  expect(min!.apply(logic,[{},2,1])).toEqual(1);
  expect(min!.apply(logic,[{},2,1,3])).toEqual(1);
  expect(min!.apply(logic,[{},2,"1",3])).toEqual(1);
  expect(min!.apply(logic,[{},2,"",3])).toEqual(0);
  
  let max = logic.oper("max");
  expect(max).toBeDefined();
  expect(typeof max).toBe("function");
  expect(max!.apply(logic,[{},1,1])).toEqual(1);
  expect(max!.apply(logic,[{},2,1])).toEqual(2);
  expect(max!.apply(logic,[{},1,2])).toEqual(2);
  expect(max!.apply(logic,[{},1,2,3])).toEqual(3);
  expect(max!.apply(logic,[{},1,3,1])).toEqual(3);
  expect(max!.apply(logic,[{},1,"2"])).toEqual(2);
  done();
})


test( "Arithmetic", (done) => {
  //testing multiplication operator
  let mult = logic.oper("*");
  expect(mult).toBeDefined();
  expect(typeof mult).toBe("function");
  expect(mult!.apply(logic,[{},1,2,"3",4,5])).toEqual(120);
  
  //testing sum operator
  let sum = logic.oper("+");
  expect(sum).toBeDefined();
  expect(typeof sum).toBe("function");
  expect(sum!.apply(logic,[{},2,2])).toEqual(4);
  expect(sum!.apply(logic,[{},2,2,2])).toEqual(6);
  expect(sum!.apply(logic,[{},"2",2,2])).toEqual(6);
  
  //testing division operator
  let div = logic.oper("/");
  expect(div).toBeDefined();
  expect(typeof div).toBe("function");
  expect(div!.apply(logic,[{},2,2])).toEqual(1);
  expect(div!.apply(logic,[{},"4",2])).toEqual(2);
  
  //testing subtraction operator
  let sub = logic.oper("-");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  expect(sub!.apply(logic,[{},2,2])).toEqual(0);
  expect(sub!.apply(logic,[{},"6",2])).toEqual(4);

  //testing modulo operator
  let mod = logic.oper("%")
  expect(mod).toBeDefined();
  expect(typeof mod).toBe("function");
  expect(mod!.apply(logic,[{},50,2])).toEqual(0)
  expect(mod!.apply(logic,[{},77,2])).toEqual(1)
  expect(mod!.apply(logic,[{},50,3])).toEqual(2)
  done();
})

test("Logic", (done) =>{
  //testing type coercion not equal
  let ne = logic.oper("!=");
  expect(ne).toBeDefined();
  expect(typeof ne).toBe("function");
  expect(ne!.apply(logic,[{},1,1])).toBeFalsy();
  expect(ne!.apply(logic,[{},2,2])).toBeFalsy();
  expect(ne!.apply(logic,[{},1,"1"])).toBeFalsy();
  expect(ne!.apply(logic,[{},1,2])).toBeTruthy();
  expect(ne!.apply(logic,[{},1,"2"])).toBeTruthy();
  expect(ne!.apply(logic,[{},0,""])).toBeFalsy();
  expect(ne!.apply(logic,[{},true,true])).toBeFalsy();
  expect(ne!.apply(logic,[{},true,"1"])).toBeFalsy();
  expect(ne!.apply(logic,[{},true,1])).toBeFalsy();
  expect(ne!.apply(logic,[{},true,""])).toBeTruthy();
  expect(ne!.apply(logic,[{},true,0])).toBeTruthy();
  expect(ne!.apply(logic,[{},true,false])).toBeTruthy();
  expect(ne!.apply(logic,[{},false,false])).toBeFalsy();
  expect(ne!.apply(logic,[{},false,""])).toBeFalsy();
  expect(ne!.apply(logic,[{},false,0])).toBeFalsy();
  expect(ne!.apply(logic,[{},false,1])).toBeTruthy();
  expect(ne!.apply(logic,[{},false,"1"])).toBeTruthy();
  expect(ne!.apply(logic,[{},false,true])).toBeTruthy();

  //testing not equal
  let tne = logic.oper("!==");
  expect(tne).toBeDefined();
  expect(typeof tne).toBe("function");
  expect(tne!.apply(logic,[{},1,1])).toBeFalsy();
  expect(tne!.apply(logic,[{},2,2])).toBeFalsy();
  expect(tne!.apply(logic,[{},1,"1"])).toBeTruthy();
  expect(tne!.apply(logic,[{},1,2])).toBeTruthy();
  expect(tne!.apply(logic,[{},1,"2"])).toBeTruthy();
  expect(tne!.apply(logic,[{},0,""])).toBeTruthy();
  expect(tne!.apply(logic,[{},true,true])).toBeFalsy();
  expect(tne!.apply(logic,[{},true,"1"])).toBeTruthy();
  expect(tne!.apply(logic,[{},true,1])).toBeTruthy();
  expect(tne!.apply(logic,[{},true,""])).toBeTruthy();
  expect(tne!.apply(logic,[{},true,0])).toBeTruthy();
  expect(tne!.apply(logic,[{},true,false])).toBeTruthy();
  expect(tne!.apply(logic,[{},false,false])).toBeFalsy();
  expect(tne!.apply(logic,[{},false,""])).toBeTruthy();
  expect(tne!.apply(logic,[{},false,0])).toBeTruthy();
  expect(tne!.apply(logic,[{},false,1])).toBeTruthy();
  expect(tne!.apply(logic,[{},false,"1"])).toBeTruthy();
  expect(tne!.apply(logic,[{},false,true])).toBeTruthy();

  //testing type coercion equal
  let equal = logic.oper("==");
  expect(equal).toBeDefined();
  expect(typeof equal).toBe("function");
  expect(equal!.apply(logic,[{},1,1])).toBeTruthy();
  expect(equal!.apply(logic,[{},2,2])).toBeTruthy();
  expect(equal!.apply(logic,[{},1,"1"])).toBeTruthy();
  expect(equal!.apply(logic,[{},1,2])).toBeFalsy();
  expect(equal!.apply(logic,[{},1,"2"])).toBeFalsy();
  expect(equal!.apply(logic,[{},0,""])).toBeTruthy();
  expect(equal!.apply(logic,[{},true,true])).toBeTruthy();
  expect(equal!.apply(logic,[{},true,"1"])).toBeTruthy();
  expect(equal!.apply(logic,[{},true,1])).toBeTruthy();
  expect(equal!.apply(logic,[{},true,""])).toBeFalsy();
  expect(equal!.apply(logic,[{},true,0])).toBeFalsy();
  expect(equal!.apply(logic,[{},true,false])).toBeFalsy();
  expect(equal!.apply(logic,[{},false,false])).toBeTruthy();
  expect(equal!.apply(logic,[{},false,""])).toBeTruthy();
  expect(equal!.apply(logic,[{},false,0])).toBeTruthy();
  expect(equal!.apply(logic,[{},false,1])).toBeFalsy();
  expect(equal!.apply(logic,[{},false,"1"])).toBeFalsy();
  expect(equal!.apply(logic,[{},false,true])).toBeFalsy();

  //testing equal
  let typeEqual = logic.oper("===");
  expect(typeEqual).toBeDefined();
  expect(typeof typeEqual).toBe("function");
  expect(typeEqual!.apply(logic,[{},1,1])).toBeTruthy();
  expect(typeEqual!.apply(logic,[{},2,2])).toBeTruthy();
  expect(typeEqual!.apply(logic,[{},1,"1"])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},1,2])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},1,"2"])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},0,""])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},true,true])).toBeTruthy();
  expect(typeEqual!.apply(logic,[{},true,"1"])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},true,1])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},true,""])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},true,0])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},true,false])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},false,false])).toBeTruthy();
  expect(typeEqual!.apply(logic,[{},false,""])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},false,0])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},false,1])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},false,"1"])).toBeFalsy();
  expect(typeEqual!.apply(logic,[{},false,true])).toBeFalsy();
  
  //testing notnot/cast to bool operator
  let notNot = logic.oper("!!")
  expect(notNot).toBeDefined();
  expect(typeof notNot).toBe("function");
  expect(notNot!.apply(logic,[{},true])).toBeTruthy();
  expect(notNot!.apply(logic,[{},false])).toBeFalsy();
  expect(notNot!.apply(logic,[{},1])).toBeTruthy();
  expect(notNot!.apply(logic,[{},2])).toBeTruthy();
  expect(notNot!.apply(logic,[{},0])).toBeFalsy();
  expect(notNot!.apply(logic,[{},"hello"])).toBeTruthy();
  expect(notNot!.apply(logic,[{},""])).toBeFalsy();

  //testing not operator
  let not = logic.oper("!")
  expect(not).toBeDefined();
  expect(typeof not).toBe("function");
  expect(not!.apply(logic,[{},true])).toBeFalsy();
  expect(not!.apply(logic,[{},true])).toEqual(!notNot!.apply(logic,[{},true]));
  expect(not!.apply(logic,[{},false])).toBeTruthy();
  expect(not!.apply(logic,[{},false])).toEqual(!notNot!.apply(logic,[{},false]));
  expect(not!.apply(logic,[{},1])).toBeFalsy();
  expect(not!.apply(logic,[{},1])).toEqual(!notNot!.apply(logic,[{},1]));
  expect(not!.apply(logic,[{},2])).toBeFalsy();
  expect(not!.apply(logic,[{},2])).toEqual(!notNot!.apply(logic,[{},2]));
  expect(not!.apply(logic,[{},0])).toBeTruthy();
  expect(not!.apply(logic,[{},0])).toEqual(!notNot!.apply(logic,[{},0]));
  expect(not!.apply(logic,[{},"hello"])).toBeFalsy();
  expect(not!.apply(logic,[{},"hello"])).toEqual(!notNot!.apply(logic,[{},"hello"]));
  expect(not!.apply(logic,[{},""])).toBeTruthy();
  expect(not!.apply(logic,[{},""])).toEqual(!notNot!.apply(logic,[{},""]));
  done();
})