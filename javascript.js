var ctx = document.getElementById('map');
ctx.innerHTML = "Context defined";

/* Inital conditions and starting map generation.  */
var mapPackage = {name: "The Ultimate Map",
                  size: {width: 75, height: 50},
                  tile: Cell,
                  fill: "#",
                  room: {max:{width: 15, height: 15},
                         min:{width: 5, height: 5}},
                  roomDensity: .2,
                  hallDensity: 1.4}
var blankPackage = {name: "The Blank Map",
                    size: {width: 75, height: 50},
                    tile: Cell,
                    fill: "#",
                    room: {max:{width: 15, height: 15},
                          min:{width: 5, height: 5}},
                    roomDensity: 0,
                    hallDensity: 1.4}
var heroPackage = {image: "@",
                   name: "derf",
                   health: {max:10, current:10},
                   damage: {min:2, max:5}}

function keys(key){
  var cord = dungeon._keyToMove(key);
  if(dungeon.map.cell[cord.y][cord.x].open){
    dungeon.hero.location = cord;
    return true;
  }
  return false;
}

                document.addEventListener("keyup", logkey);
                function logkey(e){
                  if(e.key == "End" || e.key == "1"){
                    if(keys("1")) {
                    updates.innerHTML = dungeon.hero.name + "moved southwest";
                  }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                  drawMap();
                }
                  if(e.key == "ArrowDown" || e.key == "2"){
                    if(keys("2")){
                      updates.innerHTML = dungeon.hero.name + " moved south";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                  if(e.key == "PageDown" || e.key == "3"){
                    if(keys("3")){
                        updates.innerHTML = dungeon.hero.name + " moved south east";
                      }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                      drawMap();
                  }
                    if(e.key == "ArrowLeft" || e.key == "4"){
                      if(keys("4")){
                      updates.innerHTML = dungeon.hero.name + " moved west";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                  if(e.key == "ArrowRight" || e.key == "6"){
                      if(keys("6")){
                      updates.innerHTML = dungeon.hero.name + " moved east";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                  if(e.key == "Home" || e.key == "7"){
                    if(keys("7")){
                      updates.innerHTML = dungeon.hero.name + " moved north west";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                  if(e.key == "ArrowUp" || e.key == "8"){
                    if(keys("8")){
                      updates.innerHTML = dungeon.hero.name + " moved north";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                  if(e.key == "PageUp" || e.key == "9"){
                    if(keys("9")){
                      updates.innerHTML = dungeon.hero.name + " moved north east";
                    }else{updates.innerHTML = dungeon.hero.name + " hit a wall";}
                    drawMap();
                  }
                }

var dungeon = new Dungeon;
dungeon.initalizeDungeon(mapPackage);
ctx.innerHTML = dungeon.displayDungeon();
/* End of inital conditions. */

/* drawMap()
return: none. Simply an event handler to redraw the current map display.
*/
function drawMap(){
  ctx.innerHTML = dungeon.displayDungeon();

}
document.getElementById("drwbtn").onclick = function(){ drawMap(); }

/* newMap(conditions)
@param conditions: {object} a mapPackage object.
@return: none.
*/
function newMap(conditions){
  dungeon.initalizeDungeon(conditions);
  dungeon._initHero(heroPackage);
  dungeon._placeHero();
  ctx.innerHTML = dungeon.displayDungeon();
}
document.getElementById("newbtn").onclick = function(){ newMap(mapPackage);}
document.getElementById("blkmap").onclick = function(){ newMap(blankPackage);}
document.getElementById("updates").onclick = function(){}

/*
function addRoom(size, map){
  map._makeRoom(size, Cell, " ", true);
  ctx.innerHTML = blankMap;
}



// button handlers for demo
document.getElementById("rmnbtn").onclick = function(){addRoom({max:10, min:3, area:100}, blankMap)}
*/
