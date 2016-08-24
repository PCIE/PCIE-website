var fs = require('fs');
var path = require('path');

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

            var query = connection.query("UPDATE utilisateur set curriculum_vitae=? WHERE idUtilisateur = ?", [file.name,req.body.idUtilisateur], function (err, rows) {

                if (err)
                    console.log("Error Selecting : %s ", err);

                res.send("OK");


            });
        });
    }
    if(req.body.ref=='LM'){

        console.log("mettre A Jour LM");
        req.getConnection(function (err, connection) {

            var query = connection.query("UPDATE utilisateur set lettre_de_motivation=? WHERE idUtilisateur = ?", [file.name,req.body.idUtilisateur], function (err, rows) {

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

    console.log(path.join(filesPath,fileName));

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader("Content-Disposition", "attachment");

    res.download(path.join(filesPath,fileName), fileName);
}

module.exports = new UserController();