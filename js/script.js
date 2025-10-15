// board1
// 28x36grid
//boards
//Constants
const boardAmount =1;
const cantPassThrough = ["blocked","redGhost", "blueGhost", "pinkGhost", "orangeGhost"]

//Variables
let userName;
let score;
let currentboard=0;
let pacman = {
	position: null,
	lives: null,
	lastdirection: null,
}
let pinkGhost = {
	position: null,
	spawn: null,
	target: null,
};
let blueGhost = {
	position: null,
	spawn: null,
	target: null,
};
let redGhost = {
	position: null,
	spawn: null,
	target: null,
};
let orangeGhost ={
	position: null,
	spawn: null,
	target: null,
};
let empowered;
let gameRun;
let beginChase;
let pixels = [];
let tunnelTiles;
let emptyTiles;
let boardSize = 868;
let imageLocation = "url('../assets/Pac-Man - All Assets_Palettes.png')";
//Cached Document Elements
const boardElement = document.querySelector("#display-board");
const mainElement = document.querySelector("main");
const nextBoardElem =  document.querySelector("#nextBoard");
const prevBoardElem =  document.querySelector("#previousBoard");
const playBoardElem =  document.querySelector("#playBoard");
const scoreElem  =  document.querySelector("#score");
const livesElem =  document.querySelector("#lives");

