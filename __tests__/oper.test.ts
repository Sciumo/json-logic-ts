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
  expect(lt!.apply(logic,[{},2,3,1])).toBeFalsy();
  let lte = logic.oper("<=");
  expect(lte).toBeDefined();
  expect(typeof lte).toBe("function");
  expect(lte!.apply(logic,[{},1,2,2])).toBeTruthy();
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
  done();
})


test( "Math", (done) => {
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
  
  let sub = logic.oper("-");
  expect(sub).toBeDefined();
  expect(typeof sub).toBe("function");
  done();
})