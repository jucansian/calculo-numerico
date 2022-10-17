let matriz = [
  [1, 4, 1],
  [3, 1, -1],
  [-5, 13, -22],
];

let matrizResult = [7, 3, 48];

function deixaLinhasPositivas(matriz, matrizResult) {
  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i][0] < 0) {
      for (let j = 0; j < matriz[i].length; j++) {
        matriz[i][j] = matriz[i][j] * -1;
      }

      matrizResult[i] = matrizResult[i] * -1;
    }
  }
}

function realizaPivoteamento(matriz, matrizResult) {
  let indiceMaior = 0;
  let maior = matriz[indiceMaior];
  let maiorResult = matrizResult[indiceMaior];

  for (let i = 0; i < matriz.length; i++) {
    if (matriz[i][0] > maior[0]) {
      maior = matriz[i];
      maiorResult = matrizResult[i];
      indiceMaior = i;
    }
  }

  if (indiceMaior != 0) {
    let maiorAux = matriz[0];
    let maiorResultAux = matrizResult[0];

    matriz[0] = maior;
    matrizResult[0] = maiorResult;

    matriz[indiceMaior] = maiorAux;
    matrizResult[indiceMaior] = maiorResultAux;
  }
}

function realizaMMCLinhasEZera(matriz, matrizResult) {
  let cont = 0;
  while (cont < 2) {
    for (let i = cont + 1; i < matriz.length; i++) {
      let pivo = JSON.parse(JSON.stringify(matriz[cont]));
      let pivoResult = JSON.parse(JSON.stringify(matrizResult[cont]));

      let linhaAtual = JSON.parse(JSON.stringify(matriz[i]));
      let linhaResultAtual = JSON.parse(JSON.stringify(matrizResult[i]));

      //   if (cont == 1) console.log("Pivo Result: ", pivoResult);

      for (let j = 0; j < pivo.length; j++) {
        pivo[j] = pivo[j] * linhaAtual[cont];
      }
      pivoResult = pivoResult * linhaAtual[cont];

      for (let j = 0; j < pivo.length; j++) {
        linhaAtual[j] = linhaAtual[j] * matriz[cont][cont];
      }
      linhaResultAtual = linhaResultAtual * matriz[cont][cont];

      for (let j = 0; j < matriz[i].length; j++) {
        matriz[i][j] = pivo[j] - linhaAtual[j];
      }
      matrizResult[i] = pivoResult - linhaResultAtual;
    }
    cont++;
  }
}

function ifNull(item) {
  if (item == null || item == undefined || item == "") return 0;

  return parseInt(item);
}

function descobreIcognitas(matriz, matrizResult) {
  let obj = {};

  for (let i = matriz.length - 1; i >= 0; i--) {
    let linha = matriz[i];
    let linhaResult = matrizResult[i];

    let resultadoIcognita = linhaResult;
    for (let j = 0; j < matriz.length; j++) {
      if (j != i) {
        resultadoIcognita =
          resultadoIcognita - ifNull(obj["x" + j]) * ifNull(linha[j]);
      }
    }
    obj["x" + i] = resultadoIcognita / linha[i];
  }

  return obj;
}

function eliminacao_gauss(matriz, matrizResult) {
  deixaLinhasPositivas(matriz, matrizResult);
  realizaPivoteamento(matriz, matrizResult);
  realizaMMCLinhasEZera(matriz, matrizResult);
  console.log("===7===RESULTADO=====")
  const obj = descobreIcognitas(matriz, matrizResult);
  console.table(obj);
}

eliminacao_gauss(matriz, matrizResult);