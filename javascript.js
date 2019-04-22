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
  ctx.innerHTML = dungeon.displayDungeon();
}
document.getElementById("newbtn").onclick = function(){ newMap(mapPackage); }
document.getElementById("blkmap").onclick = function(){ newMap(blankPackage);}

/*
function addRoom(size, map){
  map._makeRoom(size, Cell, " ", true);
  ctx.innerHTML = blankMap;
}



// button handlers for demo
document.getElementById("rmnbtn").onclick = function(){addRoom({max:10, min:3, area:100}, blankMap)}
*/