//Functions
const setTiles= ()=>{
for(let i=0; i<boardSize; i++){
    const tile = document.createElement("div");
    tile.id= `tile${i}`;
    tile.classList.add("tile");
    boardElement.appendChild(tile);
	pixels.push(i); 
}
boardElement.style.gridTemplateColumns = "auto ".repeat(28);
boardElement.style.gridTemplateRows = "auto ".repeat(30);

}
const removeTiles= ()=>{
	for(let i=0; i<boardSize; i++){
		const tile = document.querySelector(`#tile${i}`);
		tile.remove(); 
	}

}
const boardSelector = (board)=>{
	if(board === 0){
		boardLayout1();
	}else{

	}
}
const boardLayout1 = ()=>{
	const tiles = document.querySelectorAll(".tile");
	//verticalDoubleLinesFlexEnd 
	const  verticalDoubleLines = pixels.filter((pixel) =>{
		return (pixel%28===0 ||pixel%28===27 ||[58, 86, 114, ].includes(pixel)) && ![308, 336, 364, 448, 476, 335, 363, 391,420,447, 475, 503, 531].includes(pixel);
	} ).concat([
		// 313, 341, 369, 330, 358, 386, 453, 481, 509, 498, 526,
		285, 313, 341, 302, 330, 358, 453, 481, 470, 498, 509,526,

		//ghost spawn rectangle
		374,381,
		402, 409,
		430, 437,
		// 458, 465,
		// 397,425,453,414,442,470,537,565,593,582,610
	]);
	const horizontalDoubleLines = pixels.filter((pixel) =>{
		return pixel <28 ||pixel>840;
	}).concat([
		// 281, 282, 283, 284,
		253, 254, 255, 256, 
		// 303, 304, 305, 306,
		275,276, 277, 278,

		// 392, 393, 394, 395, 396, 414, 415, 416, 417, 418, 419, 448, 449, 450, 451, 452, 471, 472, 473, 474, 475, 533, 534, 535, 536, 554, 555, 556, 557, 558,
		364, 365, 366, 367, 368, 386, 387, 388, 389, 390, 391, 420, 421, 422, 423, 424, 443, 444, 445, 446, 447, 
		533, 534, 535, 536, 554, 555, 556, 557, 558,
		//ghostSpawnRectangle
		375, 376, , 379,380,
		431, 432, 433, 434, 435, 436,
		// 459, 460,461, 462, 463, 464,

		
	])

	// [ 393, 394, 395, 396, 415, 416, 417, 418, 476, 477, 478, 479, 480, 498, 499, 500, 501, 502, 503, 532, 533, 534, 535, 536, 555, 556, 557, 558, 559, 617, 618, 619, 620, 638, 639, 640, 641, 642]
	const horizontalSingleLines = [59, 60, 
		64, 65, 66, 
		73, 74, 75, 
		79, 80,
		115, 116, 
		120, 121, 122, 
		129, 130, 131,
		135, 136,
		171,172,
		199, 200,
		// uppper central t
		179,180, 181,182,183,184,
		207, 208, , 211, 212,
		
		//left upper t
		261,262,289, 290, 
		//right upper t
		269,270,297, 298,
		//right edge smaller box
		191, 192, 219, 220,

		//under ghost spawn upper t
		515,516,517, 518, 519, 520,
		543, 544,, 547, 548,

		// left of middle t small rectangle
		596, 597, 598, 
		624, 625, 626,
		// right of middle t small rectangle
		605, 606, 607, 
		633, 634, 635,
		// L right of middle t and right of small rectangle
		611, 612,
		640,
		//l left of middle t and left of small rectangle
		591,592,
		619,

		//bump on the far left 
		// 645, 646, 
		673, 674, 
		701,702,
		//bump on the far right
		// 669, 670, 
		697,698,
		725, 726,
		//bottom left assymetrical onject under left l
		// 731,732,733, 734,
		// 737,738,
		// 759,760,761,762, 763, 764, 764, 765, 766 
		759, 760, 761, 762, 
		765, 766,
		787, 788, 789, 790, 791, 792, 792, 793, 794,
		//bottom t
		683,684,685,686,687, 688,
		711,712,715,716,
		//bottom right asymmetric
		773,774, 
		777,778,779,780,
		801, 802, 803, 804, 805, 806, 807, 808
	]
	 
	tunnelTiles=[392, 419]
	emptyTiles = [
		//left
		87, 88,
		92,93, 94,

		280, 281, 282,283,284,
		308, 309, 310, 311, 312,
		336, 337, 338, 339, 340, 
		448, 449, 450, 451, 452, 
		476,477,478, 479,480,
		504,505, 506,507, 508,

		//ghostcage
		377,378, 
		403,408,

		//right
		101, 102, 103,
		107,108,
		303, 304, 305, 306,307,
		331, 332, 333, 334,335, 
		359, 360,361,362, 363, 

		471, 472, 473, 474, 475,
		499, 500,501, 502,503, 
		527,528,529,530,531
	];
	const verticalSingleLines =[
		41,69,97,125,
		42,70,98,126,
		58, 86, 114, 
		63, 91, 119,
		61, 89,117,
		67,95,123,
		72,100,128,
		76, 104, 132,
		78, 106, 134, 
		81, 109, 137,

		170, 198,
		173, 201,
		178,185,
		206, 213,
		209, 210,237,238,265,266,293,294,
		//left T after center
		175, 176, 203, 204,231,232, 259, 260,263,287, 288, 291,315, 316,343,344,371,372,
			// right T after center
		187, 188 ,215,216,243,244, 268,272,296, 300,327,328, 355,356 ,383,384,
		// rightedge smaller box
		190, 218, 193, 221,

		// in between the left hallway and right to ghost spawn
		427,428,
		455, 456,
		483, 484,
		511, 512,
		539, 540,

		// in between, lef to ghost spawn and right hallway
		439, 440,
		467, 468,
		495, 496,
		523, 524,
		551, 552,

		//middle t under ghost spawn
		514, 521,
		542, 549,
		545, 546,
		573, 574,
		601, 602,
		629, 630,

		// left of middle t small rectangle
		595, 599,
		623, 627,

		// right of middle t small rectangle
		604, 608,
		632, 636,

		// L right of middle t and right of small rectangle
		610, 613,
		638, 639,
		666, 667,
		694, 695,
		//l left of middle t and left of small rectangle
		590,593,
		620,621,
		648,649,
		676,677,

		//bottom left assymetrical onject under left l
		// 730,739,
		// 679, 680,
		// 707, 708,
		// 758,767,
		758, 767,
		707, 708,
		735, 736,
		786, 795,
		//bottom t under ghost spawn and other t
		// 654, 661, 682, 689, 685, 686, 713, 714, 741, 742, 769, 770
		682, 689, 710, 717, 713, 714, 741, 742, 769, 770, 797, 798,
		// bottom right asymmetric t
		719, 720,
		747, 748,
		772, 781,
		800, 809

	];
	const leftCornerDouble =[0, 274, 442, 532];
	const rightCornerDouble  = [27, 257, 425, 559];
	const bottomLeftCornerDouble  = [252, 386, 554, 840];
	const bottomRightCornerDouble  = [279, 369, 537, 867];
	tiles.forEach((tile, index)=>{
		// console.log(index);
		tile.removeAttribute("class");
		tile.classList.add("tile");
			//looping paths
			if(!(emptyTiles.includes(index) || tunnelTiles.includes(index))){
				const divider = document.createElement("div");
				//vertical dividers
				if(leftCornerDouble.includes(index) || rightCornerDouble.includes(index)|| bottomLeftCornerDouble.includes(index) || bottomRightCornerDouble.includes(index)){
					const smallerCorner =document.createElement("div");
					console.log("here")
					
					if(leftCornerDouble.includes(index)){
						divider.style.borderTop = "1px solid blue";
						smallerCorner.style.borderTop = "1px solid blue";
						divider.style.borderLeft ="1px solid blue";
						smallerCorner.style.borderLeft ="1px solid blue";
						tile.style.justifyContent = "flex-end";
						tile.style.alignItems= "flex-end";
						divider.style.borderTopLeftRadius = "3px";
						smallerCorner.style.height="5px";
						smallerCorner.style.width = "6px";
						divider.style.height = "9px";
						divider.style.width ="10px";
						smallerCorner.style.borderTopLeftRadius = "3px";
					}else if(rightCornerDouble.includes(index)){
						divider.style.borderTop = "1px solid blue";
						smallerCorner.style.borderTop = "1px solid blue";
						divider.style.borderRight ="1px solid blue";
						smallerCorner.style.borderRight = "1px solid blue";
						divider.style.borderTopRightRadius = "3px";
						smallerCorner.style.borderTopRightRadius = "3px";
						smallerCorner.style.height="5px";
						smallerCorner.style.width = "5px"
						divider.style.height = "9px";
						divider.style.width ="9px";
						tile.style.justifyContent= "flex-start";
						tile.style.alignItems= "flex-end";
					}else if(bottomLeftCornerDouble.includes(index)){
						divider.style.borderBottom = "1px solid blue";
						smallerCorner.style.borderBottom = "1px solid blue";
						divider.style.borderLeft ="1px solid blue";
						smallerCorner.style.borderLeft ="1px solid blue";
						smallerCorner.style.height="6px";
						smallerCorner.style.width = "6px";
						divider.style.height = "10px";
						divider.style.width ="10px";
						divider.style.borderBottomLeftRadius = "3px";
						smallerCorner.style.borderBottomLeftRadius = "3px";
						tile.style.alignItems= "flex-start";
						tile.style.justifyContent = "flex-end";
					}else{
						divider.style.borderBottom = "1px solid blue";
						smallerCorner.style.borderBottom = "1px solid blue";
						divider.style.borderRight ="1px solid blue";
						smallerCorner.style.borderRight = "1px solid blue";
						divider.style.borderBottomRightRadius = "3px";
						smallerCorner.style.borderBottomRightRadius = "3px";
						smallerCorner.style.height="6px";
						smallerCorner.style.width = "5px"
						divider.style.height = "10px";
						divider.style.width ="9px";
						tile.style.justifyContent= "flex-start";
						tile.style.alignItems= "flex-start";
					}
					
					
					
					
					// divider.style.borderRight = "1px solid blue";
					// divider.style.borderTopLeftRadius = "100%";
					// divider.style.borderTopRightRadius= "-100%"
					// divider.style.transform= "translate(-50%, -50%)";
					// divider.style.borderRadius = "2px"
					
					divider.style.zIndex = "0"
					
					smallerCorner.style.zIndex = "1"
					// divider.style.width = "3px";
					tile.appendChild(divider);
					divider.style.position = "absolute";
					tile.appendChild(smallerCorner);
					tile.classList.add("blocked");
					
					
				}else if(verticalDoubleLines.includes(index) ||verticalSingleLines.includes(index)){
					if(verticalSingleLines.includes(index)){
						divider.style.borderLeft = "1px solid blue";
						tile.style.justifyContent= "center"
						divider.style.height ="inherit";
					}else {
						divider.style.borderLeft = "1px solid blue";
						divider.style.borderRight = "1px solid blue";
						divider.style.height ="inherit";
						divider.style.width = "3px";
					}
					tile.appendChild(divider)
					tile.classList.add("blocked");
				}else if( horizontalDoubleLines.includes(index) || horizontalSingleLines.includes(index)){
					if(horizontalSingleLines.includes(index)){
						divider.style.borderTop="1px solid blue";
						divider.style.width = "inherit";
					}else{
						divider.style.borderTop="1px solid blue";
						divider.style.borderBottom ="1px solid blue";
						divider.style.height = "3px";
						divider.style.width = "inherit";
					}
					tile.appendChild(divider)
					tile.classList.add("blocked");
				}
				else if(index === 85 ||index ===110|| index === 645 || index === 670){
					tile.classList.add("powerPellet");
				}else if(index == 404){
					pinkGhost.spawn = index;
					pinkGhost.position = index;
					tile.classList.add("pinkGhost")
				}else if(index ==405){
					blueGhost.spawn =index;
					blueGhost.position = index;
					tile.classList.add("blueGhost")
				}else if(index == 406){
					redGhost.spawn = index;
					redGhost.position = index;
					tile.classList.add("redGhost")
					// ti
				}else if(index == 407){
					orangeGhost.spawn = index;
					orangeGhost.position =  index;
					tile.classList.add("orangeGhost")
				}else if(index == 657){
					pacman.spawn = index;
					pacman.position = index;
					tile.classList.add("pacman")
				}else{
						const dot = document.createElement("div");
						tile.classList.add("dot")
						tile.appendChild(dot);
				}
			}
			
		// }
	});
}
const calculateDistance = (objectPosition, targetPosition)=>{
	if(cantPassThrough.some( className => document.querySelector(`#tile${objectPosition}`).classList.contains(className))){
		return null;
	}else{
		const xObjectComponent = objectPosition%28;
		const yObjectComponent = Math.floor(objectPosition/28);
		const xTargetComponent = targetPosition%28;
		const yTargetComponent = Math.floor(targetPosition/28);

		return Math.sqrt(((xObjectComponent-xTargetComponent)**2) + ((yObjectComponent-yTargetComponent)**2))
	}
}
const ghostMoveCloser = (ghost, ghostname)=>{
	if(beginChase){
		const leftMove =  ghost.position -1;
		const rightMove =  ghost.position +1;
		const upMove =  ghost.position -28;
		const downMove =  ghost.position +28;
		const distanceArray = [];
		distanceArray.push(calculateDistance(leftMove, ghost.target));
		distanceArray.push(calculateDistance(rightMove, ghost.target ));
		distanceArray.push(calculateDistance(upMove, ghost.target));
		distanceArray.push(calculateDistance(downMove, ghost.target));
		let direction;
		if(!empowered){
			let minDistance = Number.MAX_SAFE_INTEGER;
			console.log(minDistance)
			distanceArray.forEach((distance, index)=>{
				if(distance !== null){
					if(distance < minDistance){
						minDistance = distance;
						direction = index;
					}
				}
			})
			console.log(minDistance)
		}else{
			let maxDistance = Number.MIN_SAFE_INTEGER;
			distanceArray.forEach((distance, index)=>{
				if(distance !== null){
					if(distance> maxDistance){
						maxDistance = distance;
						direction = index;
					}
				}
			})
		}
		// console.log(ghost.constructor.name)
		document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghostname}`);
		if(direction === 0){
			ghost.position = leftMove;
			document.querySelector(`#tile${ghost.position}`).classList.add(`${ghostname}`);
			if(ghost.position === pacman.position){
				loseLife()
			}
		}else if(direction === 1){
			ghost.position = rightMove;
			document.querySelector(`#tile${ghost.position}`).classList.add(`${ghostname}`);
			if(ghost.position === pacman.position){
				loseLife()
			}
		}else if(direction ===2){
			ghost.position = upMove;
			document.querySelector(`#tile${ghost.position}`).classList.add(`${ghostname}`);
			if(ghost.position === pacman.position){
				loseLife()
			}
		}else if(direction === 3){
			ghost.position = downMove;
			document.querySelector(`#tile${ghost.position}`).classList.add(`${ghostname}`);
			if(ghost.position === pacman.position){
				loseLife()
			}
		}else{
			if(ghost.position === pacman.position){
				loseLife()
			}
		}
	}
}

