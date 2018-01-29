// var wordBank:[CERVICAL VERTEBRAE", "LUMBAR VERTEBRAE","SACRAL VERTABRAE","STERNUM","RIBS","OCCIPTIAL BONE","PARIETAL BONES","FRONTAL BONE","TEMPORAL BONES","SPHENOID BONE","NASAL BONES","MAXILLA","LACRIMAL BONE","ZYGOMATIC BONE","PALATINE BONE","INFERIOR NASAL CONCHA","VOMER","MANDIBLE","HUMERUS","SCAPULA","CLAVICLES","HIP BONE","FEMUR","PATELLA","TIBIA","FIBULA"];
	

	var Letter = require('./letters.js');
	
	function Word(newWord) {
	
	  var wordString = this; 
	
	  this.wordSelected = false;
	  this.word = newWord;
	  this.letters = []; 

	  this.newLetters = function(){ 
	
	    for(var i = 0; i < wordString.word.length; i++){
	
	      var wordLetters = new Letter (wordString.word[i]);
	
	      this.letters.push(wordLetters);
	    }
	  };
	
	  this.selectWord = function() { 
	
	    if(this.letters.every(function(newLtr) {
	
	      return newLtr.showLetter === true;
	
	    })) {
	
	      this.wordSelected = true;
	
	      return true;
	    }

	  };
	
	  this.checkLetter = function(guessLetter) { 
	
	    var correctLetters = 0;
	    
	    this.letters.forEach(function(newLtr) {
	
	      if(newLtr.letter === guessLetter) {
	
	        newLtr.showLetter = true;
	
	        correctLetters++;

	      }
	    })
	    
	    return correctLetters;
	  };
	
	  this.displayWord = function() {
	
	    var displayNewLetter = '';
	    
	    wordString.letters.forEach(function(newLtr){
	      
	      var currentLetter = newLtr.lettersInWord();
	      
	      displayNewLetter += currentLetter;

	    });
	
	    return displayNewLetter;
	  };
	}
	
	module.exports = Word;
