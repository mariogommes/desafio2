function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function atualizaListas(lista, banishList){
    var novaLista = [];
    lista.forEach(element => {    
        if (!banishList.includes(element)) {
            novaLista.push(element);
        }
    });
    return novaLista;
}

function getChute(todosSuspeitos, todosLocais, todasArmas){
  return [todosSuspeitos[getRandomInt(0, todosSuspeitos.length)], todosLocais[getRandomInt(0, todosLocais.length)], todasArmas[getRandomInt(0, todasArmas.length)]];
}

  module.exports.getChute = getChute;
  module.exports.atualizaListas = atualizaListas;
  module.exports.getRandomInt = getRandomInt;