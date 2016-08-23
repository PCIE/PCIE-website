/*
 * GET users listing.
 */

exports.selectAll = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM competence', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.selectByIdCompetence = function (req, res) {

    var id = req.params.id;
    console.log(id);

    req.getConnection(function (err, connection) {


        var query = connection.query("SELECT * FROM competence WHERE idCompetence=?", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.insertCompetence = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    console.log("input" ,input);

    req.getConnection(function (err, connection) {

        var data = {
            titre : input.titre,
            description: input.description,
            active : input.active
        };


        var query = connection.query("INSERT INTO competence set ? ", data, function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/competence');


        });

        //console.log(query.sql);
    });

};

exports.updateCompetence = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            titre : input.titre,
            description: input.description,
            active : input.active

        };

        var query = connection.query("UPDATE competence set ? WHERE idCompetence = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/competence');


        });

        //console.log(query.sql);
    });

};

exports.activerCompetence = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("UPDATE competence set active=1 WHERE idCompetence = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/competence');


        });

        //console.log(query.sql);
    });

};


exports.desactiverCompetence = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("UPDATE competence set active=0 WHERE idCompetence = ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/competence');


        });

        //console.log(query.sql);
    });

};

exports.deleteCompetence = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM competence  WHERE idCompetence= ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err)

            res.redirect('/competence');

        });

        //console.log(query.sql);
    });

};

exports.deleteCompetencesOffre = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM competence  WHERE idOffre= ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err)

            res.redirect('/competence');

        });

        //console.log(query.sql);
    });

};



/**
 * Created by P10-PCIE-MAF on 19/08/2016.
 */
