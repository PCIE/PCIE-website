/*
 * GET users listing.
 */
var bcrypt = require('bcrypt-nodejs');

exports.selectAll = function (req, res) {

    req.getConnection(function (err, connection) {

        if (err)
            console.log("Error Selecting : %s ", err);

        var query = connection.query('SELECT * FROM utilisateur', function (err, rows) {
            res.json(rows);
        });

        //console.log(query.sql);
    });

};

exports.selectOffresFromUtilisateur = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        if (err)
            console.log("Error Selecting : %s ", err);

        var query = connection.query('SELECT u.*, o.*, uo.* FROM utilisateur u, offre o, utilisateur_has_offre uo WHERE u.idUtilisateur = ? AND o.idOffre = uo.idOffre AND uo.idUtilisateur = u.idUtilisateur;', [id], function (err, rows) {
            res.json(rows);
        });
        //console.log(query.sql);
    });
};

exports.selectByIdUtilisateur = function (req, res) {

    var id = req.params.id;
    console.log(id);

    req.getConnection(function (err, connection) {


        var query = connection.query("SELECT * FROM utilisateur WHERE idUtilisateur=?", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            console.log("utilisateur", rows);

            res.json(rows);

        });

        //console.log(query.sql);
    });

};

exports.insertUtilisateur = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    console.log("in "+JSON.stringify(input));

    var passhashed = null;
    bcrypt.hash(input.password, bcrypt.genSaltSync(8), null, function (err, hash) {
        passhashed = hash;
    });


    /*app.bcrypt.hash(req.body.password, bcrypt.genSaltSync(8), null, function (err, hash) {

        // valider et securiser les infos reçues

        /*db.none("insert into utilisateur(nom, prenom, email, hash, role) values(${nom}, ${prenom}, ${email}, ${hash}, ${role})", utilisateur)

         .then(function (data) {
         res.send('ok');
         })
         .catch(function (error) {
         res.send(error);
         });
         */

        req.getConnection(function (err, connection) {

            var data = {

                nom: input.nom,
                prenom: input.prenom,
                voie: input.voie,
                code_postal: input.code_postal,
                ville: input.ville,
                telephone_fixe: input.telephone_fixe,
                telephone_portable: input.telephone_portable,
                mail: input.mail,
                idrang : 2,
                hash : passhashed
                //password: input.password,

            };

            var query = connection.query("INSERT INTO utilisateur set ? ", data, function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.redirect('/utilisateur');

            });

        });

};

exports.updateUtilisateur = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            nom: input.nom,
            prenom: input.prenom,
            voie: input.voie,
            code_postal: input.code_postal,
            ville: input.ville,
            telephone_fixe: input.telephone_fixe,
            telephone_portable: input.telephone_portable,
            mail: input.mail,
            hash: input.hash,
            idrang: input.idrang

        };

        var query = connection.query("UPDATE utilisateur set ? WHERE idUtilisateur = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/utilisateur');


        });

        //console.log(query.sql);
    });

};

 exports.enregistrerOffreUtilisateur = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var idUtilisateur = req.params.idUtilisateur;
    var idOffre = req.params.idOffre;

    console.log("Enregistrer Offre Utilisateur");

    req.getConnection(function (err, connection) {

        var data = {
            salaire_actuel : input.salaire_actuel,
            salaire : input.salaire,
            preavis : input.preavis
        };

        var query = connection.query("INSERT INTO utilisateur_has_offre SET idUtilisateur= ? , idOffre = ?, salaire_actuel=?, salaire = ?, preavis = ? ", [idUtilisateur,idOffre,data.salaire_actuel, data.salaire,data.preavis], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
        });

        //console.log(query.sql);
    });

};

exports.offreUtilisateurExist = function (req, res) {

    var idUtilisateur = req.params.idUtilisateur;
    var idOffre = req.params.idOffre;

    console.log("mettre A Jour Commentaire Candidat");

    req.getConnection(function (err, connection) {

        var query = connection.query("SELECT * from utilisateur_has_offre WHERE idUtilisateur = ? AND idOffre = ?", [idUtilisateur,idOffre], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            numRows = rows.length;
            res.json({numRows:numRows});
        });



        //console.log(query.sql);
    });

};



exports.offresNonPostulees = function (req, res) {

    var idUtilisateur = req.params.idUtilisateur;

    console.log("mettre A Jour Commentaire Candidat");

    req.getConnection(function (err, connection) {

        var query = connection.query("SELECT * from offre o WHERE NOT EXISTS ( SELECT idOffre FROM utilisateur_has_offre uo WHERE uo.idOffre =  o.idOffre AND uo.idUtilisateur=? )", [idUtilisateur], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);
        });

        //console.log(query.sql);
    });

};

exports.mettreAJourOffreUtilisateur = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var idUtilisateur = req.params.idUtilisateur;
    var idOffre = req.params.idOffre;

    console.log("mettre A Jour Offre Utilisateur");

    req.getConnection(function (err, connection) {

        var data = {
            salaire_actuel : input.salaire_actuel,
            salaire : input.salaire,
            preavis : input.preavis
        };

        var query = connection.query("UPDATE utilisateur_has_offre SET salaire_actuel=?, salaire = ?, preavis = ? WHERE idUtilisateur = ? AND idOffre = ?", [data.salaire_actuel, data.salaire,data.preavis,idUtilisateur,idOffre], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
        });

        //console.log(query.sql);
    });

};

exports.mettreAJourCommentaireCandidat = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var idUtilisateur = req.params.idUtilisateur;
    var idOffre = req.params.idOffre;

    console.log("mettre A Jour Commentaire Candidat");

    req.getConnection(function (err, connection) {

        var data = {
            commentaires_candidat : input.commentaires_candidat,
            commentaires_candidature : input.commentaires_candidature
        };

        var query = connection.query("UPDATE utilisateur_has_offre SET commentaires_candidat = ?, commentaires_candidature = ? WHERE idUtilisateur = ? AND idOffre = ?", [data.commentaires_candidat,data.commentaires_candidature,idUtilisateur,idOffre], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);
        });

        //console.log(query.sql);
    });

};

exports.deleteUtilisateur = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM utilisateur  WHERE idUtilisateur = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/utilisateur');

        });

        //console.log(query.sql);
    });

};
