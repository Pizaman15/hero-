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
    this._inventory = [];
  }
  add(item){
  this._inventory.push(item);
  }

  remove(item){
    for (var i = 0; i < this._inventory.length; i++) {
        if(this._inventory[i].name == item){
            return this._inventory.splice(i)[0];
      }
    }
  }

  _purge(){
  this._inventory = [];
  }


  _isBorder(type){ return type.toLowerCase() === "border"; }

  _isRoom(type){ return this._roomList.indexOf(type.toLowerCase()) > -1; }

  get inventory(){ return Utils.undefinedCheck(this._inventory, "Person.inventory");}// need to have the protection error
  set inventory(inventory){this._inventory = Utils.protectionError("Person", "inventory");}

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

  get open(){
  if(this.type == "room" || this.type == "hall"){return true;}
  return false;
}


  toString(){
  if(this.inventory.length == 0){return this.name;}
  var itemIndex = 0;
  var highestValue = 0;
    for (var i = 0; i < this.inventory.length; i++) {
      if(this.inventory[i].index > highestValue){
          itemIndex = i;
          highestValue = this.inventory[i].index;
    }
  }
  var returnString =  this.inventory[itemIndex] + "";
  return this.inventory[itemIndex] + "";
 }
}
