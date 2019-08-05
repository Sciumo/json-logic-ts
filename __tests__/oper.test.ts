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
  let lt = logic.oper("<");
  expect(lt).toBeDefined();
  expect(typeof lt).toBe("function");
  expect(lt!.apply(logic,[{},1,2])).toBeTruthy();
  expect(lt!.apply(logic,[{},1,2,3])).toBeTruthy();
  expect(lt!.apply(logic,[{},1,4,3])).toBeFalsy();
  expect(lt!.apply(logic,[{},2,3,1])).toBeFalsy();
  
  let lte = logic.oper("<=");
  expect(lte).toBeDefined();
  expect(typeof lte).toBe("function");
  expect(lte!.apply(logic,[{},2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,2,2])).toBeTruthy();
  expect(lte!.apply(logic,[{},1,3,2])).toBeFalsy();
  expect(!lte!.apply(logic,[{},1,2,2])).toBeFalsy();
  
  let gt = logic.oper(">");
  expect(gt).toBeDefined();
  expect(typeof gt).toBe("function");
  expect(gt!.apply(logic,[{},2,1])).toBeTruthy();
  expect(!gt!.apply(logic,[{},2,1,0])).toBeFalsy();
  
  let gte = logic.oper(">=");
  expect(gte).toBeDefined();
  expect(typeof gte).toBe("function");
  expect(gte!.apply(logic,[{},2,1,1])).toBeTruthy();
  expect(!gte!.apply(logic,[{},2,1,1])).toBeFalsy();
  
  let ne = logic.oper("!=");
  expect(ne).toBeDefined();
  expect(typeof ne).toBe("function");

  let notNot = logic.oper("!!");
  expect(notNot).toBeDefined();
  expect(typeof notNot).toBe("function");

  let not = logic.oper("!");
  expect(not).toBeDefined();
  expect(typeof not).toBe("function");
  done();
})


test( "Arithmetic", (done) => {
  let mult = logic.oper("*");
  expect(mult).toBeDefined();
  expect(typeof mult).toBe("function");
  expect(mult!.apply(logic,[{},1,2,"3",4,5])).toEqual(120);
  
  let sum = logic.oper("+");
  expect(sum).toBeDefined();
  expect(typeof sum).toBe("function");
  expect(sum!.apply(logic,[{},2,2])).toEqual(4);
  expect(sum!.apply(logic,[{},2,2,2])).toEqual(6);
  expect(sum!.apply(logic,[{},"2",2,2])).toEqual(6);
  
  let div = logic.oper("/");
  expect(div).toBeDefined();
  expect(typeof div).toBe("function");
  expect(div!.apply(logic,[{},2,2])).toEqual(1);
  expect(div!.apply(logic,[{},"4",2])).toEqual(2);
  
  let sub = logic.oper("-");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  expect(sub!.apply(logic,[{},2,2])).toEqual(0);
  expect(sub!.apply(logic,[{},"6",2])).toEqual(4);

  let mod = logic.oper("%")
  expect(mod).toBeDefined();
  expect(typeof mod).toBe("function");
  expect(mod!.apply(logic,[{},50,2])).toEqual(0)
  expect(mod!.apply(logic,[{},77,2])).toEqual(1)
  expect(mod!.apply(logic,[{},50,3])).toEqual(2)
  done();
})