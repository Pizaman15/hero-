class Item{
  constructor(image, name, type, index){
    this._name = Utils.typeCheck(name, "str", "item.name");
    this._image = Utils.typeCheck(image, "str", "item.image");
    this._type = Utils.typeCheck(type, "str", "item.type");
    this._index =  Utils.typeCheck(index, "int", "item.index");
  }
// make a internal function that does type checkand whitelist

  get name(){return this._name}
  set name(name){this._name = Utils.typeCheck(name, "str", "item.name")}
  get image(){return this._image}
  set image(image){this._image =  Utils.typeCheck(image, "str", "item.image" )}
  get type(){return Utils.whitelist(this._type, ["monster", "armor", "weapon", "treasure"], "item.type")}
  set type(type){this._type = Utils.typeCheck(type, "str", "item.type")}
  get index(){return this._index}
  set index(index){this._index =  Utils.typCheck(index, "int", "item.index")}

  toString(){return this.image}
}
