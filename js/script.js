
//boards
//Constants
const boardAmount =1;
const cantPassThrough = ["blocked","pinkGhostLeft", "pinkGhostUp","pinkGhostDown","pinkGhostRight", 
	"blueGhostLeft", "blueGhostRight", "blueGhostUp", "blueGhostDown",
	"pinkGhostLeft", "pinkGhostRight", "pinkGhostUp", "pinkGhostDown",
	"orangeGhostLeft", "orangeGhostRight", "orangeGhostUp", "orangeGhostDown"]


//Variables
let userName;
let score;
let step = 0
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
	animation: "Up",
};
let blueGhost = {
	position: null,
	spawn: null,
	target: null,
	animation: "Up",
};
let redGhost = {
	position: null,
	spawn: null,
	target: null,
	animation: "Up",
};
let orangeGhost ={
	position: null,
	spawn: null,
	target: null,
	animation: "Up",
};
let empowered;
let gameRun;
let beginChase;
let pixels = [];
let currentlyDead  = [];
let redDeathTimer;
let blueDeathTimer;
let pinkDeathTimer;
let orangeDeathTimer;
let tunnelTiles;
let emptyTiles;
let boardSize = 868;
let ghostBounty = 200;
let imageLocation = "url('../assets/Arcade - Pac-Man - Map.PNG')";
//Cached Document Elements
const boardElement = document.querySelector("#display-board");
const mainElement = document.querySelector("main");
const nextBoardElem =  document.querySelector("#nextBoard");
const prevBoardElem =  document.querySelector("#previousBoard");
const playBoardElem =  document.querySelector("#playBoard");
const scoreElem  =  document.querySelector("#score");
const livesElem =  document.querySelector("#lives");
const gameStatus = document.querySelector("#game-status")
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
	const  verticalDoubleLines = pixels.filter((pixel) =>{
		return (pixel%28===0 ||pixel%28===27 ||[58, 86, 114, ].includes(pixel)) && ![308, 336, 364, 448, 476, 335, 363, 391,420,447, 475, 503, 531].includes(pixel);
	} ).concat([
		285, 313, 341, 302, 330, 358, 453, 481, 470, 498, 509,526,

		//ghost spawn rectangle
		374,381,
		402, 409,
		430, 437,
	]);
	const horizontalDoubleLines = pixels.filter((pixel) =>{
		return pixel <28 ||pixel>840;
	}).concat([
		253, 254, 255, 256, 
		275,276, 277, 278,

		364, 365, 366, 367, 368, 386, 387, 388, 389, 390, 391, 420, 421, 422, 423, 424, 443, 444, 445, 446, 447, 
		533, 534, 535, 536, 554, 555, 556, 557, 558,
		//ghostSpawnRectangle
		375, 376, , 379,380,
		431, 432, 433, 434, 435, 436,

		
	])

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
		673, 674, 
		701,702,
		//bump on the far right
		697,698,
		725, 726,
		//bottom left assymetrical onject under left l
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
		735, 736,
		//bottom t under ghost spawn and other t
		682, 689, 710, 717, 713, 714, 741, 742, 769, 770, 797, 798,
		// bottom right asymmetric t
		719, 720,
		747, 748,
		772, 781,
		800, 809

	];
	const leftCornerDouble =[0, 274, 374, 442, 532, ];
	const rightCornerDouble  = [27, 257, 381, 425, 559];
	const bottomLeftCornerDouble  = [252, 386, 430, 554, 840];
	const bottomRightCornerDouble  = [279, 369, 437, 537, 867];

	const leftCornerSingle =[58, 63, 72, 78, 170, 175, 178, 187, 190, 210, 268 ,288, 427, 439, 514, 546, 590, 595, 604, 610, 639, 682, 697, 707, 714, 719, 758, 772];
	const rightCornerSingle  = [61, 67, 76, 81, 173, 176, 185,188, 193,209, 263, 299, 428, 440, 521, 545, 593, 620, 599, 608, 613, 689, 674,708, 713, 720, 767, 781];
	const bottomLeftCornerSingle  = [114, 119, 125, 128, 134, 198, 206, 218,260,293, 296, 371, 383, 539, 542, 551,618, 623, 629, 632, 704,710,722, 725, 764, 776, 786, 797, 800];
	const bottomRightCornerSingle  = [117, 123, 126, 132, 137, 201, 213, 221, 271, 291, 294, 372, 384, 540, 549, 552, 627, 630, 636,641,702,705, 717, 723, 763, 775, 795,798,809];
	tiles.forEach((tile, index)=>{
		tile.removeAttribute("class");
		tile.classList.add("tile");
		
			//looping paths
			if(!(emptyTiles.includes(index) || tunnelTiles.includes(index))){
				
				//vertical dividers
				if(leftCornerDouble.includes(index) || rightCornerDouble.includes(index)|| bottomLeftCornerDouble.includes(index) || bottomRightCornerDouble.includes(index)){
						tile.style.backgroundRepeat = "no-repeat";
						tile.style.backgroundImage = imageLocation;
					if(leftCornerDouble.includes(index)){
						tile.style.backgroundPosition ="0px -148px";
					}else if(rightCornerDouble.includes(index)){
						tile.style.backgroundPosition ="-220px -148px";
					}else if(bottomLeftCornerDouble.includes(index)){
						tile.style.backgroundPosition ="-0px -240px";
					}else{
						tile.style.backgroundPosition ="-220px -240px";
					}
					tile.classList.add("blocked");
				}else if(leftCornerSingle.includes(index) || rightCornerSingle.includes(index) || bottomLeftCornerSingle.includes(index) || bottomRightCornerSingle.includes(index)){
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(leftCornerSingle.includes(index)){
						tile.style.backgroundPosition ="-14px -12px";
					}else if(rightCornerSingle.includes(index)){
						tile.style.backgroundPosition ="-37px -12px";
					}else if(bottomLeftCornerSingle.includes(index)){
						tile.style.backgroundPosition ="-14px -27px";
					}else if(bottomRightCornerSingle.includes(index)){
						tile.style.backgroundPosition ="-37px -27px";
					};
					tile.classList.add("blocked");
				}else if(verticalDoubleLines.includes(index) ||verticalSingleLines.includes(index)){
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(verticalSingleLines.includes(index)){
						tile.style.backgroundPosition ="-54px -54px";
					}else {
						tile.style.backgroundPosition ="-0px -40px";
					}
					tile.classList.add("blocked");
				}else if( horizontalDoubleLines.includes(index) || horizontalSingleLines.includes(index)){
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(horizontalSingleLines.includes(index)){
						tile.style.backgroundPosition ="-28px -12px";
					}else{
						tile.style.backgroundPosition ="-20px -72px";
					}
					tile.classList.add("blocked");
				}
				else if(index === 85 ||index ===110|| index === 645 || index === 670){
					tile.classList.add("powerPellet");
				}else if(index == 404){
					pinkGhost.spawn = index;
					pinkGhost.position = index;
					tile.classList.add(`pinkGhost${pinkGhost.animation}`);
				}else if(index ==405){
					blueGhost.spawn =index;
					blueGhost.position = index;
					tile.classList.add(`blueGhost${blueGhost.animation}`);
				}else if(index == 406){
					redGhost.spawn = index;
					redGhost.position = index;
					tile.classList.add(`redGhost${redGhost.animation}`);
				}else if(index == 407){
					orangeGhost.spawn = index;
					orangeGhost.position =  index;
					tile.classList.add(`orangeGhost${orangeGhost.animation}`);
				}else if(index == 657){
					pacman.spawn = index;
					pacman.position = index;
					tile.classList.add("pacman");
				}else{
					const dot = document.createElement("div");
					tile.classList.add("dot")
					tile.appendChild(dot);
				}
			}
	});
}


