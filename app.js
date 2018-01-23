let simonSequence = [];
let userSequence = [];
let roundCount = 1;

//UI Elements
let red = document.getElementById('red');             // red = 1
let blue = document.getElementById('blue');           // blue = 2
let green = document.getElementById('green');         // green = 3
let yellow = document.getElementById('yellow');       // yellow = 4
let says = document.getElementById('says');
let playBtn = document.getElementById('play-again');
let colorNodeList = document.querySelectorAll('.circle');

//Color names
let colors = ['red', 'blue', 'green', 'yellow'];
//Color Indices
let colorIndices = {
  red: 0,
  blue: 1,
  green: 2,
  yellow: 3
};

//Audio Elements
let audio = {
  red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3')
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
    let color = simonSequence[i];
    let colorIndex = colorIndices[color];

    colorNodeList[colorIndex].classList.add('opacity');
    audio[color].play();
  },
  removeEffect: function(i) {
    setTimeout(function() {
      let color = simonSequence[i];
      let colorIndex = colorIndices[color];

      colorNodeList[colorIndex].classList.remove('opacity');
    }, 400); //Must be half the setInterval() time
  }
};

red.addEventListener('mousedown', game.userResponse);
blue.addEventListener('mousedown', game.userResponse);
green.addEventListener('mousedown', game.userResponse);
yellow.addEventListener('mousedown', game.userResponse);