const loseSequence = ()=>{
	clearInterval(gameRun);
	prevBoardElem.style.visibility ="visible";
	nextBoardElem.style.visibility ="visible";
	playBoardElem.style.visibility ="visible";
}
const loseLife = ()=>{

	document.querySelector(`#tile${pacman.position}`).classList.remove("pacman", pacman.lastdirection);
	pacman.lives -=1
	if(pacman.lives <=0){
		loseSequence()
	}
	pacman.position = pacman.spawn;
	document.querySelector(`#tile${pacman.spawn}`).classList.add("pacman", pacman.lastdirection);
}
const playGame = ()=>{
	updatePostion();
	redGhost.target = pacman.position;
	blueGhost.target = pacman.position;
	pinkGhost.target = pacman.position;
	orangeGhost.target = pacman.position;
	ghostMoveCloser(redGhost, "redGhost");
	ghostMoveCloser(blueGhost, "blueGhost");
	ghostMoveCloser(pinkGhost, "pinkGhost");
	ghostMoveCloser(orangeGhost, "orangeGhost");
	scoreElem.textContent = score;
	livesElem.textContent = `x${pacman.lives}`
}
const updatePostion = ()=>{
	let proposedPosition;
	let modifier;
	const currentPosition =  document.querySelector(`#tile${pacman.position}`);
	console.log(pacman.position)
	if(pacman.lastdirection === "right"){
		
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position+1}`).classList.contains("blocked")){
			modifier =-27;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`)

		}else{
			modifier =1;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
		
	}else if(pacman.lastdirection === "left"){
		if( tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position-1}`).classList.contains("blocked")){
			modifier =+27;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`)

		}else{
			modifier = -1;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
		
		// proposedPosition.style.transform = "rotate(180deg)";
	}else if(pacman.lastdirection === "up"){
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position-28}`).classList.contains("blocked")){
			modifier = -boardSize;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);

		}else{
			modifier = -28;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
		
		// proposedPosition.style.transform = "rotate(270deg)";
	}else{
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position+28}`).classList.contains("blocked")){
			modifier = boardSize;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}else{
			modifier = 28;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
		// proposedPosition.style.transform = "rotate(90deg)";
	}
	console.log(`#tile${proposedPosition}`);
	if(proposedPosition.classList.contains("blocked")){
		// document.querySelector(`#tile${pacman.position}`).classList.remove("pacman");
		currentPosition.classList.remove("left", "right", "up", "down");
		currentPosition.classList.add(pacman.lastdirection);
		// currentPosition.style.
	}else{
			currentPosition.classList.remove("pacman","left", "right", "up", "down");
			
			if(proposedPosition.classList.contains("pinkGhost") || proposedPosition.classList.contains("redGhost") || proposedPosition.classList.contains("orangeGhost") || proposedPosition.classList.contains("blueGhost")){
				// currentPosition.classList.remove("pacman");
				loseLife()
			}else if(proposedPosition.classList.contains("dot")){
				score+=10;
				proposedPosition.classList.remove("dot");
				pacman.position = pacman.position+modifier;
				proposedPosition.classList.add("pacman", pacman.lastdirection)
			}else if(proposedPosition.classList.contains("powerPellet")){
				score+=50;
				proposedPosition.classList.remove("powerPellet");
				pacman.position = pacman.position+modifier;
				proposedPosition.classList.add("pacman", pacman.lastdirection)
			}else{
				pacman.position = pacman.position+modifier;
				proposedPosition.classList.add("pacman", pacman.lastdirection)
			}

	}
}

