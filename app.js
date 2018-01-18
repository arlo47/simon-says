// red = 1
// blue = 2
// green = 3
// yellow = 4
let red = document.getElementById('red');
let blue = document.getElementById('blue');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');

//simonSequence is the randomly generated array of colors
let simonSequence = [];
//userSequence is the array the user generates by clicking on the colors to compare to simonSequence
let userSequence = [];

let game = {
  addToSequence: function() {
    //This Math generates a random number between 1 and 4 which is then pushed to simonSequence in the switch below
    let newColor = Math.floor(Math.random() * 4) + 1;
    //resets userSequence for the next round
    userSequence.length = 0;

    switch (newColor) {
      case 1:
        simonSequence.push('red');
        console.log('red');
        break;
      case 2:
        simonSequence.push('blue');
        console.log('blue');
        break;
      case 3:
        simonSequence.push('green');
        console.log('green');
        break;
      case 4:
        simonSequence.push('yellow');
        console.log('yellow');
        break;
      default:
          console.log('game.addToSequence() error');
    }
  },
  userResponse: function(e) {
    //e.target.id returns the html id as a string, .push() adds it to userSequence
    userSequence.push(e.target.id);
  },
  compareSequences: function() {
    //Checks if the two sequences are equal in length before doing any other tests
    if (simonSequence.length === userSequence.length) {
        for (let i = 0; i < simonSequence.length; i++) {
          //iterates over both sequences and returns false if they are not exactly the same
          if (userSequence[i] !== simonSequence[i]) {
            console.log('User guessed wrong.');
            return false;
          }
      }
      console.log('Correct!');
      //If the two sequences are exactly the same, run addToSequence() again for the next round.
      game.addToSequence();
    } else {
      console.log('Simon and the user\'s sequence aren\'t the same length');
    }
  }
};


function sequenceEffects() {
  let colorNodeList = document.querySelectorAll('.circle');

  for (let i = 0; i < simonSequence.length; i++) {
    for (var j = 0; j < colorNodeList.length; j++) {
      if (colorNodeList[j].id === simonSequence[i]) {
        colorNodeList[j].classList.add('opacity');
        removeOpacity(j);
      }
    }
  }
  function removeOpacity(j) {
    setTimeout(function() {
      colorNodeList[j].classList.remove('opacity');
    }, 2000);
  }
}





red.addEventListener('click', game.userResponse);
blue.addEventListener('click', game.userResponse);
green.addEventListener('click', game.userResponse);
yellow.addEventListener('click', game.userResponse);
