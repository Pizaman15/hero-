/* requires: utils.js (Utils) */

//add room type setter?
class Room{
  constructor(location, size, network=false){
    this._location = Utils.typeCheck(location, "obj", "Room constructor (location)"); // x y
    this._size = Utils.typeCheck(size, "obj", "Room constructor (size)"); // width height
    this._network = Utils.typeCheck(network, "bool", "Room constructor (network)"); // boolean

    // not input by user at time of construction
    this._center = this._findCenter(this.location, this.size); // x y
    this._corners = this._findCorners(this.location, this.size); // x y
    this._coordinates = this._makeCoordinates(this.corners); // x y
  }

  /* _findCeter(location, size)
  @param location: {object} an object with x & y keys
  @param size: {object} an object with width & height keys
  @return: {object} an object with keys of x & y
  */
  _findCenter(location, size){ // this is floored because we aren't starting outside
    var offsetX = Math.floor(size.width/2); // the range, so we are esentally
    var offsetY = Math.floor(size.height/2);// starting at the first item and adding
    return {x: location.x + offsetX, y: location.y + offsetY};// to it.
  }

  /* _findCorners(location, size)
  @param location {obj}: an object with x and y keys
  @param size {obj}: an object with width and height keys
  @return {obj}: an object with object keys of startpoint and endpoint
  */
  _findCorners(location, size){
    var endpoint = {x: location.x + size.width -1, y: location.y + size.height -1};
    return {startpoint: location, endpoint: endpoint};
   }

   /* _makeCoordinates(corners)
   @param corners: {obj} an object with keys of startpoint & endpoint
   @return: {array} an array of x & y keyed objects
   */
  _makeCoordinates(corners){
    return Utils.coordinateArray(corners.startpoint, corners.endpoint);
  }

  /* inRoom(location)
  @param location: {obj} an object keyed with x & y
  @return: {boolean} true or false as to if the coordinates are in the room
  */
  inRoom(location){
    location = Utils.typeCheck(location, "obj", "Room.inroom");
    for (var i = 0; i < this.coordinates.length; i++) {
      var current = this.coordinates[i];
      if (current.x === location.x && current.y === location.y) {return true;}
    }
    return false;
  }

  get location(){ return this._location; }
  set location(location){
    this._location = Utils.typeCheck(location, "obj", "Room.location");
    this._center = this._findCenter(this.location, this.size);
    this._corners = this._findCorners(this.location, this.size);
    this._coordinates = this._makeCoordinates(this.corners);
  }

  get size(){ return this._size; }
  set size(size){
    this._size = Utils.typeCheck(size, "obj", "Room.size");
    this._center = this._findCenter(this.location, this.size);
    this._corners = this._findCorners(this.location, this.size);
    this._coordinates = this._makeCoordinates(this.corners);
  }

  get network(){ return this._network; }
  set network(network){ this._network = Utils.typeCheck(network, "bool", "Room.network");}

  get center(){ return this._center; }
  set center(value){ Utils.protectionError("Room", "center"); }

  get corners(){ return this._corners; }
  set center(value){ Utils.protectionError("Room", "corners"); }

  get coordinates(){ return this._coordinates; }
  set center(value){ Utils.protectionError("Room", "coordinates"); }

}
