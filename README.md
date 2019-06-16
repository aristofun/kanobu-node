




## Step by step

```

npm init
git init
npm i express
npm i ejs

write server.js 
  1/
  app + listen + "start": "node server.js" + app.get('/')
  cl(request.query)
  
  2/
  static + images (show browser)
  add public/img/ pictures
  
  npm i nodemon -D
  "dev": "nodemon server.js -e js,ejs"

  3/ views
  make views/index.ejs
  locals.gameStatus VS locals['gameStatus']
  
  4/ dynamic views
  EJS conditions
  finish server.js
    function getGameStatus
    let vars and logic
  
  5/ add helper method
  all pictures the same
  add helper method with choice object
  
7/
ready to deploy - gitignore!
`heroku create kanobu-node`  
git push heroku master
heroku open

Homework - more states (https://github.com/KarinaTiurina/rock_paper_scissors/tree/master/app/assets/images)

```

PROFIT!!

https://ejs.co/
https://expressjs.com/en/4x/api.html
https://expressjs.com/en/resources/frameworks.html

   
    
  