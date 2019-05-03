class Item(){
  constructor(name, image, type, index){
    this._name = "";
    this._image = "";
    this._type = "";
    this._index = undefined;
  }

  get(){return this.name}
  set(name){this.name = Utils.typeCheck(this._name, "str", "cell.item")}
  get(){return this.image}
  set(image){this.image =  Utils.typeCheck(this._image, "str", "cell.image" )}
  get(){return Utils.whitelist(this.type, ["monster", "armor", "weapon", "treasure"])}
  set(type){this.type = Utils.typeCheck(this._type, "str", "cell.type")}
  get(){return Utils.undefinedCheck(this.index, "call.index")}
  set(index){this.index =  Utils.typCheck(this._index, "int", "cell.index")}
}
