require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');

const PORT = 4000;

const app = express()

const { CONNECTION_STRING, SESSION_SECRET } = process.env

app.use(express.json())

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: SESSION_SECRET
}));

// ! Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.delete('/auth/logout', authCtrl.logout)

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('I see the DB')
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
});



