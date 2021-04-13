const express = require('express');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});

const app = express();

app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('success')
})

//LOGIN

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })


//REGISTER

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });


//PROFILE

app.get('/profile/:id', (req, res) => { profile.profileHandle(req, res, db) })

//IMAGE

app.put('/image', (req, res) => { image.handleImage(req, res, db) });
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });


// bcrypt.hash('bacon', null, null, function(err,hash) {

// })

// bcrypt.compare('bacon', hash, function(err,hash) {

// })

// bcrypt.compare('veggies', hash, function(err,hash) {

// })

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})