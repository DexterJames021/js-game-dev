// logic.js
// console.log("hertSSS")

//declare our variables for 2d aray, score , row, and column
let board;
let score = 0;
let rows = 4;
let columns = 4;
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;



//Create a function to set the game
//start of setGame()
function setGame(){
	//iniatia;ize the 4x4 game board with all tiles set to 0.
	board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

	for(let r = 0; r < rows; r++){
		for(let c = 0; c < columns; c++){
			// console.log(`[r${r}-c${c}]`);

			//create div element reresenting a tile
			let tile = document.createElement("div")

			//set a unique id for each tile based on its coordiates
			tile.id = r.toString() + "-" + c.toString();

			//get the number frin the board
			//wherein the board is currently set to 0
			let num = board[r][c];


			//update the tile's apperance based on the value.
			updateTile(tile, num);

			//place the inside the drid (board), in the right row and column.
			document.getElementById("board").append(tile)
		}
	}

	// Random Tile
	setTwo();
	setTwo();
}

// setGame()
//end of setGame()




//start of updateTile()
function updateTile(tile, num){
	//clear the title text
	tile.innerText = "";

	//clear the classlist to avoid multiple classes
	tile.classList.value = "";

	//add class named "tile" to the classLists of the tile, for the styling
	tile.classList.add("tile");

	//to check if the current num is not zero
	if(num > 0){
		//set the tile's text to the numbr based on the num value
		tile.innerText = num.toString();

		//example: num = 128, the "x128" will be added to the tile
		if(num<=4096){
			tile.classList.add("x"+num.toString());
		}else{
			//if num is greater that 4096, a speacial class "x8192" will be added.
			tile.classList.add("x8192")
		}


	}
}
//end of updateTile()

//start of window.onload
//an event tat triggers when webpage finished loading
window.onload = function(){
	setGame();
}

//end of window.onload

//start of handleSlide()
//"e" represents the event object, which contains information about the event occuered
function handleSlide(e){
	console.log(e.code)

	//check if the pressed key's code is code is one the arraow keys.
	if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.code)){

		e.preventDefault();

		// = asign
		// == compare
		// === compare and compare datatype
		if(e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}else if(e.code == "ArrowRight"){
			slideRight();
			setTwo();
		}else if(e.code == "ArrowUp"){
			slideUp();
			setTwo();
		}else if(e.code == "ArrowDown"){
			slideDown();
			setTwo();
		}

		document.getElementById("score").innerText = score;

		// use setTimeout to delay the alert
		setTimeout(()=>{
			if(hasLost()){
				alert("Game Over! You have lost the game. Game will restart.")
				// reset the game
				restartGame();
				alert("Press any arrow key to restart.");
			}
			else{
				checkWin();
			}
		}, 100); //delay time in miliseconds

	}


}


// When any key is pressed, the handleSlide() is called to handle the key press.
document.addEventListener("keydown", handleSlide);
// end of handleSlide()

//start of filterZero(tiles)
//removing empty tiles
function filterZero(tiles){
	//craete new array removing the zeroes
	return tiles.filter(num => num != 0);
}
//end of filterZero(tiles)

//start of slide(tiles)
//function for sliding and merging tiles
function slide(tiles){
	//1st [0,2,2,2]
	//2nd [0,2,2,2]
	tiles = filterZero(tiles)


	for(let i = 0; i < tiles.length; i++){
		//if two adjacent number are equal
		if(tiles[i] == tiles[i+1]){
			//merge them by doubling the first one
			tiles[i] *= 2;
			//set the second on to zero
			tiles[i+1] = 0;

			score += tiles[i]

		} 
	}

	//4,0,2 -> 4,2
	tiles = filterZero(tiles)

	//add zeroes back
	while(tiles.length < 4){
		//add zero on the ed of the array
		tiles.push(0);
		//[4,2,0,0]
	}

	// [4,2,0,0]
	return tiles;

}
//end of slide(tiles)

// start of slideLeft()
function slideLeft(){
	for(let r = 0; r < rows; r++){

		//store curremnt row in the row variable
		let row = board[r]; //0: [0,2,2,2]

		//copy the content of the original row
		let originalRow = row.slice()

		//slide() function will return a new value for a specific rom. (merging of tiles)
		row =slide(row)

				// Updated value in the board.
		board[r] = row;

		for(let c=0; c < columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            //if current tile != to the original tile apply animation
            if(originalRow[c] !== num && num !== 0){
            	//specify the animation style and duration
            	tile.style.animation = "slide-from-right 0.3s"
            
            	//remove the animation class after animation is complete
            	setTimeout(()=>{
            		tile.style.animation = ""
            	}, 300)
            }



            updateTile(tile, num);
		}
	}
}
// end of slideLeft()

// start of slideRight()
function slideRight(){
	for(let r = 0; r < rows; r++){

		//store current row in the row variable
		let row = board[r]; //0: [0,2,2,2]

		//originl row for animation
		let originalRow = row.slice();

		//reverse the array since it is sliding to right
		row.reverse();

		//slide() function will return a new value for a specific rom. (merging of tiles)
		row =slide(row);
		row.reverse();

				// Updated value in the board.
		board[r] = row;

		for(let c=0; c < columns; c++){
			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            //if current tile != to the original tile apply animation
            if(originalRow[c] !== num && num !== 0){
            	//specify the animation style and duration
            	tile.style.animation = "slide-from-left 0.3s"
            
            	//remove the animation class after animation is complete
            	setTimeout(()=>{
            		tile.style.animation = "";
            	}, 300)
            }

            updateTile(tile, num);
		}
	}
}
// end of slideRight()

