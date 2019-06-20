const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

function mongoDbConnection(databaseName){
    mongoose.connect("mongodb://localhost/" + databaseName).then(() => {
        console.log("Conectado ao banco...");
    }).catch((err) => {
        console.log("Erro ao conectar ao banco " + err);
    });
}

module.exports.mongoDbConnection = mongoDbConnection;