const init = ()=>{
	prevBoardElem.style.visibility ="hidden";
	nextBoardElem.style.visibility ="hidden";
	playBoardElem.style.visibility ="hidden";
	pacman.position = pacman.spawn;
	pacman.lives = 3;
	score = 0;
	beginChase = false;
	removeTiles();
	setTiles();
	boardSelector(0);
	document.addEventListener("keydown",(event)=>{
		console.log(event.key);
		// const 
		if(event.key === "ArrowRight" || event.key.toLowerCase() === "d"){
			pacman.lastdirection = "right";
		}else if(event.key === "ArrowLeft" || event.key.toLowerCase() === "a"){
			pacman.lastdirection = "left";
		}else if(event.key === "ArrowDown" || event.key.toLowerCase() === "s"){
			pacman.lastdirection = "down";
		}else if(event.key=== "ArrowUp" || event.key.toLowerCase() == "w"){
			pacman.lastdirection = "up";
		}
	});
	setTimeout(()=>{beginChase =true},3000);
	gameRun = setInterval(playGame, 500);
}

setTiles();
boardSelector(0);
//Eventlistener
nextBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard+1)%boardAmount;
	boardSelector(currentboard);
});
prevBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard-1)%boardAmount;

	boardSelector(currentboard);
});
playBoardElem.addEventListener("click", ()=>{
	init();
})

// console.log(boardElement);