const express = require('express');
const db = require('./src/connection/db');
const hw2 = require('./src/halo/functions');

const app = express();
const bodyParser = require('body-parser');

app.use(express.json()); // if needed

const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({
    express: 'Hello From Express'
  });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/api/players', async (req, res) => {
  data = await db.getValues()
  data.sort(function (a, b) {
      return a.history.custom.timeAgo.seconds - b.history.custom.timeAgo.seconds
  })
  res.send(data)
});

app.post('/api/addplayer', (req, res) => {

  var playerName = req.body.post

  hw2.getValidName(playerName).then(async (result) => {
    var db_bool = await db.insertValue({
        _id: result,
        gamertag: result
      })

      /**
       * @todo FIX LOGIC FOR ENTRIES
       */
      
      console.log(db_bool);

      if (db_bool){
        res.send(`${result} successfully added to database.`)
      } else {
        res.send(`${result} already exists in database.`)
      }
    }).catch((err) => {
      success = false
      res.send(err)  
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));