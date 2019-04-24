/* requires map.js (Map), room.js (Room), utils.js (Utils), hall.js (Hall),
   cell.js (Cell) and any additional dependancies that they have. This class
   builds the map from the map class and will do other task as it is expanded.
*/


class Dungeon {
  constructor(hero) {
    this._name = undefined; // pulled from the map if not overridden
    this._namePosition = "top";
    this._nameFromMap = true;
    this._map = undefined;
    this._trim = {bottom: "-", top: "-", sides: "|", corners:["+", "+", "+", "+"]};
    this._hero = undefined;
    // corners: tl -> tr ->bl -> br
  }

  /* _startTrim(width, position, name)
  @param width: {int} the width of the top pannel minus corners
  @param position: {string} if it is the "top" or "bottom"
  @param name: {string} a name to be displayed on the pannel
  @reutrn: {string} a string decorated with items from _trim
  */
  _startTrim(width, position="top", name=null){
    position = position.toLowerCase();  //shouldn't reall need this for internal, but better safe than sorry
    if(position === "top"){ var elements = [this.trim.corners[0], this.trim.corners[1], this.trim.top]; }
    if(position === "bottom") { var elements = [this.trim.corners[2], this.trim.corners[3], this.trim.bottom];}
    var trim = elements[0];

    if(name !== null && name.length < width) {

      var half = Math.floor((width - name.length)/2);
      for (var i = 0; i < half; i++) { trim += elements[2]; }

      trim += name;

      if(width - name.length !== half * 2){ half += 1; } // if uneven
      for (var i = 0; i < half; i++) { trim += elements[2]; }
    }

    else { for (var i = 0; i < width; i++) { trim += elements[2]; } }

    return trim + elements[1] + "<BR>";
  }

  /* _edgeTrim(line)
  @param line: {string} A line of text to be decorated with time.sides and a <BR>
  @return: {string} the modified string.
  */
  _edgeTrim(line){
    return this.trim.sides + line + this.trim.sides + "<BR>";
  }

  /* _endTrim(width, position, name) - A Wrapper for _startTrim
  @param width: {int} the width of the top pannel minus corners
  @param position: {string} if it is the "top" or "bottom"
  @param name: {string} a name to be displayed on the pannel
  @return: {string} a string decorated with items from _trim
  */
  _endTrim(width, position="bottom", name=null){
    return this._startTrim(width, position, name);
  }

  _initHero(heroPackage){
this.hero = new Hero(heroPackage);
  }
  /* displayDungeon()
  @return: {string} a string representation of the map property.
  */

  displayDungeon(){
    var map = this.map; // to allow for the getter to do the undefined check
    var output = "";

    // Breaks access restrictions internally for this and end for name
    if(this.namePosition == "top" && this._name !== undefined ){  // top
      output += this._startTrim(map.width, "top", this.name);
    }  else { output += this._startTrim(map.width); }

    for (var i = 0; i < map.map.length; i++) { // body y array
      var line = "";
      for (var j = 0; j < map.map[i].length; j++) { // body x array
        line += map.map[i][j];
      }
      output += this._edgeTrim(line);
    }

    if(this.namePosition == "bottom" && this._name !== undefined ){  // end
      output += this._endTrim(map.width, "bottom", this.name);
    }  else { output += this._endTrim(map.width); }

    return output;
  }

  /* initalizeDungeon(mapPackage)
  A function to initalize the dungeon with a map. The format of the object to be
  Passed to it is as follows {name:str, size:{width:int, height:int}, tile:class
  fill:str, room:{min:{width:int, height:int}, max:{width:int, height:int}}
  roomDensity:float, hallDensity:float}
  @param mapPackage:{object} An object with information for inital dungeon construction
  @return: none
  */
  initalizeDungeon(mapPackage){
    this.map = new Map(mapPackage);
    this.map.makeMap(mapPackage.room, mapPackage.roomDensity, mapPackage.hallDensity);
  }

  get name(){ return Utils.undefinedCheck(this._name, "Dungeon.name"); }
  set name(name){ this._name = Utils.typeCheck(name, "str", "Dungeon.name"); }

  get namePosition(){ return this._namePosition; }
  set namePosition(name){ this._namePosition = Utils.typeCheck(name, "str", "Dungeon.namePosition"); }

  get nameFromMap(){ return this._nameFromMap; }
  set nameFromMap(bool){ this._nameFromMap = Utils.typeCheck(name, "bool", "Dungeon.nameFromMap"); }

  get map(){ return Utils.undefinedCheck(this._map, "Dungeon.map"); }
  set map(map){
    this._map = Utils.typeCheck(map, "obj", "Dungeon.map");
    if(this.nameFromMap){ this.name = map.name; }
  }

  get trim(){ return this._trim; }
  set trim(obj){ this._trim = Utils.typeCheck(obj, "obj", "Dungeon.trim"); }

  get hero(){return Utils.undefinedCheck(this._hero, "Dungeon.hero"); }
  set hero(hero){Utils.protectionError("Dungeon", "hero"); }
}
