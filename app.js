// #Importando modulos
const express = require("express");
const handlebars = require("express-handlebars"); 
const bodyParser = require("body-parser"); 
const routes = express();
const utils = require("./utils");
const respostaobj = require("./acharResposta");
const mapas = require("./mapas");
const chuteModel = require("./ChuteModel");
const mongocon = require("./mongocon");

// #Configurações

// Configurando handlebars como template engine
routes.engine("handlebars", handlebars({defaultLayout:"main"}));
routes.set("view engine", "handlebars");

// Configurando o body parser
routes.use(bodyParser.urlencoded({extended:false}));
routes.use(bodyParser.json());

// Configurando pasta para(CSS, JS(do front end) e imagens)
routes.use(express.static("public"));

// #Rotas

const verdade = utils.getChute(respostaobj.todosSuspeitos, respostaobj.todosLocais, respostaobj.todasArmas);

routes.get("/", (req, res) => {
    console.log(verdade);
    res.render(__dirname + "/views/layouts/formulario.handlebars", {
        title: "Achar assasino",
        style: "main.css"
    });
});

routes.post("/", (req, res) => {

    var chute = [mapas.todosSuspeitosMapa.get(parseInt(req.body.suspeito)), mapas.todosLocaisMapa.get(parseInt(req.body.local)), mapas.todasArmasMapa.get(parseInt(req.body.arma))];

    if (chute[0] != verdade[0] && chute[1] === verdade[1] && chute[2] === verdade[2]) {

        var teoria = "teoria: " + String(req.body.suspeito) + " " + String(req.body.local) + " " + String(req.body.arma);
        var retorno =  "retorno: 1" ;

        chuteModel.salvarChuteNoMongoDB(teoria, retorno);
        chuteModel.Chute.find().then((chutes) => {
            res.render(__dirname + "/views/layouts/formulario.handlebars", {
                title: "Achar assasino",
                style: "main.css",
                script:"main.js",
                resp: chutes
            })
        })   
    }
    else if (chute[1] != verdade[1] && chute[0] === verdade[0] && chute[2] === verdade[2]) {

        var teoria = "teoria: " + String(req.body.suspeito) + " " + String(req.body.local) + " " + String(req.body.arma);
        var retorno = "retorno: 2" ;

        chuteModel.salvarChuteNoMongoDB(teoria, retorno);

        chuteModel.Chute.find().then((chutes) => {
            res.render(__dirname + "/views/layouts/formulario.handlebars", {
                title: "Achar assasino",
                style: "main.css",
                script:"main.js",
                resp: chutes
            });
        })      
    }
    else if (chute[2] != verdade[2] && chute[1] === verdade[1] && chute[0] === verdade[0]) {

        var teoria = "teoria: " + String(req.body.suspeito) + " " + String(req.body.local) + " " + String(req.body.arma);
        var retorno =  "retorno: 3" ;
        chuteModel.salvarChuteNoMongoDB(teoria, retorno);

        chuteModel.Chute.find().then((chutes) => {
            res.render(__dirname + "/views/layouts/formulario.handlebars", {
                title: "Achar assasino",
                style: "main.css",
                script:"main.js",
                resp: chutes
            });
        })
    }
    else if (chute[2] === verdade[2] && chute[1] === verdade[1] && chute[0] === verdade[0]) {

        var teoria = "teoria: " + String(req.body.suspeito) + " " + String(req.body.local) + " " + String(req.body.arma);
        var retorno =  "retorno: 0" ;

        chuteModel.salvarChuteNoMongoDB(teoria, retorno);

        chuteModel.Chute.find().then((chutes) => {
            res.render(__dirname + "/views/layouts/formulario.handlebars", {
                title: "Achar assasino",
                style: "main.css",
                script:"main.js",
                resp: chutes
            });
        })
    }
    else{

        var teoria = "teoria: " + String(req.body.suspeito) + " " + String(req.body.local) + " " + String(req.body.arma);
        var retorno = "retorno: " + utils.getRandomInt(1,3);

        chuteModel.salvarChuteNoMongoDB(teoria, retorno);

        chuteModel.Chute.find().then((chutes) => {
            res.render(__dirname + "/views/layouts/formulario.handlebars", {
                title: "Achar assasino",
                style: "main.css",
                script:"main.js",
                resp: chutes
            });
        })
    }
});

routes.post("/reiniciarChutes", (req, res) => {
    chuteModel.Chute.remove({}, () => {
        console.log("database Chutes deletada...");
    }).then(
        res.send("Chutes reiniciados, pode começar de novo <a href=\"http://localhost:3000/\">AQUI<\a>")
    ).catch(
        res.send("Não foi possível reiniciar os chutes")
    );
});

routes.listen(3000, function(){
    console.log("listening @ http://localhost:3000"); 
});