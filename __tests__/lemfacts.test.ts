
import {LEMClass,FactBase, LEMField, FactHandle, lemFields}  from "../src/logic_event";

@LEMClass
class TestFact {
  @LEMField name = "name" 
  constructor(name:string){
    this.name = name;
  }
}

describe( "LEM", () => {
  describe( "LEM class", () => {
    test( "LEM has fact handle", () => {
      let myname = "fred";
      let fbase = new FactBase()
      let w = new TestFact(myname);
      expect(w).toBeDefined();
      expect(fbase.inserted).toBeDefined();
      expect(w.name).toEqual(myname);
      let fields = lemFields(w);
      let fhandle = FactHandle.getFor(w);
      expect(fields).toBeDefined();
      expect(fhandle).toBeDefined();
    })
  })
})