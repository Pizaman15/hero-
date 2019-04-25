class Hero{
  constructor(image, name, health, damage){
this._image = Utils.typeCheck(image, "str", "Hero.image");
this._name = Utils.typeCheck(name, "str", "Hero.image");
this._health = Utils.typeCheck(health, "obj", "Hero.health");
this._location = undefined;
this._damage = Utils.typeCheck(damage, "obj", "Hero.damage")
this._inventory = [];
  }

take(item){
this._inventory.push(item);
}

drop(item){
  for (var i = 0; i < this._inventory.length; i++) {
      if(this._inventory[i].name == item){
          return this._inventory.splice(i)[0];
    }
  }
}

_purge(){
this._inventory = [];
}
  get image(){ return this._image}
  set image(image){this._image = Utils.typeCheck(image, "str", "Hero.image");}

  get name(){ return this._name}
  set name(name){this._name = Utils.typeCheck(name, "str", "hero.name")}

 // if current is greatert than max than set current tO max
  get health(){ return this._health}
  set health(health){
    health = Utils.typeCheck(health, "obj", "Hero.health");
      if(health.current > health.max){health.current = health.max;}
      this._health = this.health;
}

  get location(){ return Utils.undefinedCheck(this._location, "Hero.location"); }
  set location(location){this._location = Utils.typeCheck(location, "obj", "Hero.location")}

  get damage(){ return Utils.undefinedCheck(this._damage, "Hero.damage");}// need to have the protection error
  set damage(damage){this._damage = Utils.protectionError("Hero", "damage");}

  get inventory(){ return Utils.undefinedCheck(this._inventory, "Hero.inventory");}// need to have the protection error
  set inventory(inventory){this._inventory = Utils.protectionError("Hero", "inventory");}

}
