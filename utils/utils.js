// todo - type check in class?

class Utils {
  /* A set of utility functions for generating items assocated with the production
     of 2d maps and items for it.
  */

  /* --- Internal methods --------------------------------------------------- */

  /* _randMod(max, mod)
  @param max: {int} a whole number greater than 0
  @param mod: {int} a whole number to check agant for rounding
  @return {int} an odd or even value
  */
  static _randMod(max, mod){
    var rand = mod;
    while (rand % 2 == mod) {
      rand = this.rand(max);
    }
    return rand;
  }

  /* _getDif(coordinates, change, keep)
  @param coordinates: {object} with keys start and end of coordinates
  @param change: {string} the dimenion be moved in
  @param keep: {string} the dimension being kept as the same as the starting point
  @return: {object} an object of keys {change: new val, keep: coord.start value}
  */
  static _getDif(coordinates, change, keep){
    return {[keep]: coordinates.start[keep], [change]: coordinates.end[change]}
  }

  /* --- Custom Error Methods ----------------------------------------------- */

  /* typeCheck(item, type, call);
  @param item: {mixed} an item to be checked for type
  @param type: {string} the type to check it is an instance of.
  @param call: {string} the location of the custom error thow.
  @return {mixed} returns the item unless it it tosses an error.
  */
  static typeCheck(item, type, call="typeCheck"){
    type = type.toLowerCase();
    // check type for whitelist to avoid typos, pick up some shorthand
    if(type === "bool"){ type = "boolean"; }
    if(type === "str"){ type = "string" ; }
    if(type === "class" || type === "constructor"){ type = "function"}
    if(type === "obj"){ type = "object"}
    if(type === "int"){ type = "integer"};
    var whitelist = ["int", "integer",  "function", "object", "number", "string", "boolean", "array"];
    var errorText = "The method " + call + " expected a " + type + " and received " + item + ".";

    // chuck out an error if the type is not on the whitelist.
    if(whitelist.indexOf(type) === -1){
      throw new Error("Unexpected type of variable '"+ type + "' for check in method " + call + ".");
    }

    // special case: array
    if(type == "array"){
      if(Array.isArray(item)){ return item; }
      else{ throw new Error(errorText); }
    }

    // special case: number is int
    if (["int", "integer"].indexOf(type) !== -1){
      if(Number.isInteger(item)){ return item; }
      else{ throw new Error(errorText); }
    }

    // base case
    if (typeof item == type){ return item; }

    // return base error
    else { throw new Error(errorText); }
  }

  /* protectionError(call);
  @param host: {string} the class that owns the attribute
  @param call: {string} the attribute setter that should not be used.
  @return: none. This function always thows an error;
  */
  static protectionError(host, call){
    throw new Error("Protected attribute " + call + " can not be set by using " + host + "." + call + ".");
  }

  /* undefinedCheck(call);
  @param item: {mixed} the value to be checked versus undefined.
  @param call: {string} the name of the error source to be displayed
  @return: {mixed} the value if not undefined.
  */
  static undefinedCheck(item, call){
    if(item === undefined){
      throw new Error("The property " + call + " is undefined, please set a value for " + call + ".");
    }
    return item;
  }

  /* --- Math Methods ------------------------------------------------------- */

  /* randomNumber(min, max)
    @param min: {int} a whole number less than max
    @param max: {int} a whole number greater than min
    @return {int} a random number between min and max
  */
  static randomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /* manyRand(min, max, returns)
  @param min: {int} the minimum number value
  @param max: {int} the maximum number value
  @param returns: {int} how many numbers to generate
  @return: {array} an array of selections
  */
  static manyRand(min, max, returns){
    var returnArray = [];
    if(returns > (max - min + 1)){
      throw new Error("Utils.manyRand requires a range that is greater than the number of returns expected.");
    }
    var values = 0;
    while(values < returns){
      var number = this.randomNumber(min, max);
      if (returnArray.indexOf(number === -1)) {
        returnArray.push(number);
        values ++;
      }
    }
    return returnArray;
  }

  /* rand(max)
    @param max: {int} a whole number greater than 1
    @return {int} a random number between 0 and max
  */
  static rand(max){
    return this.randomNumber(0, max);
  }

