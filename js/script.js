// board1
// 28x36grid
//boards
//Constants
const boardAmount =1;


//Variables
let userName;
let score;
let currentboard=0;
let pacman = {
	xPosition: null,
	yPosition: null,
	lives: null,
	lastdirection: null,
}
let pinkghost = {
	xPosition: null,
	yPosition: null,
};
let blueghostposition = {
	xPosition: null,
	yPosition: null,
};
let redghostposition = {
	xPosition: null,
	yPosition: null,
};
let orangeghostposition ={
	xPosition: null,
	yPosition: null,
};
let gameRun;
let timeelapsed;

//Cached Document Elements
const boardElement = document.querySelector("#display-board");
const mainElement = document.querySelector("main");
const nextBoardElem =  document.querySelector("#nextBoard");
const prevBoardElem =  document.querySelector("#previousBoard");
const playBoardElem =  document.querySelector("#playBoard")
//Functions
const setTiles= ()=>{
for(let i=0; i<1008; i++){
    const tile = document.createElement("div");
    tile.id= `tile${i}`;
    tile.classList.add("tile");
    boardElement.appendChild(tile);
}
boardElement.style.gridTemplateColumns = "auto ".repeat(28);
boardElement.style.gridTemplateRows = "auto ".repeat(36);

}
const boardSelector = (board)=>{
	if(board === 0){
		boardLayout1();
	}else{

	}
}
const boardLayout1 = ()=>{
	const tiles = document.querySelectorAll(".tile");
	tiles.forEach((tile, index)=>{
		console.log(index);
		tile.removeAttribute("class");
		tile.classList.add("tile");
		// if(index<28||index%28==0 || index%28 ===27 || index>=980 ||(index>= 393 && index<=396)||( index=== 397||index=== 425 ||index === 453 )||(index >=477 && index <=481)||(index >= 500 && index <=502 )||( index>= 533 && index<=535 )||( index<= 558 && index >=556)){
			//looping paths
			if(!(index===420||index===448 ||index==504 || index==504+27)){
				const divider = document.createElement("div");
				//vertical dividers
				if((index%28==0 || index%28 ===27 ||( index=== 397||index=== 425 ||index === 453) ||(index == 414 || index ==442||index ===470)||(index ===537|| index=== 565||index ==593) ||(index ==582||index===610)) && !(index ===447|| index === 475||index ===476 || index === 503 || index === 532|| index === 559 || index === 560 || index === 587 || index===588 ||index === 615)){
					divider.style.borderLeft = "1px solid blue";
					divider.style.borderRight = "1px solid blue";
					divider.style.height ="inherit";
					divider.style.width = "3px";
				}else if(index<28 || index>=980 || (index>= 393 && index<=396) || (index >=476 && index <=480) || (index >=415 && index<=419)||(index >= 498 && index <=503 ) ||( index>= 532 && index<=536 )  || (index >=555 && index<= 559 ) ||(index>=616 && index<=620)||(index>=638 && index<=642)){
					//horizontal dividers
					divider.style.borderTop="1px solid blue";
					divider.style.borderBottom ="1px solid blue";
					divider.style.height = "3px";
					divider.style.width = "inherit";
					// tile.style.alignItems ="center";
				}else{

				}
				// divider.style.borderLeft = "1px solid blue";
				// divider.style.borderRight = "1px solid blue";
				// divider.style.length ="inherit";
				// divider.style.width = "3px"
				tile.appendChild(divider)
				tile.classList.add("blocked");
			}
			
		// }
	});
}

setTiles();

//Eventlistener
nextBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard+1)%boardAmount;
	boardSelector(currentboard);
});
prevBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard-1)%boardAmount;

	boardSelector(currentboard);
});


// console.log(boardElement);