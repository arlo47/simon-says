//UI Elements
let red = document.getElementById('red');             // red = 1
let blue = document.getElementById('blue');           // blue = 2
let green = document.getElementById('green');         // green = 3
let yellow = document.getElementById('yellow');       // yellow = 4
let says = document.getElementById('says');
let playBtn = document.getElementById('play-again');
let colorNodeList = document.querySelectorAll('.circle');

let colors = ['red', 'blue', 'green', 'yellow'];
let simonSequence = [];
let userSequence = [];
let roundCount = 1;

//audio variables
let audio = {
  red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

let game = {
  addToSequence: function() {
    playBtn.disabled = true;
    userSequence.splice(0);

    //Clears the text box if playing again (#says)
    if (roundCount === 1) {
      says.textContent = '';
    }
    //Generates a number from 1 to 4, no need for +1 because arrays (colors) are 0 based.
    let randomColor = Math.floor(Math.random() * colors.length);
    //finds what the string related to the randomly generated number is.
    let newColor = colors[randomColor];
    simonSequence.push(newColor);

    roundCount++;
    effects.doEffects();
  },
  userResponse: function(e) {
    userSequence.push(e.target.id);
    audio[e.target.id].play();

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
    let colorIndex = -1;

    switch (simonSequence[i]) {
      case 'red':
        colorIndex = 0;
        break;
      case 'blue':
        colorIndex = 1; 
        break;
      case 'green':
        colorIndex = 2;
        break;
      case 'yellow':
        colorIndex = 3;
        break;
      default:
        console.log('effects.addEffect() error');
    }
    colorNodeList[colorIndex].classList.add('opacity');
    audio[simonSequence[i]].play();
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