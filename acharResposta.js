const utils = require("./utils");

var todosSuspeitos = [
    'Charles B. Abbage',
    'Donald Duck Knuth',
    'Ada L. Ovelace',
    'Alan T. Uring',
    'Ivar J. Acobson',
    'Ras Mus Ler Dorf'
];

var todosLocais = [
    'Redmond',
    'Palo Alto',
    'San Francisco',
    'Tokio',
    'Restaurante no Fim do Universo',
    'São Paulo',
    'Cupertino',
    'Helsinki',
    'Maida Vale',
    'Toronto'
];

var todasArmas = [
    'Peixeira',
    'DynaTAC 8000X (o primeiro aparelho celular do mundo)',
    'Trezoitão',
    'Trebuchet',
    'Maça',
    'Gládio'
];

function acharResposta(verdade){

    var resposta = [];
    var banishList = ["0"];

    while(true) {
        
        var chute = utils.getChute(todosSuspeitos, todosLocais, todasArmas);

        if (chute[0] === verdade[0]  && !resposta[0]) {
            resposta[0] = chute[0];
            banishList.push(chute[0]);
            console.log("acertou assasino");
        }
        else if(!resposta[0]){
            banishList.push(chute[0]);
            console.log("Errou o assasino");
        }

        if (chute[1] === verdade[1] && !resposta[1]) {
            resposta[1] = chute[1];
            banishList.push(chute[1]);
            console.log("acertou local");
        }
        else if(!resposta[1]){
            banishList.push(chute[1]);
            console.log("Errou o local");
        }

        if (chute[2] === verdade[2] && !resposta[2]) {
            resposta[2] = chute[2];
            banishList.push(chute[2]);
            console.log("acertou arma");
        }
        else if(!resposta[2]){
            banishList.push(chute[2]);
            console.log("Errou a arma");
        }

        if (verdade[0] === resposta[0] && verdade[1] === resposta[1] && verdade[2] === resposta[2]) {
            break;
        }

        todosSuspeitos = utils.atualizaListas(todosSuspeitos, banishList);
        todosLocais = utils.atualizaListas(todosLocais, banishList);
        todasArmas = utils.atualizaListas(todasArmas, banishList);
    }
    return resposta;
}

module.exports.acharResposta = acharResposta;
module.exports.todosSuspeitos = todosSuspeitos;
module.exports.todosLocais = todosLocais;
module.exports.todasArmas = todasArmas;