const bfs = (startPos, targetPos, ghost=0)=>{
	const queue = [startPos];
	const visitedTiles = Array(boardSize).fill(false);
	const distances = Array(boardSize).fill(Infinity);
	distances[startPos] =0;
	visitedTiles[startPos] = true;
	const pathToTarget = Array(boardSize).fill(`${startPos}`);
	if(startPos === targetPos){
		if(!empowered){
			loseLife();
		}{
			if(ghost == pinkGhost){
				clearInterval(pinkDeathTimer);
			}else if(ghost  == blueGhost){
				clearInterval(blueDeathTimer);
			}else if(ghost == redGhost){
				clearInterval(redDeathTimer);
			}else if(ghost == orangeGhost){
				clearInterval(orangeDeathTimer);
			}

			const whatToRemove = currentlyDead.indexOf(ghost);
			currentlyDead.splice(whatToRemove, 1);
		}
		const neighbours = [startPos-1, startPos+1, startPos-28, startPos+28];
		for(const neighbour of neighbours){
			if(neighbour <0 || neighbour>boardSize-1) continue;
			if(cantPassThrough.some(className => { return document.querySelector(`#tile${neighbour}`).classList.contains(className) })|| visitedTiles[neighbour] === true) continue;
			
			if(neighbour == startPos-1){
				return 0;
			}else if(neighbour == startPos+1){
				return 1;
			}else if(neighbour  == startPos-28){
				return 2;
			}else if(neighbour == startPos+28){
				return 3;
			}
			
		}
		return;
	}
	while(queue.length >0){
		const currentPos = queue.shift();
		if(currentPos === targetPos){
			const nextMove = pathToTarget[currentPos].split("->")[1];
			if(nextMove == startPos-1){
				return 0;
			}else if(nextMove == startPos+1){
				return 1;
			}else if(nextMove  == startPos-28){
				return 2;
			}else if(nextMove == startPos+28){
				return 3;
			}
		}
		visitedTiles[currentPos] = true;
		const neighbours = [currentPos-1, currentPos+1, currentPos-28, currentPos+28];
		for(const neighbour of neighbours){
			if(neighbour <0 || neighbour>boardSize-1) continue;
			if(cantPassThrough.some(className => { return document.querySelector(`#tile${neighbour}`).classList.contains(className) })|| visitedTiles[neighbour] === true) continue;
			
			queue.push(neighbour);
			visitedTiles[neighbour] = true;
			pathToTarget[neighbour] = pathToTarget[currentPos] +`->${neighbour}`;
			
		}

	}
	return Infinity;
}

