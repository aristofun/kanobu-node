// Подключаем библотеки экспресс и шаблонизатор handlebars
const express = require('express');
const hbs = require('hbs');

// Экзмпляр нашего приложения
let app = express();

// Добавляем метод-хелпер для шаблонов
hbs.registerHelper('noCache', () => {
  return Math.random().toString(36).substring(2);
});

// Подключаем папку со статикой и шаблонизатор hbs
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

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

// Header страницы - победа или поражение
// Title страницы - подробный расклад

// Обработчик HTTP GET запроса в корне сайта
app.get('/', (request, response) => {
  // Возможные варианты для выбора игроком
  let choices = ['rock', 'paper', 'scissors'];

  // Варианты исхода игры
  let statuses = ['Ничья', 'Вы победили :)', 'Нода победила :('];

  // Переменные для статуса игры, выбора игрока и выбора ноды
  let gameStatus;
  let userChoice = request.query.choice;
  let compChoice = choices[Math.floor(Math.random() * choices.length)];

  // Если от юзера пришел корректный выбор - разыгрываем комбинацию и сохраняем исход игры
  if (choices.includes(userChoice)) {
    gameStatus = `${statuses[getGameStatus(userChoice, compChoice)]}`
  } else {
    // Если выбор некорректный зануляем, чтобы в шаблон не передать левые данные
    userChoice = null;
  }

  // Рендерим index.hbs шаблон с рассчитанными параметрами
  response.render('index', {
    choice: {user: userChoice, node: compChoice},
    gameStatus
  });
});

// Порт выбираем из переменных окружения или 3000 по умолчанию
const PORT = process.env.PORT || 3000;

// Запускаем приложение в работу
app.listen(PORT, () => console.log('Up and listening on port ' + PORT));