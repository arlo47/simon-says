//UI Elements
let red = document.getElementById('red');             // red = 1
let blue = document.getElementById('blue');           // blue = 2
let green = document.getElementById('green');         // green = 3
let yellow = document.getElementById('yellow');       // yellow = 4
//This is for outputting into the DOM
let says = document.getElementById('says');
//Play button
let playBtn = document.getElementById('play-again');
//node list containing all the above colors
let colorNodeList = document.querySelectorAll('.circle');

//audio variables
let redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
let blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
let greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
let yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//simonSequence is the randomly generated array of colors
let simonSequence = [];
//userSequence is the array the user generates by clicking on the colors to compare to simonSequence
let userSequence = [];

//Counter of how many rounds played
let roundCount = 1;

let game = {
  addToSequence: function() {
    //disables the play button, stopping multiple instances of the game to run at a time.
    playBtn.disabled = true;
    //resets userSequence for the next round
    userSequence.splice(0);

    //Clears the text box if playing again (#says)
    if (roundCount === 1) {
      says.textContent = '';
    }

    //This Math generates a random number between 1 and 4 which is then pushed to simonSequence in the switch below
    let newColor = Math.floor(Math.random() * 4) + 1;

    switch (newColor) {
      case 1:
        simonSequence.push('red');
        break;
      case 2:
        simonSequence.push('blue');
        break;
      case 3:
        simonSequence.push('green');
        break;
      case 4:
        simonSequence.push('yellow');
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
        console.log('game.userResponse() error');
    }
      game.compareSequences();
  },
  compareSequences: function() {
    for (let i = 0; i < userSequence.length; i++) {
      //iterates over both sequences and returns false if they are not exactly the same
      if (userSequence[i] !== simonSequence[i]) {
        says.textContent = 'You guessed wrong. Play again?';

        //re-enables the play button
        playBtn.disabled = false;
        //resets simonSequence and roundCount
        simonSequence.splice(0);
        roundCount = 1;

        return false;
      }
    }

    if (userSequence.length === simonSequence.length) {
      says.textContent = `Correct! Round: ${roundCount}.`;
      //If the two sequences are exactly the same, run addToSequence() again for the next round.
      game.addToSequence();
    }
  }
};

let effects = {
  doEffects: function() {
    let i = 0;
  
    let interval = setInterval(function() {
      effects.addEffect(i);
      effects.removeEffect(i);

      i++;
      if (i >= simonSequence.length) {
        clearInterval(interval);
      }
    }, 800);
  },
  addEffect: function(i) {
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
        console.log('effects.addEffect() error');
    }
  },
  removeEffect: function(i) {
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
          console.log('effects.removeEffect() error');
      }
    }, 400); //Must be half the setInterval() time
  }
};

red.addEventListener('mousedown', game.userResponse);
blue.addEventListener('mousedown', game.userResponse);
green.addEventListener('mousedown', game.userResponse);
yellow.addEventListener('mousedown', game.userResponse);