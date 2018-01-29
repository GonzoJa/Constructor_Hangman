var inquirer = require('inquirer');
	

	var Word = require('./word.js');
	

	var Letter = require('./letters.js');
	

	

	var hangman = {
	
		wordBank:["CERVICAL VERTEBRAE", "LUMBAR VERTEBRAE","SACRAL VERTABRAE","STERNUM","RIBS","OCCIPTIAL BONE","PARIETAL BONES","FRONTAL BONE","TEMPORAL BONES","SPHENOID BONE","NASAL BONES","MAXILLA","LACRIMAL BONE","ZYGOMATIC BONE","PALATINE BONE","INFERIOR NASAL CONCHA","VOMER","MANDIBLE","HUMERUS","SCAPULA","CLAVICLES","HIP BONE","FEMUR","PATELLA","TIBIA","FIBULA"],
	
		guessesLeft: 10,
	
		alreadyGuessed: [], 
	
		currentWord: null,
	
		startGame: function(){  
	
			var startGame = this;

			if(this.alreadyGuessed.length > 0) {
	
				this.alreadyGuessed = [];
			}
	
			inquirer.prompt([{
	
				name: "start",
				type: "confirm",
				message: "Start a new game?"

			}]).then(function(response){
	
				if (response.start) {
	
					startGame.newGame();
				}
	
				else {
	
					console.log("Bye Felicia!");
				}
			})
	

		},
	
		newGame: function(){
	
			if(this. guessesLeft === 10) {
	

				console.log("HINT: human bones");
				console.log("Ready, set, GO!");
				console.log("^^^^^^^^^^^^^^^^");
				console.log(" ");
	

				var randomWord = Math.floor(Math.random() * this.wordBank.length); 
	
				this.currentWord = new Word (this.wordBank[randomWord]);
				this.currentWord.newLetters();
	
				console.log(this.currentWord.displayWord()); 
	
				this.nextGuess();
			}
	
			else {
	
				this.clearGuesses();
				this.newGame();
			}
		},
	
		clearGuesses: function(){
	
			this.guessesLeft = 10;
		},
	
		nextGuess: function(){
	
			var newGuess = this;
	
			inquirer.prompt([{ 
	
				name: "guess",
				type: "input",
				message: "Guess a letter.",
	
			}]).then(function(newLetter) {
	
					var chosenLetter = (newLetter.guess).toUpperCase(); 
	
					var repeatGuess = false;
	
					for(var i = 0; i < newGuess.alreadyGuessed.length; i++){
	
						if(chosenLetter === newGuess.alreadyGuessed[i]){
	
							repeatGuess = true;
						}
					}
	
					if(repeatGuess === false) {
	
						newGuess.alreadyGuessed.push(chosenLetter); 
	
						var letterFound = newGuess.currentWord.checkLetter(chosenLetter);
	
						if(letterFound === 0) { 
	
							console.log("Not in this word!");
							newGuess.guessesLeft--;
	
							console.log("Guesses Left:" + newGuess.guessesLeft);
							console.log("Letters already guessed:" + newGuess.alreadyGuessed);
							console.log("^^^^^^^^^^^^^^^^");
							console.log(" ");
							console.log(newGuess.currentWord.displayWord());
							console.log(" ");
							console.log("^^^^^^^^^^^^^^^^");
							console.log(" ");
						}
	
						else {
	
							console.log("Correct!");
	
		              		if(newGuess.currentWord.selectWord() === true) { 
	
			                	console.log(newGuess.currentWord.displayWord());
			                	console.log("YOU WON!");
		                
		              		}
	

		              		else {
	
		              			console.log("Guesses Left:" + newGuess.guessesLeft);
								console.log("Letters already guessed:" + newGuess.alreadyGuessed);
								console.log("^^^^^^^^^^^^^^^^");
								console.log(" ");
								console.log(newGuess.currentWord.displayWord());
								console.log(" ");
								console.log("^^^^^^^^^^^^^^^^");
								console.log(" ");
		                
		             		}
						}
	
						if(newGuess.guessesLeft > 0 && newGuess.currentWord.wordSelected === false) { //if user has run out of guesses and hasn't completed the word, game over.
	
							newGuess.nextGuess();
						}
	
						else if (newGuess.guessesLeft === 0) {
	
							console.log("GAME OVER!");
	
							console.log("The correct answer was:  " + newGuess.currentWord.word)
						}
					}
	
					else {
	
						console.log("You have already guessed this letter!. Try Again.");
						newGuess.nextGuess();
					}
		
				});
			}
		}
	
	hangman.startGame();
