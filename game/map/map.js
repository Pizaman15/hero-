/* requires util.js (Util), cell.js (Cell), hall.js (Hall), room.js (Room) */

class Map{
  constructor(data){
    this._name = this._dataCheck(data.name, "str");
    this._width = this._dataCheck(data.size.width, "int");
    this._height = this._dataCheck(data.size.height, "int");
    this._tile = this._dataCheck(data.tile, "class"); // remove or un-hardcode Cell?
    this._fill = this._dataCheck(data.fill, "str");

    // not input by user at time of construction
    this._rooms = []; // room objects will have attribs and a list of locations
    this._halls = []; // halls have numbers of rooms connected, attibs, cells.
    this._cells = this._initMap(this.size, this.fill) // the whole map
    this._cycles = 100; // cycles for room maker

  }

  /* _dataCheck(item, type)
     A wrapper for Utils.typeCheck so it gives output that is good for the data object.
     @param item: {mixed} the item to be checked for being of type type.
     @param type: {string} the type for item to be checked for.
     @return mixed: the item if it passes check.
  */
  _dataCheck(item, type){
    try{ var retVal = Utils.typeCheck(item, type, "Map constructor"); }
    catch(e){
      e += "The Map class constructor expects an object of the format: ";
      e += "{name: str, size: {width: int, height: int}, tile: Class, fill:str}. ";
      e += "One or more part of this object failed to pass type checking or was ";
      e += "not present in the starting data object.";
      throw new Error(e);
    }
    return retVal;
  }


  /* _initMap(size, fill)
  @param size: {object} a width and height keyed object
  @param fill: {string} a string or string literal that will be the base cell
  @return: {array} a 2d array of cells all set to fill value
  */
  _initMap(size, fill){
    var cells = [];
    for (var i = 0; i < size.height; i++) {
      cells[i] = [];
      for (var j = 0; j < size.width; j++) {
        cells[i][j] = new this.tile(fill);
      }
    }
    return cells;
  }

  /* _fillMap(map)
  @param map: {array} the template array of array of cells
  @return: {array} returns an array filled with arrays cell objects
  */
  _fillMap(map, debug=false){
    for (var i = 0; i < this.rooms.length; i++) { // start with the rooms.
      for(var j = 0; j < this.room[i].coordinates.length; j++){
        var loc = this.room[i].coordinates[j];
        this.cell[loc.y][loc.x].name = " ";
        if(debug){ this.cell[loc.y][loc.x].name = i+""; }
        this.cell[loc.y][loc.x].type = "room";
      }
    }

    for (var i = 0; i < this.halls.length; i++) { // add the halls
      for (var j = 0; j < this.hall[i].coordinates.length; j++) {
        var loc = this.hall[i].coordinates[j];
        if (this.cell[loc.y][loc.x].type !== "room") { // so halls are not in rooms
          this.cell[loc.y][loc.x].name = " ";
          this.cell[loc.y][loc.x].type = "hall";
        }
      }
    }
  }

  /* _makeRoom(max, min)
  @param max: {object} An object with width and height keys for room
  @param min: {object} An object with width and height keys for room
  @param limits: {object} odd, even, or none - room and placement keys
  @return: {object} An object of class Room
  */
  _makeRoom(max, min={width:3, height:3}, limits={room: "odd", placement: "odd"}){
    max.width -= min.width;  // because my odd number function always has a
    max.height -= min.height; // 0 base, subtract down to 0

    var size = Utils.cords(max.width, max.height, limits.room); // get numbers
    size = Utils.dimensions(size); // fix keys
    size.width += min.width; // add the min back in to get the right range
    size.height += min.height;

    var location = {xMax: this.width - size.width, yMax: this.height - size.height};
    var location = Utils.cords(location.xMax, location.yMax, limits.placement);

    max.width += min.width;  // set these back because they are objects and
    max.height += min.height;  // objects persist.

    return new Room(location, size);
  }

  /* _makeHall(start, end)
  @param start: {object} an x and y keyed object.
  @param end: {object} an x and y keyed object.
  @return: {object} An object of class Hall
  */
  _makeHall(start, end){ // just an internal wrapper for hall class constructor
    return new Hall(start, end);
  }

