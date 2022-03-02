const express = require('express');
const app = express();
const mongoose = require('mongoose');
const stuffRouters = require('./routes/stuff');
const userRoutes = require('./routes/user')
const path = require('path'); // donne accès au chemin du système de fichier

app.use(express.json());// implique que App peut recevoir  des json

// import Thing from "./models/Thing"

mongoose.connect('mongodb+srv://prince:SoMkO1HDx60rdpbm@cluster0.ns5tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Middlware
/*app.use((req, res, next)=>{
    console.log("Requete reçu");
    next();
})

app.use((req,res,nex)=>{
    res.status(301);
    
});

*/
//By Prince Nzanzu
// définition du header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use ('/api/stuff', stuffRouters); //On utilise le routeur exposé par stuffRouters
app.use ('/api/auth', userRoutes);


module.exports = app;