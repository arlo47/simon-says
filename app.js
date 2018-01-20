// red = 1
// blue = 2
// green = 3
// yellow = 4
let red = document.getElementById('red');
let blue = document.getElementById('blue');
let green = document.getElementById('green');
let yellow = document.getElementById('yellow');

//audio variables
let redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//node list containing all the above colors
let colorNodeList = document.querySelectorAll('.circle');

//This is for outputting into the DOM
let says = document.getElementById('says');

//simonSequence is the randomly generated array of colors
let simonSequence = [];

//userSequence is the array the user generates by clicking on the colors to compare to simonSequence
let userSequence = [];

//Counter of how many rounds played
let roundCount = 1;

let game = {
  addToSequence: function() {
    //This Math generates a random number between 1 and 4 which is then pushed to simonSequence in the switch below
    let newColor = Math.floor(Math.random() * 4) + 1;
    //resets userSequence for the next round
    userSequence.splice(0);

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
    roundCount++;
    effects.doEffects();
  },
  userResponse: function(e) {
    //e.target.id returns the html id as a string, .push() adds it to userSequence
    userSequence.push(e.target.id);
    
    switch (e.target.id) {
      case 'red':
        redAudio.play();
        break;
      case 'blue':
        blueAudio.play();
        break;
      case 'green':
      greenAudio.play();
        break;
      case 'yellow':
      yellowAudio.play();
        break;
      default:
          console.log('game.addToSequence() error');
    }

    if (userSequence.length === simonSequence.length) {
      game.compareSequences();
    }
  },
  compareSequences: function() {
      for (let i = 0; i < simonSequence.length; i++) {
        //iterates over both sequences and returns false if they are not exactly the same
        if (userSequence[i] !== simonSequence[i]) {
          console.log('User guessed wrong.');
          says.textContent = 'You guessed wrong. Play again?';
          return false;
        }
      }
      console.log('Correct!');
      says.textContent = `Correct! Starting round ${roundCount}.`;
      
      //If the two sequences are exactly the same, run addToSequence() again for the next round.
      game.addToSequence();
  }
};

let effects = {
  doEffects: function() {
    let i = 0;
  
    let interval = setInterval(function() {
      effects.addRemoveEffect(i);
  
      i++;
      if (i >= simonSequence.length) {
        clearInterval(interval);
      }
    }, 800);
  },
  addRemoveEffect: function(i) {
    switch (simonSequence[i]) {
      case 'red':
        colorNodeList[0].classList.add('opacity');
        redAudio.play();
        break;
      case 'blue':
        colorNodeList[1].classList.add('opacity');
        blueAudio.play();
        break;
      case 'green':
        colorNodeList[2].classList.add('opacity');
        greenAudio.play();
        break;
      case 'yellow':
        colorNodeList[3].classList.add('opacity');
        yellowAudio.play();
        break;
      default:
        console.log('effects.addRemoveEffect() error (adding)');
    }
    setTimeout(function() {
      switch (simonSequence[i]) {
        case 'red':
          colorNodeList[0].classList.remove('opacity');
          break;
        case 'blue':
          colorNodeList[1].classList.remove('opacity');
          break;
        case 'green':
          colorNodeList[2].classList.remove('opacity');
          break;
        case 'yellow':
          colorNodeList[3].classList.remove('opacity');
          break;
        default:
          console.log('effects.addRemoveEffect() error (removing)');
      }
    }, 400);
  }
};

red.addEventListener('click', game.userResponse);
blue.addEventListener('click', game.userResponse);
green.addEventListener('click', game.userResponse);
yellow.addEventListener('click', game.userResponse);