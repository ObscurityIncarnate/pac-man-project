// board1
// 28x36grid
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
// let visited =[]
let tunnelTiles;
let emptyTiles;
let boardSize = 868;
let imageLocation = "url('../assets/Arcade - Pac-Man - Map.PNG')";
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
		// 758, 767,
		// 707, 708,
		735, 736,
		// 786, 795,
		//bottom t under ghost spawn and other t
		// 654, 661, 682, 689, 685, 686, 713, 714, 741, 742, 769, 770
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
		// console.log(index);
		tile.removeAttribute("class");
		tile.classList.add("tile");
		
			//looping paths
			if(!(emptyTiles.includes(index) || tunnelTiles.includes(index))){
				const divider = document.createElement("div");
				
				//vertical dividers
				if(leftCornerDouble.includes(index) || rightCornerDouble.includes(index)|| bottomLeftCornerDouble.includes(index) || bottomRightCornerDouble.includes(index)){
					// const smallerCorner =document.createElement("div");
						tile.style.backgroundRepeat = "no-repeat";
						tile.style.backgroundImage = imageLocation;
					// console.log("here")
					// tile.style.backgroundImage = imageLocation;
					if(leftCornerDouble.includes(index)){
						tile.style.backgroundPosition ="0px -148px";
						// divider.style.borderTop = "1px solid blue";
						// smallerCorner.style.borderTop = "1px solid blue";
						// divider.style.borderLeft ="1px solid blue";
						// smallerCorner.style.borderLeft ="1px solid blue";
						// tile.style.justifyContent = "flex-end";
						// tile.style.alignItems= "flex-end";
						// divider.style.borderTopLeftRadius = "3px";
						// smallerCorner.style.height="5px";
						// smallerCorner.style.width = "6px";
						// divider.style.height = "9px";
						// divider.style.width ="10px";
						// smallerCorner.style.borderTopLeftRadius = "3px";
					}else if(rightCornerDouble.includes(index)){
						tile.style.backgroundPosition ="-220px -148px";
						// divider.style.borderTop = "1px solid blue";
						// smallerCorner.style.borderTop = "1px solid blue";
						// divider.style.borderRight ="1px solid blue";
						// smallerCorner.style.borderRight = "1px solid blue";
						// divider.style.borderTopRightRadius = "3px";
						// smallerCorner.style.borderTopRightRadius = "3px";
						// smallerCorner.style.height="5px";
						// smallerCorner.style.width = "5px"
						// divider.style.height = "9px";
						// divider.style.width ="9px";
						// tile.style.justifyContent= "flex-start";
						// tile.style.alignItems= "flex-end";
					}else if(bottomLeftCornerDouble.includes(index)){

						tile.style.backgroundPosition ="-0px -240px";
						// divider.style.borderBottom = "1px solid blue";
						// smallerCorner.style.borderBottom = "1px solid blue";
						// divider.style.borderLeft ="1px solid blue";
						// smallerCorner.style.borderLeft ="1px solid blue";
						// smallerCorner.style.height="6px";
						// smallerCorner.style.width = "6px";
						// divider.style.height = "10px";
						// divider.style.width ="10px";
						// divider.style.borderBottomLeftRadius = "3px";
						// smallerCorner.style.borderBottomLeftRadius = "3px";
						// tile.style.alignItems= "flex-start";
						// tile.style.justifyContent = "flex-end";
					}else{
						// divider.style.borderBottom = "1px solid blue";
						// smallerCorner.style.borderBottom = "1px solid blue";
						// divider.style.borderRight ="1px solid blue";
						// smallerCorner.style.borderRight = "1px solid blue";
						// divider.style.borderBottomRightRadius = "3px";
						// smallerCorner.style.borderBottomRightRadius = "3px";
						// smallerCorner.style.height="6px";
						// smallerCorner.style.width = "5px"
						// divider.style.height = "10px";
						// divider.style.width ="9px";
						// tile.style.justifyContent= "flex-start";
						// tile.style.alignItems= "flex-start";
						tile.style.backgroundPosition ="-220px -240px";
					}
					
					
					
					
					// divider.style.borderRight = "1px solid blue";
					// divider.style.borderTopLeftRadius = "100%";
					// divider.style.borderTopRightRadius= "-100%"
					// divider.style.transform= "translate(-50%, -50%)";
					// divider.style.borderRadius = "2px"
					
					// divider.style.zIndex = "0"
					
					// smallerCorner.style.zIndex = "1"
					// divider.style.width = "3px";
					// tile.appendChild(divider);
					// divider.style.position = "absolute";
					// tile.appendChild(smallerCorner);
					tile.classList.add("blocked");
					
					
				}else if(leftCornerSingle.includes(index) || rightCornerSingle.includes(index) || bottomLeftCornerSingle.includes(index) || bottomRightCornerSingle.includes(index)){
					// const divider = document.createElement("div");
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(leftCornerSingle.includes(index)){
						// divider.style.borderTop = "1px solid blue";
						// divider.style.borderLeft ="1px solid blue";
						// tile.style.justifyContent = "flex-end";
						// tile.style.alignItems= "flex-end";
						// divider.style.borderTopLeftRadius = "3px";
						// divider.style.height = "8px";
						// divider.style.width ="8px";
						tile.style.backgroundPosition ="-14px -12px";
					}else if(rightCornerSingle.includes(index)){
						tile.style.backgroundPosition ="-37px -12px";
						// divider.style.borderTop = "1px solid blue";
						// divider.style.borderRight ="1px solid blue";
						// tile.style.justifyContent = "flex-start";
						// tile.style.alignItems= "flex-end";
						// divider.style.borderTopRightRadius = "3px";
						// divider.style.height = "8px";
						// divider.style.width ="8px";
					}else if(bottomLeftCornerSingle.includes(index)){
						// tile.style.backgroundRepeat = "no-repeat";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-14px -27px";
						// divider.style.borderBottom = "1px solid blue";
						// divider.style.borderLeft ="1px solid blue";
						// tile.style.justifyContent = "flex-end";
						// tile.style.alignItems= "flex-start";
						// divider.style.borderBottomLeftRadius = "3px";
						// divider.style.height = "8px";
						// divider.style.width ="8px";
					}else if(bottomRightCornerSingle.includes(index)){
						// divider.style.borderBottom = "1px solid blue";
						// divider.style.borderRight ="1px solid blue";
						// tile.style.justifyContent = "flex-start";
						// tile.style.alignItems= "flex-start";
						// divider.style.borderBottomRightRadius = "3px";
						// divider.style.height = "8px";
						// divider.style.width ="8px";
						// tile.style.backgroundRepeat = "no-repeat";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-37px -27px";
					}
					// tile.appendChild(divider);
					tile.classList.add("blocked");
				}else if(verticalDoubleLines.includes(index) ||verticalSingleLines.includes(index)){
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(verticalSingleLines.includes(index)){
						// divider.style.borderLeft = "1px solid blue";
						// tile.style.justifyContent= "center"
						// divider.style.height ="inherit";
						// tile.style.backgroundRepeat = "no-repeat";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-54px -54px";
					}else {
						// divider.style.borderLeft = "1px solid blue";
						// divider.style.borderRight = "1px solid blue";
						// divider.style.height ="inherit";
						// divider.style.width = "3px";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-0px -40px";
						
						
					}
					// tile.appendChild(divider)
					tile.classList.add("blocked");
				}else if( horizontalDoubleLines.includes(index) || horizontalSingleLines.includes(index)){
					tile.style.backgroundRepeat = "no-repeat";
					tile.style.backgroundImage = imageLocation;
					if(horizontalSingleLines.includes(index)){
						// divider.style.borderTop="1px solid blue";
						// divider.style.width = "inherit";
						// tile.style.backgroundRepeat = "no-repeat";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-28px -12px";
					}else{
						// divider.style.borderTop="1px solid blue";
						// divider.style.borderBottom ="1px solid blue";
						// divider.style.height = "3px";
						// divider.style.width = "inherit";
						// tile.style.backgroundImage = imageLocation;
						tile.style.backgroundPosition ="-20px -72px";
					}
					// tile.appendChild(divider)
					tile.classList.add("blocked");
				}
				else if(index === 85 ||index ===110|| index === 645 || index === 670){
					tile.classList.add("powerPellet");
				}else if(index == 404){
					pinkGhost.spawn = index;
					pinkGhost.position = index;
					tile.classList.add(`pinkGhost${redGhost.animation}`)
				}else if(index ==405){
					blueGhost.spawn =index;
					blueGhost.position = index;
					tile.classList.add(`blueGhost${blueGhost.animation}`)
				}else if(index == 406){
					redGhost.spawn = index;
					redGhost.position = index;
					tile.classList.add(`redGhost${redGhost.animation}`)
					// ti
				}else if(index == 407){
					orangeGhost.spawn = index;
					orangeGhost.position =  index;
					tile.classList.add(`orangeGhost${orangeGhost.animation}`)
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

	// const movementAlgorithm =(currentPosition, targetPosition)=>{
	// 	if(currentPosition === targetPosition){
	// 		console.log("is here the issue")
	// 		return step;
	// 	}else if(document.querySelector(`#tile${currentPosition}`).classList.contains("blocked")||visited.includes(currentPosition)){
	// 		// console.log("is here the issue")
	// 		return undefined;
	// 	}
	// 	// else if(visited.includes(currentPosition)){
	// 	// 	// console.log("is here the issue")
	// 	// 	return undefined;
	// 	// }
	// 	else{
	// 		step +=1;
	// 		visited.push(currentPosition);
	// 		const leftMove =  currentPosition -1;
	// 		const rightMove =  currentPosition +1;
	// 		const upMove =  currentPosition -28;
	// 		const downMove =  currentPosition +28;
	// 		const possibleMoves = [leftMove, rightMove,  upMove, downMove];
	// 		const lengthCount = [0,0,0,0];
			
	// 		possibleMoves.forEach((move, index)=>{
	// 			const output = movementAlgorithm(move, targetPosition);
	// 			if(typeof output === "number" && !isNaN(output)){
	// 				console.log(output)
	// 				lengthCount[index] = step;
	// 			} else{
	// 				lengthCount[index] = null;
	// 			}
	// 		})
	// 		// const lengths = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER];
	// 		// if(!visited.includes(leftMove)){
	// 			// visited.push(leftMove);
	// 			// lengths[0]= dijkstraAlgorithm(leftMove, targetPosition) +1; 
	// 		// }
	// 		// if(!visited.includes(rightMove)){
	// 			// visited.push(rightMove);
	// 			// lengths[1] = dijkstraAlgorithm(rightMove, targetPosition) +1;
	// 		// }
	// 		// if(!visited.includes(upMove)){
	// 			// visited.push(upMove);
	// 			// lengths[2] = dijkstraAlgorithm(upMove, targetPosition) +1;
	// 		// }
	// 		// if(!visited.includes(downMove)){
	// 			// visited.push(downMove);
	// 			// lengths[3] = dijkstraAlgorithm(downMove, targetPosition) +1;
	// 		// }

	// 		// let smallestDistance = Number.MAX_SAFE_INTEGER;
	// 		// let direction;
	// 		// lengths.forEach((length, index)=>{
	// 		// 	if(empowered){
	// 		// 		smallestDistance = Number.MIN_SAFE_INTEGER;
	// 		// 		if(length>smallestDistance){
	// 		// 			smallestDistance = length;
	// 		// 			direction = index;
	// 		// 		}
	// 		// 	}else{
	// 		// 		if(length<smallestDistance){
	// 		// 			smallestDistance = length;
	// 		// 			direction = index;
	// 		// 		}
	// 		// 	}
				
	// 		// })
	// 		console.log(lengthCount)
	// 		return empowered ? Math.max(lengthCount.filter(number => {(typeof number =="number" && !isNaN(number))})) : Math.min(lengthCount.filter(number => {(typeof number =="number" && !isNaN(number))}));
	// 		// console.log([dijkstraAlgorithm(leftMove, targetPosition) , dijkstraAlgorithm(rightMove, targetPosition) , dijkstraAlgorithm(upMove, targetPosition) , dijkstraAlgorithm(downMove, targetPosition) ])
	// 		// if(empowered){
	// 		// 	return Math.max(...[dijkstraAlgorithm(leftMove, targetPosition) +1 , dijkstraAlgorithm(rightMove, targetPosition) +1, dijkstraAlgorithm(upMove, targetPosition)+1 , dijkstraAlgorithm(downMove, targetPosition)+1 ].filter((pathway) => { return !isNaN(pathway)}));
	// 		// }else{
	// 		// 	return Math.min(...[dijkstraAlgorithm(leftMove, targetPosition) , dijkstraAlgorithm(rightMove, targetPosition) , dijkstraAlgorithm(upMove, targetPosition) , dijkstraAlgorithm(downMove, targetPosition) ].filter((pathway) => { return !isNaN(pathway)}));
	// 		// }
	// 		// return direction;
	// 	}
		
	// }

// const dijkstraAlgorithm = (startPos, targetPos)=>{
// 	const unvisitedNodes  = [];
// 	document.querySelectorAll(".tile").forEach((tile, index)=>{
// 		unvisitedNodes.push(index);
// 	});
// 	const visitedNodes = [];
// 	const distance = Array(boardSize).fill(Number.MAX_SAFE_INTEGER);
// 	const distanceFrom = Array(boardSize).fill(Number.MAX_SAFE_INTEGER);
// 	distance[startPos] = 0; 
// 	const currentPosition = startPos;
// 	// unvisitedNodes.forEach((location)=>{
// 	const neighbours = [currentPosition-1, currentPosition+1, currentPosition-28, currentPosition+28];
// 	neighbours.forEach((neighbour)=>{
// 			if(document.querySelector(`#tile${neighbour}`).classList.includes("blocked")){

// 			}else{
// 				if(distance[currentPosition]+1 <distance[neighbour]){
// 					distance[neighbour] = distance[currentPosition] +1;
// 					distanceFrom[neighbour] =currentPosition;
// 				}
// 			}
// 		});
	
// 	// })
// 	visitedNodes.push(currentPosition);
// 	unvisitedNodes.splice(currentPosition);
// 	const eligihb
// 	currentPosition = Math.min(...neighbours.filter((neighbour)=>{
// 		return !visitedNodes.includes(neighbour)
// 	}))

// }

const bfs = (startPos, targetPos)=>{
	const queue = [startPos];
	const visitedTiles = Array(boardSize).fill(false);
	const distances = Array(boardSize).fill(Infinity);
	distances[startPos] =0;
	visitedTiles[startPos] = true;
	const pathToTarget = Array(boardSize).fill(`${startPos}`);
	while(queue.length >0){
		const currentPos = queue.shift();
		console.log(currentPos)
		if(currentPos === targetPos){
			return[ distances[currentPos], pathToTarget[currentPos]];
		}
		visitedTiles[currentPos] = true;
		const neighbours = [currentPos-1, currentPos+1, currentPos-28, currentPos+28];
		for(const neighbour of neighbours){
			console.log(neighbour)
			if(neighbour <0 || neighbour>boardSize-1) continue;
			// if ((currentPos % 28 === 0 && neighbour === currentPos - 1) || (currentPos % 28 === 28 - 1 && neighbour === currentPos + 1)) {
        	// 	continue;
      		// }
			if(document.querySelector(`#tile${neighbour}`).classList.contains("blocked") || visitedTiles[neighbour] === true) continue;
			
			queue.push(neighbour);
			// distances[neighbour] = distances[currentPos]+1;
			visitedTiles[neighbour] = true;
			pathToTarget[neighbour] = pathToTarget[currentPos] +`->${neighbour}`;
			// console.log(neighbour)
			
		}

	}
	return Infinity;
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
		// visited =[];
		// let step =0;
		let direction = bf(ghost.position, pacman.position);
		if(!empowered){
			let minDistance = Number.MAX_SAFE_INTEGER;
			// console.log(minDistance)
			distanceArray.forEach((distance, index)=>{
				if(distance !== null){
					if(distance < minDistance){
						minDistance = distance;
						direction = index;
					}
				}
			})
			// console.log(minDistance)
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
		console.log(direction)
		console.log(`${ghostname}${direction}, and the position ${ghost.position}`)
		if(direction){
			document.querySelector(`#tile${ghost.position}`).classList.remove(`${ghostname}${ghost.animation}`);
			if(direction === 0){
			ghost.position = leftMove;
			const newPosition = document.querySelector(`#tile${ghost.position}`);
			// newPosition.classList.add(`${ghostname}`);
			if(!empowered){
				ghost.animation = "Left";
				// newPosition.style.animation = `${ghostname}Left 0.4s steps(2) infinite;`;
				newPosition.classList.add(`${ghostname}${ghost.animation}`);
				if(ghost.position === pacman.position){
					loseLife();
				}
				// else{
				// 	newPosition.classList.add(`${ghostname}${ghost.animation}`);
				// }
			}else{
				// newPosition.style.animation = `${ghostname}Scared 0.4s steps(2) infinite;`
				// newPosition.classList.add(`${ghostname}${ghost.animation}`);
				if(ghost.position === pacman.position){
					score+=200;
				}else{
					ghost.animation  = "Scared";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
				}
			}
			
		}else if(direction === 1){
			ghost.position = rightMove;
			const newPosition = document.querySelector(`#tile${ghost.position}`);
			// newPosition.classList.add(`${ghostname}`);
			if(!empowered){
				ghost.animation = "Right";
				// newPosition.style.animation = `${ghostname}Right 0.4s steps(2) infinite;`;
				// console.log
				newPosition.classList.add(`${ghostname}${ghost.animation}`);
				if(ghost.position === pacman.position){
					loseLife();
				}
			}else{
				// newPosition.style.animation = `${ghostname}Scared 0.4s steps(2) infinite;`
				// newPosition.classList.add(`${ghostname}${ghost.animation}`);
				if(ghost.position === pacman.position){
					score+=200;
				}else{
					ghost.animation  = "Scared";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
				}
			}
			
		}else if(direction ===2){
			ghost.position = upMove;
			const newPosition = document.querySelector(`#tile${ghost.position}`)
			// newPosition.classList.add(`${ghostname}`);
			if(!empowered){
				// newPosition.style.animation = `${ghostname}Up 0.4s steps(2) infinite;`;
				ghost.animation = "Up";
				newPosition.classList.add(`${ghostname}${ghost.animation}`);
				if(ghost.position === pacman.position){
					loseLife();
				}
			}else{
				if(ghost.position === pacman.position){
					score+=200;
				}else{
					ghost.animation  = "Scared";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
				}
			}
			
		}else if(direction === 3){
			ghost.position = downMove;
			const newPosition = document.querySelector(`#tile${ghost.position}`)
			// newPosition.classList.add(`${ghostname}`);
			if(!empowered){
				ghost.animation = "Down";
				newPosition.classList.add(`${ghostname}${ghost.animation}`);
				// newPosition.style.animation = `${ghostname}Down 0.4s steps(2) infinite;`;
				if(ghost.position === pacman.position){
					loseLife();
				}
			}else{
				if(ghost.position === pacman.position){
					score+=200;
				}else{
					ghost.animation  = "Scared";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
				}
			}
			
		}
			if(direction === 0){
				ghost.position = leftMove;
				const newPosition = document.querySelector(`#tile${ghost.position}`);
				// newPosition.classList.add(`${ghostname}`);
				if(!empowered){
					ghost.animation = "Left";
					// newPosition.style.animation = `${ghostname}Left 0.4s steps(2) infinite;`;
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
					if(ghost.position === pacman.position){
						loseLife();
					}
					// else{
					// 	newPosition.classList.add(`${ghostname}${ghost.animation}`);
					// }
				}else{
					// newPosition.style.animation = `${ghostname}Scared 0.4s steps(2) infinite;`
					// newPosition.classList.add(`${ghostname}${ghost.animation}`);
					if(ghost.position === pacman.position){
						score+=200;
					}else{
						ghost.animation  = "Scared";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);
					}
				}
				
			}else if(direction === 1){
				ghost.position = rightMove;
				const newPosition = document.querySelector(`#tile${ghost.position}`);
				// newPosition.classList.add(`${ghostname}`);
				if(!empowered){
					ghost.animation = "Right";
					// newPosition.style.animation = `${ghostname}Right 0.4s steps(2) infinite;`;
					// console.log
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
					if(ghost.position === pacman.position){
						loseLife();
					}
				}else{
					// newPosition.style.animation = `${ghostname}Scared 0.4s steps(2) infinite;`
					// newPosition.classList.add(`${ghostname}${ghost.animation}`);
					if(ghost.position === pacman.position){
						score+=200;
					}else{
						ghost.animation  = "Scared";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);
					}
				}
				
			}else if(direction ===2){
				ghost.position = upMove;
				const newPosition = document.querySelector(`#tile${ghost.position}`)
				// newPosition.classList.add(`${ghostname}`);
				if(!empowered){
					// newPosition.style.animation = `${ghostname}Up 0.4s steps(2) infinite;`;
					ghost.animation = "Up";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
					if(ghost.position === pacman.position){
						loseLife();
					}
				}else{
					if(ghost.position === pacman.position){
						score+=200;
					}else{
						ghost.animation  = "Scared";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);
					}
				}
				
			}else if(direction === 3){
				ghost.position = downMove;
				const newPosition = document.querySelector(`#tile${ghost.position}`)
				// newPosition.classList.add(`${ghostname}`);
				if(!empowered){
					ghost.animation = "Down";
					newPosition.classList.add(`${ghostname}${ghost.animation}`);
					// newPosition.style.animation = `${ghostname}Down 0.4s steps(2) infinite;`;
					if(ghost.position === pacman.position){
						loseLife();
					}
				}else{
					if(ghost.position === pacman.position){
						score+=200;
						ghost.position = ghost.spawn;
					}else{
						ghost.animation  = "Scared";
						newPosition.classList.add(`${ghostname}${ghost.animation}`);
					}
				}
				
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
const hasWon = ()=>{
	const remainingDots = document.querySelectorAll(".dot")
	if(remainingDots.length == 0 ){
		clearInterval(gameRun);
		prevBoardElem.style.visibility ="visible";
		nextBoardElem.style.visibility ="visible";
		playBoardElem.style.visibility ="visible";
	}
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
	hasWon();
	scoreElem.textContent = score;
	livesElem.textContent = `x${pacman.lives}`
}
const updatePostion = ()=>{
	let proposedPosition;
	let modifier;
	const currentPosition =  document.querySelector(`#tile${pacman.position}`);
	// console.log(pacman.position)
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
				empowered =true;
				setTimeout(()=>{empowered =false}, 8000)
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
// const calculateOptimalDirection =  ()=>{
// 	const bestdirection = [];
// 	visited =[];
// 	const tiles = document.querySelectorAll(".tile");
// 	tiles.forEach((tile, index) => {
// 		if(tile.classList.includes("blocked")){
// 			bestdirection.push(Array(tiles.length).fill(null));
// 		}else{
// 			const divineInspiration = Array(tiles.length).fill(null);
// 			for (let j = index; j < tiles.length; j++) {
// 				if()
				
// 			}
// 		}
// 		visited.push(index);
// 	});
// }
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
	boardSelector(currentboard);
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
console.log(bfs(pinkGhost.position, pacman.position));
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