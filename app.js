const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sana:sanaiscool@cluster0.2ym25rn.mongodb.net/test'

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const shelterRoutes = require('./routes/shelter');
const catsRoutes = require('./routes/cats');
const humensRoutes = require('./routes/humens');
const errorController = require('./controllers/404');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shelterRoutes);
app.use(catsRoutes);
app.use(humensRoutes);
app.use(errorController.get404);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        console.log('CONNECTED!');
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    })