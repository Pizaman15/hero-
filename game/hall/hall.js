/* requires utils.js (Utils) */
// add room type setter?

class Hall{
  constructor(start, end){
    this._start = Utils.typeCheck(start, "obj", "Hall constructor (start)");
    this._end = Utils.typeCheck(end, "obj", "Hall constructor (end)");

    // not input by user
    this._pivot = this._getPivot(this.start, this.end);
    this._coordinates = this._makeCoordinates(this.start, this.end, this.pivot);
  }

  /* _getPivot(start, end);
  @param start: {object} an object with keys of x and y
  @param end: {object} an object with keys of x and y
  @return {object} a corner for a hallway that preserves either the horizontal or vertical
  */
  _getPivot(start, end){
    if(start.x === end.x || start.y === end.y){ return "none"; }// no need
    var arc = Utils.rand(1);
    if(arc === 0){ return Utils.horizontal(start, end); }
    if(arc === 1){ return Utils.vertical(start, end); }
  }

  /* _makeCoordinates(start, end, pivot)
  @param start: {object} an object with x and y keys
  @param end: {object} an object with x and y keys
  @param pivot: {mixed} "none" or an object with x and y keys
  */
  _makeCoordinates(start, end, pivot){
    if (pivot === "none") { return Utils.coordinateArray(start, end); }
    var returnArray = Utils.coordinateArray(start, pivot); //include pivot
    returnArray = returnArray.concat(Utils.coordinateArray(pivot, end, pivot));
    return returnArray;
  }

  get start(){ return this._start; }
  set start(start){
    this._start = Utils.typeCheck(start, "obj", "Hall.start");
    this._pivot = this._getPivot(this.start, this.end);
    this._coordinates = this._makeCoordinates(this.start, this.end, this.pivot);
  }

  get end(){ return this._end; }
  set end(end){
    this._end = Utils.typeCheck(end, "obj", "Hall.end");
    this._pivot = this._getPivot(this.start, this.end);
    this._coordinates = this._makeCoordinates(this.start, this.end, this.pivot);
  }

  get pivot() { return this._pivot; }
  set pivot(value){ Utils.protectionError("Hall", "pivot"); }

  get coordinates() { return this._coordinates; }
  set coordinates(value){ Utils.protectionError("Hall", "coordinates"); }
}
