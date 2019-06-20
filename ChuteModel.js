const mongoose = require("mongoose");
const mongocon = require("./mongocon");
mongoose.Promise = global.Promise;

const chuteSchema = mongoose.Schema({
    teoria: {
        type: String,
        require: true
    },
    retorno: {
        type: String,
        require: true
    }
});

var Chute = mongoose.model("Chute", chuteSchema);

function salvarChuteNoMongoDB(teoria, retorno){

    mongocon.mongoDbConnection("chutes");

    var guardarChute = new Chute({
        teoria: teoria,
        retorno: retorno 
    })

    guardarChute.save().then(() => {
        console.log("Chute salvo");
    }).catch((err) => {
        console.log("Erro ao salvar chute " + err);
    }); 

}

module.exports.Chute = Chute;
module.exports.salvarChuteNoMongoDB = salvarChuteNoMongoDB;
