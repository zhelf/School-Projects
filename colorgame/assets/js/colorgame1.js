var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
// var easyBtn = document.querySelector("#easyBtn")
// var hardBtn = document.querySelector("#hardBtn")

init();

function init(){
	// mode button listeners
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons () {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
		// turnery operator
		// reads as if this.textcontent === easy then 3 otherwise equals 6 used for one line if statemtns with 1 value
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
		// alternative code method
		// if(this.textContent === "Easy") {
		// 	numSquares = 3;
		// } else {
		// 	numSquares = 6;
		// }
			reset();
		});
	}
}

function setupSquares (){
	for(var i = 0; i < squares.length; i++) {

	// add click listeners to squares
	squares[i].addEventListener("click", function(){
	// grab color of picked swuare
		var clickedColor = this.style.backgroundColor;
	// compare color to pickedColor
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323" ;
			messageDisplay.textContent = "Try Again";
		}
	});
}
}


// for(var i = 0; i < modeButtons.length; i++) {
// 	modeButtons[i].addEventListener("click", function(){
// 		modeButtons[0].classList.remove("selected");
// 		modeButtons[1].classList.remove("selected");
// 		this.classList.add("selected");
// 		// turnery operator
// 		// reads as if this.textcontent === easy then 3 otherwise equals 6 used for one line if statemtns with 1 value
// 		this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
// 		// alternative code method
// 		// if(this.textContent === "Easy") {
// 		// 	numSquares = 3;
// 		// } else {
// 		// 	numSquares = 6;
// 		// }
// 		reset();
		

// 	});
// }


function reset() {
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colors of squares
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	// change colors of squares
	for(var i = 0; i < squares.length; i++){
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";

}

// easyBtn.addEventListener("click", function(){
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// })

// hardBtn.addEventListener("click", function(){
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display = "block";
// 	}
// })

resetButton.addEventListener("click", function(){
	reset();
	// // generate all new colors
	// colors = generateRandomColors(numSquares);
	// // pick a new random color from array
	// pickedColor = pickColor();
	// // change colors of squares
	// colorDisplay.textContent = pickedColor;
	// this.textContent = "New Colors"
	// messageDisplay.textContent = ""
	// // change colors of squares
	// for(var i = 0; i < squares.length; i++){
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// h1.style.backgroundColor = "steelblue";
});




for(var i = 0; i < squares.length; i++) {
	// add inital colors to squares
	squares[i].style.backgroundColor = colors[i];

	// add click listeners to squares
	squares[i].addEventListener("click", function(){
	// grab color of picked swuare
		var clickedColor = this.style.backgroundColor;
	// compare color to pickedColor
		if (clickedColor === pickedColor) {
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play again?";
			changeColors(clickedColor);
			h1.style.backgroundColor = clickedColor;
		} else {
			this.style.backgroundColor = "#232323" ;
			messageDisplay.textContent = "Try Again";
		}
	});
}

function changeColors(color){
	// loop through all squares to match given color
	for( var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make an array
	var arr = [];
	// add num random colors to array
	for(var i = 0; i < num; i++){
// get random color and push into arr
		arr.push(randomColor());
		}
	// return that array
	return arr;
}

function randomColor(){
	// pick a "red from 0 to 255"
	var r = Math.floor(Math.random() * 256);
	// pick a green from 0 to 255
	var g = Math.floor(Math.random() * 256);
	// pick a blue from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}