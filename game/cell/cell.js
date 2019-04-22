/* requires: utils.js (Utils)*/


class Cell{
  constructor(name, type="wall", network=false){
    this._name = Utils.typeCheck(name, "str", "Cell Constructor (name)");
    this._type = Utils.typeCheck(type, "str", "Cell Constructor (type)");
    this._network = Utils.typeCheck(network, "bool", "Cell Constructor (network)");

    // not input by user at time of consreuction
    this._roomList = ["room", "hall", "border"];
    this._border = this._isBorder(type);
    this._room = this._isRoom(type);
  }

  _isBorder(type){ return type.toLowerCase() === "border"; }

  _isRoom(type){ return this._roomList.indexOf(type.toLowerCase()) > -1; }

  get name(){ return this._name; }
  set name(str){ this._name = Utils.typeCheck(str, "str", "Cell.name"); }

  get type(){ return this._type; }
  set type(type){
    this._type = Utils.typeCheck(type, "str", "Cell.name");
    this._border = this._isBorder(type);
    this._room = this._isRoom(type);
  }

  get network(){ return this._network; }
  set network(bool){ this._network = Utils.typeCheck(bool, "bool", "Cell.network"); }

  toString(){ return this.name; }

}
