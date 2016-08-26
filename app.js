/**
 * Module dependencies.
 */

var express = require('express');
var dao = require('./dao');
var http = require('http');
var path = require('path');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var guard = require('express-jwt-permissions');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var nodemailer = require("nodemailer");
var fs = require("fs");

var secret = 'n8jTwiRYBtJF25Wpk7X1fRvtxDrKs8P5lXP16DqytRwa0Pfa6omupI5YWgGjF3kUeP4F08LeklnwCQGoDMouLZcija8aRZaMEBQdrDSjRp9OGnVrfrZqosHE';

//load daos
var utilisateurs = require('./dao/utilisateurs');
var offres = require('./dao/offres');
var competences = require('./dao/competences');
var rangs = require('./dao/rangs');
var authorize = require('./service/authorize');
var UserController = require('./controller/UserController');

global.filesPath = __dirname + '/files/';

var multipartyMiddleware = multiparty();

var app = express();

app.use('/api', expressJwt({secret: secret}));

var connection = require('express-myconnection');
var mysql = require('mysql');

app.use(multiparty({
    uploadDir: './files'
}));


var content = JSON.parse(fs.readFileSync("mail.json"));

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: content.service,
    auth: {
        user: content.auth.user,
        pass: content.auth.pass
    }
});

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/me', expressJwt({secret: secret}));
app.use('/api', expressJwt({secret: secret}));

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));


// development only
//app.use(express.errorHandler());

/*------------------------------------------
 connection peer, register as middleware
 type koneksi : single,pool and request
 -------------------------------------------*/

app.use(
    connection(mysql, {

        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306, //port mysql
        database: 'mydb'

    }, 'pool') //or single

);

app.use(function (err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

app.get('/checkpass/:pass', function (req, res) {
    bcrypt.hash(req.params.pass, bcrypt.genSaltSync(8), null, function (err, hash) {
        res.send(hash);
    });
});

app.post('/auth', authorize.authorize);

app.get('/', function(req, res) {
    // Prepare the context
    res.render('/app/index.html');
});


app.get('/offre', offres.selectAll);
app.get('/utilisateurByMail/:mail', utilisateurs.selectByMail);
app.get('/savePasswordUtilisateur/:password/:idUtilisateur', utilisateurs.savePassword);
app.get('/api/utilisateur', utilisateurs.selectAll);
app.get('/api/utilisateur/offres/:id', utilisateurs.selectOffresFromUtilisateur);
app.post('/api/utilisateur/add', utilisateurs.insertUtilisateur);
app.post('/api/utilisateur/update/:id', utilisateurs.updateUtilisateur);
app.get('/api/utilisateur/offre/exist/:idUtilisateur/:idOffre', utilisateurs.offreUtilisateurExist);
app.get('/api/utilisateur/offre/nonPostulees/:idUtilisateur', utilisateurs.offresNonPostulees);
app.post('/api/utilisateur/candidat/update/:idUtilisateur', utilisateurs.mettreAJourCommentaireCandidat);
app.post('/api/utilisateur/offre/update/:idUtilisateur/:idOffre', utilisateurs.mettreAJourOffreUtilisateur);
app.post('/api/utilisateur/offre/add/:idUtilisateur/:idOffre', utilisateurs.enregistrerOffreUtilisateur);
app.post('/api/utilisateur/candidatureSpontanee', utilisateurs.enregistrerCandidatureSpontanee);
app.get('/api/utilisateur/delete/:id', utilisateurs.deleteUtilisateur);
app.get('/api/utilisateur/:id', utilisateurs.selectByIdUtilisateur);
app.get('/api/offre', offres.selectAll);
app.get('/api/offre/utilisateurs/:id', offres.selectUtilisateursFromOffre);
app.get('/api/offre/competences/:id', offres.selectCompetencesFromOffre);
app.post('/api/Offre/add', offres.insertOffre);
app.post('/api/Offre/update/:id', offres.updateOffre);
app.get('/api/Offre/activer/:id', offres.activerOffre);
app.get('/api/Offre/desactiver/:id', offres.desactiverOffre);
app.get('/api/Offre/delete/:id', offres.deleteOffre);
app.get('/api/Offre/:id', offres.selectByIdOffre);
app.get('/api/competence', competences.selectAll);
app.post('/api/Competence/add', competences.insertCompetence);
app.post('/api/Competence/update/:id', competences.updateCompetence);
app.get('/api/Competence/activer/:id', competences.activerCompetence);
app.get('/api/Competence/desactiver/:id', competences.desactiverCompetence);
app.get('/api/Competence/delete/:id', competences.deleteCompetence);
app.get('/api/Competence/offre/delete/:id', competences.deleteCompetencesOffre);
app.get('/api/Competence/:id', competences.selectByIdCompetence);
app.get('/api/rang', rangs.selectAll);
app.get('/api/UtilisateursRang/:id', rangs.selectUtilisateursFromRang);
app.post('/api/Rang/add', rangs.insertRang);
app.post('/api/Rang/update/:id', rangs.updateRang);
app.get('/api/Rang/delete/:id', rangs.deleteRang);
app.get('/api/Rang/:id', rangs.selectByIdRang);
app.post('/api/upload', multipartyMiddleware, UserController.uploadFile);
app.get('/api/download', multipartyMiddleware, UserController.downloadFile);
app.get('/api/send',function(req,res){

    if(req.query.RH == "1"){

        console.log(req.query.curriculum_vitae);
        console.log(req.query.lettre_de_motivation);

        var CVname = path.join(filesPath,req.query.curriculum_vitae);
        var LMname = path.join(filesPath,req.query.lettre_de_motivation);

        console.log(CVname);
        console.log(LMname);

        var mailOptions={
            to : req.query.to,
            subject : req.query.subject,
            text : req.query.text,
            attachments : [
                {
                    fileName: req.query.curriculum_vitae,
                    filePath : CVname
                },
                {
                    fileName: req.query.lettre_de_motivation,
                    filePath : LMname
                }
            ]
        }
    }else{
        var mailOptions={
            to : req.query.to,
            subject : req.query.subject,
            text : req.query.text
        }
    }




    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
app.get('/sendNewPassword',function(req,res){


    var mailOptions= {
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.text
    }

    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});

app.get('/me', function (req, res) {
    res.json({
        id: req.user.id,
        nom: req.user.nom,
        prenom: req.user.prenom,
        email: req.user.email,
        hash: req.user.hash,
        role: req.user.role
    });
});

app.use(app.router);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