const ghostDeath = (ghost)=>{
	currentlyDead.push(ghost);
	score+=ghostBounty;
	ghostBounty+=200;
	if(ghost == pinkGhost){
		pinkDeathTimer = setInterval(()=>{
		const direction = bfs(ghost.position, ghost.spawn, ghost);
		document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghost.animation}`);
		if(direction ==0){
			ghost.position = ghost.position -1;
			ghost.animation = "eyesLeft";
		}else if(direction ==1){
			ghost.position = ghost.position +1;
			ghost.animation = "eyesRight";
		}else if(direction ==2){
			ghost.position = ghost.position -28;
			ghost.animation = "eyesUp";
		}else if(direction ==3){
			ghost.position = ghost.position +28;
			ghost.animation = "eyesDown";
		}
		document.querySelector(`#tile${ghost.position}`).classList.add(`${ghost.animation}`);
	}, 25)
	}else if(ghost == blueGhost){
		blueDeathTimer = setInterval(()=>{
		const direction = bfs(ghost.position, ghost.spawn, ghost);
		document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghost.animation}`);
		if(direction ==0){
			ghost.position = ghost.position -1;
			ghost.animation = "eyesLeft";
		}else if(direction ==1){
			ghost.position = ghost.position +1;
			ghost.animation = "eyesRight";
		}else if(direction ==2){
			ghost.position = ghost.position -28;
			ghost.animation = "eyesUp";
		}else if(direction ==3){
			ghost.position = ghost.position +28;
			ghost.animation = "eyesDown";
		}
		document.querySelector(`#tile${ghost.position}`).classList.add(`${ghost.animation}`);
	}, 25)
	}else if(ghost == redGhost){
	redDeathTimer = setInterval(()=>{
		const direction = bfs(ghost.position, ghost.spawn, ghost);
		document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghost.animation}`);
		if(direction ==0){
			ghost.position = ghost.position -1;
			ghost.animation = "eyesLeft";
		}else if(direction ==1){
			ghost.position = ghost.position +1;
			ghost.animation = "eyesRight";
		}else if(direction ==2){
			ghost.position = ghost.position -28;
			ghost.animation = "eyesUp";
		}else if(direction ==3){
			ghost.position = ghost.position +28;
			ghost.animation = "eyesDown";
		}
		document.querySelector(`#tile${ghost.position}`).classList.add(`${ghost.animation}`);
	}, 25)
	}else if(ghost == orangeGhost){
	orangeDeathTimer = setInterval(()=>{
		const direction = bfs(ghost.position, ghost.spawn, ghost);
		document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghost.animation}`);
		if(direction ==0){
			ghost.position = ghost.position -1;
			ghost.animation = "eyesLeft";
		}else if(direction ==1){
			ghost.position = ghost.position +1;
			ghost.animation = "eyesRight";
		}else if(direction ==2){
			ghost.position = ghost.position -28;
			ghost.animation = "eyesUp";
		}else if(direction ==3){
			ghost.position = ghost.position +28;
			ghost.animation = "eyesDown";
		}
		document.querySelector(`#tile${ghost.position}`).classList.add(`${ghost.animation}`);
	}, 25)
	}
	
	document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghost.animation}`);

	
}


const clearAnyRemainingScaredArtefacts = ()=>{
	const removeElements = ["pinkGhostScared", "redGhostScared", "blueGhostScared", "orangeGhostScared",
		"eyesLeft", "eyesRight", "eyesUp", "eyesDown"
	]
	for(let i = 0; i< boardSize; i++){
		checkElem  = document.querySelector(`#tile${i}`)
		removeElements.some((animation)=>{
			if(checkElem.classList.contains(animation) && !(i ==pinkGhost.position || i == blueGhost.position || i == orangeGhost.position || i == redGhost.position)){
				checkElem.classList.remove(animation)
			}
		})
	}
}
const ghostMoveCloser = (ghost, ghostname)=>{
	if(beginChase){
		if(currentlyDead.includes(ghost)){
		}else{
			clearAnyRemainingScaredArtefacts();
			let direction = bfs(ghost.position, pacman.position);
			if(direction===0 || direction === 1 || direction === 2 || direction ===3 ){
				document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghostname}${ghost.animation}`);
				if(direction === 0){
					ghost.position = ghost.position-1;
					const newPosition = document.querySelector(`#tile${ghost.position}`);;
					if(!empowered){
						ghost.animation = "Left";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);		
					}else{
						
						if(ghost.position === pacman.position){
							ghostDeath(ghost);
						}else{
							ghost.animation  = "Scared";
							newPosition.classList.add(`${ghostname}${ghost.animation}`);
						}
					}
				
				}else if(direction === 1){
						ghost.position = ghost.position+1;
						const newPosition = document.querySelector(`#tile${ghost.position}`);
						if(!empowered){
							ghost.animation = "Right";
							newPosition.classList.add(`${ghostname}${ghost.animation}`);
							if(ghost.position === pacman.position){
								loseLife();
							}
						}else{
							if(ghost.position === pacman.position){
								ghostDeath(ghost);
							}else{
								ghost.animation  = "Scared";
								newPosition.classList.add(`${ghostname}${ghost.animation}`);
							}
						}
						
				}else if(direction ===2){
						ghost.position = ghost.position-28;
						const newPosition = document.querySelector(`#tile${ghost.position}`)
						if(!empowered){
							ghost.animation = "Up";
							newPosition.classList.add(`${ghostname}${ghost.animation}`);
							if(ghost.position === pacman.position){
								loseLife();
							}
						}else{
							if(ghost.position === pacman.position){
								ghostDeath(ghost);
							}else{
								ghost.animation  = "Scared";
								newPosition.classList.add(`${ghostname}${ghost.animation}`);
							}
						}
				}else if(direction === 3){
					ghost.position = ghost.position+28;
					const newPosition = document.querySelector(`#tile${ghost.position}`)
					if(!empowered){
						ghost.animation = "Down";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);
						if(ghost.position === pacman.position){
								loseLife();
						}
					}else{
						if(ghost.position === pacman.position){
							ghostDeath(ghost);
						}else{
							ghost.animation  = "Scared";
							newPosition.classList.add(`${ghostname}${ghost.animation}`);
						}
					}
				}
			}
		}
		
	}

}