  /* randOdd(max);
     @param max: {int} a whole number greater than 1
     @return {int} a random odd number between 0 and max
  */
  static randOdd(max){
    return this._randMod(max,0);
  }

  /* randEven(max);
     @param max: {int} a whole number greater than 1
     @return {int} a random even number between 0 and max
  */
  static randEven(max){
    return this._randMod(max,1);
  }

  /* --- coordinate methods ------------------------------------------------- */

  /* makeCords(xMax, yMax, limits)
  @param xMax: {int} the max x value of the coordinates to be generated
  @param yMax: {int} the max y value of the coordinates to be generated
  @param limits: {string} "none", "odd", or "even"
  @return {object} and object keyed with x & y
  */
  static cords(xMax, yMax, limits="none"){
    if(limits === "none"){return {x: this.rand(xMax), y: this.rand(yMax)};}
    if(limits === "odd"){return {x: this.randOdd(xMax), y: this.randOdd(yMax)};}
    if(limits === "even"){return {x: this.randEven(xMax), y: this.randEven(yMax)};}
  }

  /* makeDimensions(coordinates)
  @param coordinates: {object} an x y keyed set of coordinates in an object
  @return {object}: a length and height keyed set of coordinates in an object
  */
  static dimensions(coordinates){
    return {width: coordinates.x, height: coordinates.y}
  }

  /* horizontal(start, end)
  @param start: {object} an x y keyed set of coordinates in an object
  @param end: {object} an x y keyed set of coordinates in an object
  @return: {object} the coridates that reprsents the horizontal midpoint
  */
  static horizontal(start, end){
    return this._getDif({start: start, end: end}, "x", "y");
  }

  /* vertical(start, end)
  @param start: {object} an x y keyed set of coordinates in an object
  @param end: {object} an x y keyed set of coordinates in an object
  @return: {object} the coridates that reprsents the horizontal midpoint
  */
  static vertical(start, end){
    return this._getDif({start: start, end: end}, "y", "x");
  }

  /* coordinateArray(start, end)
  @param start: {obj} an object with keys of x and y
  @param end: {obj} an object with keys of x and y
  @param exclude: {obj} an object with x and y keys to exclude from array
  @return: {array} an array of x & y keyed objects
  */
  static coordinateArray(start, end, exclude=undefined){
    var returnArray = [];
    for (var i = Math.min(start.x, end.x); i <= Math.max(start.x, end.x); i++) {
      for (var j = Math.min(start.y, end.y); j <= Math.max(start.y, end.y); j++) {
        if(exclude === undefined){ returnArray.push({x: i, y: j}); }
        else if(i !== exclude.x || j !== exclude.y){ returnArray.push({x: i, y: j}); }
      }
    }
    return returnArray;
  }

  /* collisionDectector(array1, array2)
  @param array1: {array} an array of objects with x and y keys
  @param array2: {array} an array of objects with x and y keys
  @return: {boolean} true or false for array collision.
  */
  static collisionDectector(array1, array2){
    for (var i = 0; i < array1.length; i++) {
      for (var j = 0; j < array2.length; j++) {
        if(array1[i].x === array2[j].x && array1[i].y === array2[j].y){
          return true;
        }
      }
    }
    return false;
  }

  /* collisionRemover(keep, change)
  @param keep: {array} the x & y keyed array to keep intact from collision
  @param change: {array} the array to be retificed from a collision.
  @return {array} an array of x & y keyed objects to replace change array
  */
  static collisionRemover(keep, change){
    var returnArray = [];
    for (var i = 0; i < change.length; i++) {
      var newObject = {x: change[i].x, y: change[i].y}
      if (!this.collisionDectector([newObject], keep)) {
        returnArray.push(newObject);
      }
    }
    return returnArray;
  }

/*
@param item:{string} needs to be a string
@param whitelist: {array} needs item
@param call = "whitelist" unless your calling somewhere esle
*/
  static whitelist(item, whitelist, call="whitelist"){
   item = this.typeCheck(item, "str", call);
   whitelist = this.typeCheck(whitelist, "array", call);
   if(whitelist.includes(item) == true){
     return item;
   }
   throw new Error("unexpected item " + item + " passed to method " + call + ".")
  }

}
