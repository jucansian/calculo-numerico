var valor_inicial = {
    x1: 0,
    x2: 0,
    x3: 0
};

function calcula_erro(valor_inicial, valor_atual) {
    let erro = (valor_atual - valor_inicial) / valor_atual;
    if(erro < 0)
        erro = erro * -1;

    return erro; 
}

let i = 0;

const erro_maximo = 0.05;

function calcula_jacobi(obj) {
    let x1Plus1 = (3 - obj.x2 + obj.x3) / 3;
    let x2Plus1 = (7 - obj.x1 - obj.x3) / 4;
    let x3Plus1 = (48 + (5 * obj.x1) - (13 * obj.x2)) / -22;

    let erro1 = calcula_erro(obj.x1, x1Plus1);
    let erro2 = calcula_erro(obj.x2, x2Plus1);
    let erro3 = calcula_erro(obj.x3, x3Plus1);

    if ((erro1 < erro_maximo && erro2 < erro_maximo && erro3 < erro_maximo) || i == 100) {
        console.log("\n\nAcabou...\n\n");
        return;
    }

    console.table(obj);

    obj.x1 = x1Plus1;
    obj.x2 = x2Plus1;
    obj.x3 = x3Plus1;

    i++;
    calcula_jacobi(obj);
}

calcula_jacobi(valor_inicial);