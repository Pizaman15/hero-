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
  }
}


                document.addEventListener("keyup", logkey);
                function logkey(e){
                  if(e.key == "End" || e.key == "1"){
                    keys("1");
                    updates.innerHTML = "hero moved southwest";
                    drawMap();
                    }
                  if(e.key == "ArrowDown" || e.key == "2"){
                    keys("2");
                      updates.innerHTML = "hero moved south";
                      drawMap();
                  }
                  if(e.key == "PageDown" || e.key == "3"){
                    keys("3");
                        updates.innerHTML = "hero moved south east";
                      drawMap();
                  }
                    if(e.key == "ArrowLeft" || e.key == "4"){
                      keys("4");
                      updates.innerHTML = "hero moved west";
                      drawMap();
                  }
                  if(e.key == "ArrowRight" || e.key == "6"){
                      keys("6");
                      updates.innerHTML = "hero moved east";
                      drawMap();
                  }
                  if(e.key == "Home" || e.key == "7"){
                    keys("7");
                      updates.innerHTML = "hero moved north west";
                      drawMap();
                  }
                  if(e.key == "ArrowUp" || e.key == "8"){
                    keys("8");
                      updates.innerHTML = "hero moved north";
                      drawMap();
                  }
                  if(e.key == "PageUp" || e.key == "9"){
                    keys("9");
                      updates.innerHTML = "hero moved north east";
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
