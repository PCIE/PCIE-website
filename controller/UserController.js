var fs = require('fs');

UserController = function() {};

UserController.prototype.uploadFile = function(req, res) {
    // We are able to access req.files.file thanks to 
    // the multiparty middleware
    var file = req.files.file;

    console.log(req.files.file);

    fs.rename(file.path,'./files/'+file.name);

    if(req.body.ref=='CV'){

        console.log("mettre A Jour CV");
        req.getConnection(function (err, connection) {

            var query = connection.query("UPDATE utilisateur_has_offre set curriculum_vitae=? WHERE idUtilisateur = ? AND idOffre=?", [file.name,req.body.idUtilisateur,req.body.idOffre], function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.send("OK");


            });
        });
    }
    if(req.body.ref=='LM'){

        console.log("mettre A Jour LM");
        req.getConnection(function (err, connection) {

            var query = connection.query("UPDATE utilisateur_has_offre set lettre_de_motivation=? WHERE idUtilisateur = ? AND idOffre=?", [file.name,req.body.idUtilisateur,req.body.idOffre], function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.send("OK");
            });
        });
    }

}

UserController.prototype.downloadFile = function(req, res) {

    var fileName = req.query.name;

    console.log(fileName);

    console.log(filesPath);

    res.download(filesPath+fileName, fileName);
}

module.exports = new UserController();