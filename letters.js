function Letter(newLetter) {
	
    this.letter = newLetter; 
  
    this.showLetter = false; 
  
    this.lettersInWord = function() {
  
      if(this.letter == ' ') {  
        
        this.showLetter = true;

        return '  ';
      }

      if(this.showLetter === false) {   
  
        return ' _ ';
      } 
  
      else { 
  
        return this.letter;
      }
  
    };
  };
  
  module.exports = Letter;
