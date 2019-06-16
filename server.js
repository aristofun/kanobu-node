// JSrush: web KaNoBu game demo (c) goodprogrammer.ru

// Start using express framework
const express = require('express');

// OS path node helper
const path = require('path');

// Our web app instance
let app = express();

// Helper method for views
app.locals.getImages = (choice) => {
  let { userChoice, compChoice } = choice;
  const status = getGameStatus(userChoice, compChoice);

  switch (status) {
    case 1:
      userChoice += '_won';
      compChoice += '_fail';
      break;
    case 2:
      userChoice += '_fail';
      compChoice += '_won';
      break;
    default:
      userChoice += '_draw';
      compChoice += '_draw';
  }

  return { userChoice, compChoice };
};

// Set up path to web server static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up path to views (ejs templates)
app.set('views', path.join(__dirname, 'views'));

// Enable EJS template engine
app.set('view engine', 'ejs');

// choices = ['rock', 'paper', 'scissors']
// return 0 - draw, 1 - choice1 wins, 2 - choice2 wins
function getGameStatus(choice1, choice2) {
  if (choice1 === choice2) {
    return 0;
  } else if (choice1 === 'rock' && choice2 === 'scissors'
    || choice1 === 'paper' && choice2 === 'rock'
    || choice1 === 'scissors' && choice2 === 'paper') {
    return 1;
  } else {
    return 2;
  }
}

// Express handler for GET / requests
app.get('/', (request, response) => {
  const choices = ['rock', 'paper', 'scissors'];
  const statuses = ['Draw 🤝', 'You win! 👍', 'Node wins Ha-Ha-Ha 😈'];

  let gameStatus, userChoice;
  let compChoice = choices[Math.floor(Math.random() * choices.length)];

  // Check correct input query and run the game
  if (choices.includes(request.query.choice)) {
    userChoice = request.query.choice;
    gameStatus = statuses[getGameStatus(userChoice, compChoice)]
  }

  // Render index.ejs template with variables
  response.render('index.ejs', {
    choice: { userChoice, compChoice },
    gameStatus
  });
});

// Set HTTP port from ENV or 3000
const PORT = process.env.PORT || 3000;

// Run express http server
app.listen(PORT, () => console.log('Up and listening on port ' + PORT));