  getOpen(type){
    type = Utils.whitelist(type, ["room", "hall", "all"], "getOpen");
    var cords = [];
    var hall = false;
    var room = false;
      if( type == "hall" || type == "all"){ hall = true};
      if( type == "room" || type == "all"){ room = true};
        for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
      if(hall == true && this._cells[i][j].type == "hall"){cords.push({x:j,y:i})};
      if(room == true && this._cells[i][j].type == "room"){cords.push({x:j,y:i})};
      }
    }
    return cords;
  }

  open(coordinates, diagonal = true){
    coordinates = Utils.typeCheck(coordinates, "obj", "map.open");
    diagonal = Utils.typeCheck(diagonal, "bool", "map.open");
    var openArr = [{x:coordinates.x + 1, y:coordinates.y},{x:coordinates.x-1, y:coordinates.y},
      {x:coordinates.x, y:coordinates.y+1},{x:coordinates.x, y:coordinates.y-1}];

      var openArrDiag = [{x:coordinates.x+1, y:coordinates.y+1},{x:coordinates.x-1, y:coordinates.y-1},
        {x:coordinates.x+1, y:coordinates.y-1},{x:coordinates.x-1, y:coordinates.y+1}];

        if(diagonal == true){openArr = openArr.concat(openArrDiag);}
        var returnOpen = [];
        for (var i = 0; i < openArr.length; i++) {

          if(this.map[openArr[i].y][openArr[i].x].open){
            returnOpen.push(openArr[i]);
          }
        }
        return returnOpen;
      }

  /* wipeMap()
  Wipes the map. Breaks access rules by nessicity
  @return: none
  */
  wipeMap(){
    this._rooms = [];
    this._halls = [];
    this._cells = [];
    this._cells = this._initMap(this.size, this.fill);
  }

  /* makeMap(room:{max:{width, height} min:{width, height}}, roomDensity:Num, hallDensity:Num)
  @param room: {object} an object keyed with max and min to constrain room dimensions
    both of these keys are further objects with width and height keys
  @param roomDensity: {float} a number to mutliply the room generator cycles by.
  @param hallDensity: {float} a number to multiply the hall generator cycles by.
  @return: none. This function populates the interal object arrays rooms & halls
  */
  makeMap(room, roomDensity=1, hallDensity=1){
    this.wipeMap();
    room = Utils.typeCheck(room, "obj", "Map.makeMap");
    roomDensity = Utils.typeCheck(roomDensity, "number", "Map.makeMap");
    hallDensity = Utils.typeCheck(hallDensity, "number", "Map.makeMap");

    var cycles = Math.floor(this.cycles * roomDensity); // how many trys
    var centers = {first: null, second: null}; // for adding halls during construction

    for (var i = 0; i < cycles; i++) { // primary construction loop.

      var testRoom = this._makeRoom(room.max, room.min); // pass limits when setter implmented
      var addRoom = true; // base case

      for (var j = 0; j < this.rooms.length; j++) { // check for room overlap
        // only check if it has not been found false.
        if(addRoom){ addRoom = !Utils.collisionDectector(testRoom.coordinates, this.rooms[j].coordinates); }
      }

      if (addRoom) { // clear of overlap
        this.rooms.push(testRoom); // add the room to the array
        centers.first = centers.second; //update the hall values
        centers.second = testRoom.center;
        if(centers.first !== null){ this.halls.push(this._makeHall(centers.first, centers.second)); }
      }
    }

    var extraHalls = Math.floor(this.halls.length * hallDensity) - this.halls.length; // add extra halls after
    while(extraHalls > 0){ // this will allow for halls to be place where there are already halls.
      var rooms = Utils.manyRand(0, this.rooms.length -1, 2);
      centers.first = this.room[rooms[0]].center;
      centers.second = this.room[rooms[1]].center;
      this.halls.push(this._makeHall(centers.first, centers.second));
      extraHalls --;
    }
    // add rooms and hallways to the actual cell list.
    this._fillMap(this._cells);
  }

  set name(str){ this._name = Utils.typeCheck(str, "str", "Map.name"); }
  get name(){ return this._name; }

  set size(obj){ this._width = Utils.typeCheck(obj.width, "int", "Map.size"); }
  get size(){return {width: this.width, height: this.height}; }

  set width(int){ this._width = Utils.typeCheck(int, "int", "Map.width"); }
  get width(){ return this._width; }

  set height(int){ this._heigth = Utils.typeCheck(int, "int", "Map.height"); }
  get height(){ return this._height; }

  set tile(cls){ this._tile = Utils.typeCheck(cls, "class", "Map.width"); }
  get tile(){ return this._tile; }

  set fill(str){ this._fill = Utils.typeCheck(str, "str", "Map.width"); }
  get fill(){ return this._fill; }

  set rooms(dont_set){ Utils.protectionError("Map", "rooms"); }
  get rooms(){ return this._rooms; }

  set halls(dont_set){ Utils.protectionError("Map", "halls"); }
  get halls(){ return this._halls; }

  set cells(dont_set){ Utils.protectionError("Map", "cells"); }
  get cells(){ return this._cells; }

  set cycles(int){ this._cycles = Utils.typeCheck(int, "int", "Map.cycles"); }
  get cycles(){ return this._cycles; }

  // Will get and set both with dot format calls.
  get room(){ return this._rooms; }
  get hall(){ return this._halls; }
  get cell(){ return this._cells; }
  get map() { return this._cells; }

}