// start of slideUp()
function slideUp(){
	for(let c = 0; c < columns; c++){
		//create a temporary aaray col that represent colunm
		let col = [
			board[0][c],
			board[1][c],
			board[2][c],
			board[3][c],
		];

		let originalCol = col.slice();

		col = slide(col)


		for(let r=0; r < rows; r++){
			//set the values of board array back to the values of modified
			board[r][c] = col[r]

			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            //if current tile != to the original tile apply animation
            if(originalCol[r] !== num && num !== 0){
            	//specify the animation style and duration
            	tile.style.animation = "slide-from-bottom 0.3s"
            
            	//remove the animation class after animation is complete
            	setTimeout(()=>{
            		tile.style.animation = "";
            	}, 300)
            }

            updateTile(tile, num);
		}
	}
}
// end of slideUp()

// start of slideDown()
function slideDown(){
	for(let c = 0; c < columns; c++){
		//create a temporary aaray col that represent colunm
		let col = [
			board[0][c],
			board[1][c],
			board[2][c],
			board[3][c],
		];

		let originalCol = col.slice();

		col.reverse();

		col = slide(col);

		col.reverse();


		for(let r=0; r < rows; r++){
			//set the values of board array back to the values of modified
			board[r][c] = col[r]

			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];

            if(originalCol[r] !== num && num !== 0){
            	//specify the animation style and duration
            	tile.style.animation = "slide-from-top 0.3s"
            
            	//remove the animation class after animation is complete
            	setTimeout(()=>{
            		tile.style.animation = "";
            	}, 300)
            }

            updateTile(tile, num);
		}
	}
}
// end of slideDown()

//start of hasEmptyTile()
//chech whether game board contains any empty space (0) tiles
//return true or false
function hasEmptyTile(){
	for(let r = 0; r < rows; r++){
		for(let c = 0;c < columns; c++){
			//check if current tile == 0, if yes it will return true
			if(board[r][c] == 0){
				return true;
			}
		}
	}
	//no tile == 0
	return 0;
}
//end of hasEmptyTile()

//start of setTwo()
//add new ramdom '2' tile in the game board.
function setTwo(){
	//check if hasEmptyTile is false.
	if(!hasEmptyTile()){
		return; 
	}

	//declare a value found tile
	let found = false;

	//this will run until ramdom empty tile is found
	while(!found){
		//Math.ramdom() - generate ramdom number base on the given condition
		//Math.floor() - rounds down to the nearest integer

		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		//if the position values is 0 set the value to 2
		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r.toString()+"-"+c.toString());
			tile.innerText = "2"
			tile.classList.add("x2")

			//set the found variable to true
			found = true
		}
	}

}
//end of setTwo()

//start of checkWin()
function checkWin(){
	for(let r = 0;r < rows; r++){
		for(let c = 0;c < columns; c++){
			//check if the current tile is a winning tile
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You win! You got 2048");
				is2048Exist = true;
				//pop once
			}else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are unstoppable at 2048!");
				is4096Exist = true;
			}else if(board[r][c] == 8292 && is8192Exist == false){
				alert("You have reached 8192!");
				is8192Exist = true;
			}
		}
	}
}

//end of checkWin()

//start of hasLost()
function hasLost(){
	for(let r = 0;r < rows; r++){
		for(let c = 0;c < columns; c++){
			//found an empty tile, not loss
			if(board[r][c] == 0){
				return false;
			}

			const currentTile = board[r][c];
			//check if adjacent self cell have possible merge
						if(
				r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile 
			){
				return false;
			}

		}
	}

	// no possible moves left or empty tiles, user lost
	return true
}
//end of hasLost()

// start of restartGame()
// RestartGame by replacing all values into zero.
function restartGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    
    setTwo();    // new tile   
    score = 0;

}
// end of restartGame()


// FOR MOBILE DEVICES
// Declare  variable for touch input
let startX = 0;
let startY = 0;

// event listener to capture touch in the screem and assigns th x and y coordonates in the startX and startY variable
document.addEventListener("touchstart",(e)=>{
	startX = e.touches[0].clientX
	startY = e.touches[0].clientY
	console.log(startX)
	console.log(startY)
})

//event listener to checl where you touch the screen and prevents scrolling. input target any element that includes the word tile.
document.addEventListener("touchmove", (e)=>{
	if(!e.target.className.includes("tile")){
		return
	}

	e.preventDefault(); //disable scrolling
}, {passive: false});

//listen for the  touchend event on the entrire document
document.addEventListener("touchend", (e)=>{

	// check if has tile class name
	if(!e.target.className.includes("tile")){
		return; //exit the function
	}

	//calculate the difference between the initaial position and final touch
	let diffX = startX - e.changedTouches[0].clientX;
	let diffY = startY - e.changedTouches[0].clientY;

	console.log(diffX)
	console.log(diffY)

	//check if the swipe id for horizontal or vertical
	//horizotal > vertical
	if(Math.abs(diffX) > Math.abs(diffY)){
		//horizontal swipe
		if(diffX > 0){
			slideLeft();
			setTwo();
		}else {
			slideRight();
			setTwo();
		}
	}else{
		//vertical swipe
		if(diffY > 0){
			slideUp();
			setTwo();
		}else{
			slideDown();
			setTwo();
		}
	}

	document.getElementById("score").innerText = score;

	// use setTimeout to delay the alert
	setTimeout(()=>{
		if(hasLost()){
			alert("Game Over! You have lost the game. Game will restart.")
			// reset the game
			restartGame();
			alert("Press any arrow key to restart.");
		}
		else{
			checkWin();
		}
	}, 100); //delay time in miliseconds

})