const loseSequence = ()=>{
	clearInterval(gameRun);
	clearInterval(redDeathTimer); 
	clearInterval(blueDeathTimer); 
	clearInterval(orangeDeathTimer); 
	clearInterval(pinkDeathTimer);

	gameStatus.textContent = "GAME OVER";
	prevBoardElem.style.visibility ="hidden";
	nextBoardElem.style.visibility ="hidden";
	playBoardElem.style.visibility ="visible";
}
const hasWon = ()=>{
	const remainingDots = document.querySelectorAll(".dot");
	if(remainingDots.length == 0 ){
		clearInterval(gameRun);
		clearInterval(redDeathTimer); 
		clearInterval(blueDeathTimer); 
		clearInterval(orangeDeathTimer); 
		clearInterval(pinkDeathTimer);
		gameStatus = "YOU WIN";
		prevBoardElem.style.visibility ="hidden";
		nextBoardElem.style.visibility ="hidden";
		playBoardElem.style.visibility ="visible";
	}
}
const loseLife = ()=>{

	document.querySelector(`#tile${pacman.position}`).classList.remove("pacman", pacman.lastdirection);
	pacman.lives -=1;
	if(pacman.lives <=0){
		loseSequence();
	}
	pacman.position = pacman.spawn;
	document.querySelector(`#tile${pacman.spawn}`).classList.add("pacman", pacman.lastdirection);
}
const playGame = ()=>{
	updatePostion();
	ghostMoveCloser(redGhost, "redGhost");
	ghostMoveCloser(blueGhost, "blueGhost");
	ghostMoveCloser(pinkGhost, "pinkGhost");
	ghostMoveCloser(orangeGhost, "orangeGhost");
	hasWon();
	scoreElem.textContent = score;
	livesElem.textContent = `x${pacman.lives}`;
}
const updatePostion = ()=>{
	let proposedPosition;
	let modifier;
	const currentPosition =  document.querySelector(`#tile${pacman.position}`);
	if(pacman.lastdirection === "right"){	
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position+1}`).classList.contains("blocked")){
			modifier =-27;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);

		}else{
			modifier =1;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
		
	}else if(pacman.lastdirection === "left"){
		if( tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position-1}`).classList.contains("blocked")){
			modifier =+27;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}else{
			modifier = -1;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
	}else if(pacman.lastdirection === "up"){
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position-28}`).classList.contains("blocked")){
			modifier = -boardSize;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);

		}else{
			modifier = -28;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}
	}else{
		if(tunnelTiles.includes(pacman.position) && document.querySelector(`#tile${pacman.position+28}`).classList.contains("blocked")){
			modifier = boardSize;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		}else{
			modifier = 28;
			proposedPosition = document.querySelector(`#tile${(pacman.position+modifier)%boardSize}`);
		};
	}
	if(proposedPosition.classList.contains("blocked")){
		currentPosition.classList.remove("left", "right", "up", "down");
		currentPosition.classList.add(pacman.lastdirection);
	}else{
			currentPosition.classList.remove("pacman","left", "right", "up", "down");
			// const eat = ["pinkGhostScared", "blueGhostScared", "redGhostScared", "orangeGhostScared"];
			// let itWas;
			// if(eat.some((whichGhost)=>{
			// 	if(proposedPosition.classList.contains(whichGhost)){
			// 		itWas  = whichGhost;
			// 	}
			// 	return proposedPosition.classList.contains(whichGhost);
			// })){
			// 	if(itWas =="pinkGhostScared" ){
			// 		ghostDeath(pinkGhost)
			// 	}else if(itWas == "blueGhostScared"){
			// 		ghostDeath(blueGhost)
			// 	}else if(itWas == "orangGhostScared"){
			// 		ghostDeath(orangeGhost)
			// 	}else{
			// 		ghostDeath(redGhost)
			// 	}
			// }
			// else
			if(cantPassThrough.slice(1).some(className => { 
				return proposedPosition.classList.contains(className) })){
					loseLife();
			}else if(proposedPosition.classList.contains("dot")){
				score+=10;
				proposedPosition.classList.remove("dot");
				pacman.position = pacman.position+modifier;
				proposedPosition.classList.add("pacman", pacman.lastdirection)
			}else if(proposedPosition.classList.contains("powerPellet")){
				empowered =true;
				setTimeout(()=>{empowered =false}, 8000)
				ghostBounty =200;
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
	currentlyDead = [];
	prevBoardElem.style.visibility ="hidden";
	nextBoardElem.style.visibility ="hidden";
	playBoardElem.style.visibility ="hidden";
	pacman.position = pacman.spawn;
	pacman.lastdirection = null;
	pacman.lives = 3;
	score = 0;
	scoreElem.textContent = score;
	beginChase = false;
	redGhost.position =  redGhost.spawn;
	blueGhost.position =  blueGhost.spawn;
	pinkGhost.position =  pinkGhost.spawn;
	orangeGhost.position =  orangeGhost.spawn;
	clearInterval(gameRun);
	boardSelector(currentboard);
	let countDown =4;
	let counter = setInterval(()=>{
		countDown-=1
		gameStatus.textContent = countDown;
	}, 1000)
	setTimeout(()=>{
		clearInterval(counter);
		gameStatus.textContent = "";
		document.addEventListener("keydown",(event)=>{
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
		gameRun = setInterval(playGame, 300);
	}, 4000);
	
	
}

setTiles();
boardSelector(0);
//Eventlistener
nextBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard+1)%boardAmount;
	removeTiles();
	setTiles();
	boardSelector(currentboard);
});
prevBoardElem.addEventListener("click", ()=>{
	currentboard = (currentboard-1)%boardAmount;
	removeTiles();
	setTiles();
	boardSelector(currentboard);
});
playBoardElem.addEventListener("click", ()=>{
	removeTiles();
	setTiles();
	gameStatus.textContent  = "GAME START";
	init();
})