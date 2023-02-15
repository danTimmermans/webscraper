const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
// pour resoudre un message d'erreur venant du bloquage par la cors policy, installer le package cors avec npm i cors puis appeler cors dans express comme ci-dessous
// const cors = require('cors')
// app.use(cors())


const app = express();

const url = 'https://www.theguardian.com/uk'
// axios se connecte à l'url du site choisi et envoie une requête async. une fois resolue puis on utilise cheerio pour charger l'html de la page web

// app.METHOD(PATH, HANDLER)
// .get .post .put & .delete viennent avec express
// app.get() pour recupérer des données d'une ressource (PATH)
//  app.post() pour ajouter des données à une ressource (PATH)
//  app.put() pour editer des données
// app.delete() pour effacer des données
// PATH est le chemin sur le serveur 
// HANDLER est un callback() qui va s"executer lorsqu'on visite le PATH
// app.get('/', function(req,res){
//     res.json('this is my webscraper')
// })

app.get('/results', (req,res)=>{
    axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        // on crée unarray pour stocker les resultat des requetes 
        const articles = []
        // on va chercher chaque element html qui a la classe fc-item__title et on lui assigne une fct callback qui va recupérer son texte (().text) et chercher tous les 'a' et recupérer leur attribut 'href'
        $('.fc-item__title', html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            // on push dans l'array un objet qui contient title et url
            articles.push({
                title,
                url
            })
        })
        console.log(articles);
        res.json(articles)
    }).catch(err => console.log(err))
})




app.listen(PORT, ()=> console.log('server running on port ${PORT}'))

// npm init pour creer un dossier json
// on installe express (backend framework pour nodejs) qui "ecoute" les chemins et le PORT utilisé -- npm i express
// on installe cheerio pour recupérer l'html d'une page web (très proche de jQuery pour l'implémentation) -- npm i cheerio
// on installe axios (est un client http pour browsers et nodejs) pour les requetes, pour aller chercher, poster et éffacer des données
// dans le package json on ecrit un script start pour démarrer l'app avec la commande npm run start
// "scripts": {
//     "start": "nodemon index.js"
// nodemon ecoute tout les changements quise passent dans index.js
//   },