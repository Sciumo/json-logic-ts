import "reflect-metadata";
import {h64, UINT} from "xxhashjs";
import Prando from "prando"

export const LEMCLASSKEY = Symbol("LEMClass");
export const LEMMETHODKEY = Symbol("LEMMethod");
export const LEMFIELDKEY = Symbol("LEMField");
export const LEMFIELDSKEY = Symbol("LEMFields");
export const LEMFACTHANDLEKEY = Symbol("LEMFactHandle");

export const LEMSEED = 0xbeef;

/**
 * NULL LEM Hash
 */
export var LEMNULLHASH = h64(LEMSEED).digest();

export function lemFields(obj:any) : any[] | null {
  let fields = Reflect.getMetadata(LEMFIELDSKEY,obj);
  if( Array.isArray(fields) ){
    return fields;
  }
  return null;
}

export function lemFieldHash(obj:any, fields: any[]|null){
  if( !obj ){
    return LEMNULLHASH;
  }
  if( fields ){
    var h = h64(LEMSEED);
    for( var field of fields ){
      let val = obj[field];
      if( val ){
        h.update( val + "" );
      }
    }
    return h.digest();
  }
  return LEMNULLHASH;
}

/**
 * Fact Handles provide accounting for fact fields and their changes over time.
 */
export class FactHandle {

  static HASHGEN = h64(LEMSEED).update( new Date().toISOString() );
  static PRAND = new Prando(LEMSEED);
  static nextHash(){
    FactHandle.HASHGEN.update(this.PRAND.next() + "" );
    return FactHandle.HASHGEN.digest();
  }
  static getFor(obj:any){
    return obj["__factHandle"] as FactHandle;
  }

  static createFor(obj:any){
    let fields = lemFields(obj);
    if( !fields ){
      throw new Error("Fact missing LEM Fields");
    }
    return new FactHandle( lemFieldHash(obj, fields ) );
  }

  constructor( public fieldHash = LEMNULLHASH, public lastUpdate = Date.now(), public revision = 0,public handle = FactHandle.nextHash() ){}
  update(obj:any){
    let fields = lemFields(obj);
    this.lastUpdate = Date.now();
    this.fieldHash = lemFieldHash(obj,fields);
    this.revision++;
  }
}

export const NULLFactHandle = new FactHandle( LEMNULLHASH, new Date(1901,1).getTime(), -1 );

/**
 * Logic Event Method Class decorator
 * @param ctor Object being registered for Logic Event Method Invocation
 */
export function LEMClass<T extends { new (...args: any[]): {} }>(ctor: T) {
  let fh = new FactHandle();
  return class extends ctor {
    __factHandle = fh;
  };
}

export function LEMField(target: object, propertyKey: string) {
  let columns: string[] = Reflect.getMetadata(LEMFIELDSKEY, target) || [];
  columns.push(propertyKey);
  Reflect.defineMetadata(LEMFIELDSKEY, columns, target);
}

export class FactBase extends Map<UINT, any>{
  inserted: UINT[] = [];
  updated: UINT[] = [];
  retracted: UINT[] = [];

  constructor(){
    super();
  }

  update( obj: any ){
    let fhandle = FactHandle.getFor(obj);
    if( !fhandle ){
      fhandle = FactHandle.createFor(obj);
      super.set(fhandle.handle,obj);
      this.inserted.push(fhandle.handle)
      return fhandle;
    }
    fhandle.update(obj);
    this.updated.push(fhandle.handle);
    super.set(fhandle.handle,obj);
    return fhandle;
  }

  retract(obj:any){
    let fhandle = FactHandle.getFor(obj);
    if( !fhandle ){
      return null;
    }
    if( super.delete(fhandle.handle) ){
      this.retracted.push(fhandle.handle);
      return fhandle;
    }
    return null;
  }
}