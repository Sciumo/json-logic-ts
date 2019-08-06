
import {LEMClass,FactBase, LEMField, FactHandle, lemFields}  from "../src/logic_event";

@LEMClass
class TestFact {
  @LEMField name = "name" 
  @LEMField age = 0
  constructor(name:string, age:number){
    this.name = name;
    this.age = age;
  }
}

describe( "LEM", () => {
  describe( "LEM class", () => {
    test( "LEM has fact handle", () => {
      let myname = "fred";
      let fbase = new FactBase()
      let w = new TestFact(myname,100);
      expect(w).toBeDefined();
      expect(fbase.inserted).toBeDefined();
      expect(w.name).toEqual(myname);
      let fields = lemFields(w);
      let fhandle = FactHandle.getFor(w);
      expect(fields).toBeDefined();
      expect(Array.isArray(fields)).toBeTruthy();
      expect(fields!.length).toEqual(2);
      expect(fhandle).toBeDefined();
    })
  })
})