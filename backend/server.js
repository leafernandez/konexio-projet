const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Connexion à la base de donnée
const uri = "mongodb://localhost/konexioDB";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connecté à mongoDB");
})

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'));

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});