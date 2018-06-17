(function(){
	let mainContainer = document.getElementById("grid-container");
  let board = generateBoard(10);
  let offsets = {};
  let selectedIsland = "";
  offsets.dot = [{x: 0, y: 0}];
  offsets.square = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1},  {x: 0, y: 1}];
  offsets.atoll = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1},  {x: 1, y: 2}, {x: 0, y: 2}];
  offsets.s = [{x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}];
  offsets.l = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}];
  
   for(let i = 0; i < Object.keys(offsets).length; ++i){
     let type = Object.keys(offsets)[i]
     let island = document.querySelector(`[data-type=${type}]`);
     island.addEventListener("dragstart", onDragStart);
   }
   
   for(let i = 1; i <= 10; ++i){
  	for(let j = 1; j <= 10; ++j){
    	let square = document.createElement('div');
      square.className = "box";
      square.setAttribute("data-row", i);
      square.setAttribute("data-column", j);
      square.addEventListener("dragover", onDragOver);
      square.addEventListener("dragleave", onDragLeave);
      square.addEventListener("drop", onIslandDropped);
      board[i][j] = square;
      mainContainer.appendChild(square);
    }
  }

  function onDragStart(ev) {
    let islandType = ev.target.dataset.type;
    selectedIsland = islandType;
    ev.dataTransfer.setData("type", islandType);
  }

  function onDragOver(ev) {
    ev.preventDefault();
    highlightPlacementArea(ev);
  }

  function onDragLeave(ev) {
    ev.preventDefault();
    removePlacementAreaHighlight(ev); 
  }

  function onIslandDropped(ev) {
    ev.preventDefault();
    let islandOffsets = offsets[ev.dataTransfer.getData("type")];
    let startingY = parseInt(ev.target.dataset.row);
    let startingX = parseInt(ev.target.dataset.column);
    for(let i = 0; i < islandOffsets.length; ++i) {
      let offset = islandOffsets[i];
      let posY = startingY + offset.y;
      let posX = startingX + offset.x;
      if(posY > 10 || posX > 10) { 
        removePlacementAreaHighlight(ev);
        break;
      }   
      board[posY][posX].style.background = "blue";
    }
    selectedIsland = "";
  }
  
  function generateBoard(rows) {
    let board = []
    for(let i = 1; i <= rows; ++i){
      board[i] = []
    }
    return board;
  }
  
  function highlightPlacementArea(ev) {
    let islandOffsets = offsets[selectedIsland];
    let startingY = parseInt(ev.target.dataset.row);
    let startingX = parseInt(ev.target.dataset.column);
    for(let i = 0; i < islandOffsets.length; ++i) {
      let offset = islandOffsets[i];
      let posY = startingY + offset.y;
      let posX = startingX + offset.x;
      if(posY > 10 || posX > 10) { 
        break;
      }   
      board[posY][posX].style.background = "rgba(0, 255, 0, 0.3)";
    }
  }

  function removePlacementAreaHighlight(ev) {
    let islandOffsets = offsets[selectedIsland];
    let startingY = parseInt(ev.target.dataset.row);
    let startingX = parseInt(ev.target.dataset.column);
    for(let i = 0; i < islandOffsets.length; ++i) {
      let offset = islandOffsets[i];
      let posY = startingY + offset.y;
      let posX = startingX + offset.x;
      if(posY > 10 || posX > 10) { 
        break;
      }   
      board[posY][posX].style.background = "";
    }
  }
})();