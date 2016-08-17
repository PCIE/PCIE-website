/*
 * GET users listing.
 */

exports.selectAll = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM tag', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.selectOffresFromTag = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT  o.* , t.* FROM  offre o, tag t WHERE t.idTag = ? AND o.idOffre = t.idOffre;', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.selectByIdTag = function (req, res) {

    var id = req.params.id;
    console.log(id);

    req.getConnection(function (err, connection) {


        var query = connection.query("SELECT * FROM tag WHERE idTag=?", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.insertTag = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var data = {

            description: input.description,
            idOffre: input.idOffre
        };


        var query = connection.query("INSERT INTO tag set ? ", data, function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/tag');


        });

        //console.log(query.sql);
    });

};

exports.updateTag = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            description: input.description,
            idOffre: input.idOffre

        };

        var query = connection.query("UPDATE tag set ? WHERE idTag = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/tag');


        });

        //console.log(query.sql);
    });

};


exports.deleteTag = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM tag  WHERE idTag= ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err)

            res.redirect('/tag');

        });

        //console.log(query.sql);
    });

};
