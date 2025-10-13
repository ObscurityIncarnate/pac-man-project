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
let pixels = [];

//Cached Document Elements
const boardElement = document.querySelector("#display-board");
const mainElement = document.querySelector("main");
const nextBoardElem =  document.querySelector("#nextBoard");
const prevBoardElem =  document.querySelector("#previousBoard");
const playBoardElem =  document.querySelector("#playBoard")
//Functions
const setTiles= ()=>{
for(let i=0; i<812; i++){
    const tile = document.createElement("div");
    tile.id= `tile${i}`;
    tile.classList.add("tile");
    boardElement.appendChild(tile);
	pixels.push(i); 
}
boardElement.style.gridTemplateColumns = "auto ".repeat(28);
boardElement.style.gridTemplateRows = "auto ".repeat(30);

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
	const vDLFE = pixels.filter((pixel) =>{
		return (pixel%28===0 ||[58, 86, 114, ].includes(pixel)) && ![308, 336, 364, 392, 448, 476 ].includes(pixel);
	} );
	const vDLFS = pixels.filter((pixel) =>{
		return pixel%28===27 && ![335, 363, 391, 419,447, 475, 503, 531].includes(pixel)
	} );
	const hDLFE = pixels.filter((pixel) =>{
		return pixel <28 ;
	})
	const hDLFS =  pixels.filter((pixel)=>{
		return pixel>784;
	})
	const horizontalDoubleLines =[
		// 281, 282, 283, 284,
		253, 254, 255, 256, 
		// 303, 304, 305, 306,
		275,276, 277, 278,

		// 392, 393, 394, 395, 396, 414, 415, 416, 417, 418, 419, 448, 449, 450, 451, 452, 471, 472, 473, 474, 475, 533, 534, 535, 536, 554, 555, 556, 557, 558,
		364, 365, 366, 367, 368, 386, 387, 388, 389, 390, 391, 420, 421, 422, 423, 424, 443, 444, 445, 446, 447, 
		533, 534, 535, 536, 554, 555, 556, 557, 558,
		//ghostSpawnRectangle
		375, 376, 377,378, 379,380,
		459, 460,461, 462, 463, 464,
	]

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
	]
	console.log(vDLFE);
	const verticalDoubleLines = [
		// 313, 341, 369, 330, 358, 386, 453, 481, 509, 498, 526,
		285, 313, 341, 302, 330, 358, 425, 453, 481, 470, 498, 509,526,

		//ghost spawn rectangle
		374,381,
		402, 409,
		430, 437,
		458, 465,
		// 397,425,453,414,442,470,537,565,593,582,610
	];
	// const notVerticalDoubleLines = [447,475,476,503,532,559,560,587,588,615];
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
		175, 176, 203, 204,231,232, 259, 260,263,287, 288, 291,315, 316,343,344,
			// right T after center
		187, 188 ,215,216,243,244, 268,272,296, 300,327,328, 355,356,
		// rightedge smaller box
		190, 218, 193, 221,

		
	];
	tiles.forEach((tile, index)=>{
		// console.log(index);
		tile.removeAttribute("class");
		tile.classList.add("tile");
		// if(index<28||index%28==0 || index%28 ===27 || index>=980 ||(index>= 393 && index<=396)||( index=== 397||index=== 425 ||index === 453 )||(index >=477 && index <=481)||(index >= 500 && index <=502 )||( index>= 533 && index<=535 )||( index<= 558 && index >=556)){
			//looping paths
			if(!(index===420||index===448 ||index==504 || index==504+27)){
				const divider = document.createElement("div");
				//vertical dividers
				
				if(vDLFE.includes(index) || vDLFS.includes(index) || verticalDoubleLines.includes(index) ||verticalSingleLines.includes(index)){
					if(verticalSingleLines.includes(index)){
						divider.style.borderLeft = "1px solid blue";
						// divider.style.borderRight = "1px solid blue";
						tile.style.justifyContent= "center"
						divider.style.height ="inherit";
						// divider.style.width = "10px";
					}else {
						// if(vDLFE.includes(index)){
						// 	tile.style.justifyContent ="flex-End";
						// }
						divider.style.borderLeft = "1px solid blue";
						divider.style.borderRight = "1px solid blue";
						divider.style.height ="inherit";
						divider.style.width = "3px";
					}
					
				}else if(hDLFE.includes(index)||hDLFS.includes(index)|| horizontalDoubleLines.includes(index) || horizontalSingleLines.includes(index)){
					// horizontalDoubleLines.push(index);
					// console.log(index);
					//horizontal dividers
					// if(vDLFE.includes(index)){
					// 	tile.style.alignItems = "flex-end"
					// }
					if(horizontalSingleLines.includes(index)){
						divider.style.borderTop="1px solid blue";
					// divider.style.borderBottom ="1px solid blue";
					// divider.style.height = "3px";
						divider.style.width = "inherit";
					}else{
						divider.style.borderTop="1px solid blue";
						divider.style.borderBottom ="1px solid blue";
						divider.style.height = "3px";
						divider.style.width = "inherit";
					}
					

					// tile.style.alignItems ="center";
				}else{

				}
				if(index ===421){
					tile.style.backgroundColor = "white";
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
	// console.log(horizontalDoubleLines.)
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