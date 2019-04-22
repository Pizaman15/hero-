class Person{
  constructor(image, name, health, location, damage, inventory){
this._image = "hero";
this._name = "person";
this._health = {max: 100, current: undefined};
this._location = {x: undefined, y: undefined};
this._damage = {min: 1, max: 10};
this._inventory = [];
  }
  get image(){return image}
  set image(image){}
  get name(){return name}
  set name(name){}
  get health(){return health}
  set health(health){}
  get location(){return location}
  set location(location){}
  get damage(){return Utils.undefinedCheck(this._damage, "Dungeon.hero")}// need to have the protection error
  set damage(damage){Utils.protectionError("Person", "damage")}
  get inventory(){return Utils.undefinedCheck(this._inventory, "Dungeon.hero")}// need to have the protection error
  set inventory(inventory){Utils.protectionError("Person", "inventory")}
}
