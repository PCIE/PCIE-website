/*
 * GET users listing.
 */

exports.selectAll = function (req, res) {

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT * FROM rang', function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.selectUtilisateursFromRang = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('SELECT  u.* , r.* FROM  utilisateur u, rang r WHERE r.idRang = ? AND u.idRang = r.idRang;', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.selectByIdRang = function (req, res) {

    var id = req.params.id;
    console.log(id);

    req.getConnection(function (err, connection) {


        var query = connection.query("SELECT * FROM rang WHERE idRang=?", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.json(rows);


        });

        //console.log(query.sql);
    });

};

exports.insertRang = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);

    req.getConnection(function (err, connection) {

        var data = {

            role: input.role,
        };


        var query = connection.query("INSERT INTO rang set ? ", data, function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/rang');


        });

        //console.log(query.sql);
    });

};

exports.updateRang = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            role: input.role,

        };

        var query = connection.query("UPDATE rang set ? WHERE idRang = ? ", [data, id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/rang');


        });

        //console.log(query.sql);
    });

};


exports.deleteRang = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query("DELETE FROM rang  WHERE idRang= ? ", [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err)

            res.redirect('/rang');

        });

        //console.log(query.sql);
    });

};
