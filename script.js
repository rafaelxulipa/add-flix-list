function adicionarCapa() {
  let campoNome = document.querySelector("#capa");
  const nome = campoNome.value;
  buscaIMDB(nome.replaceAll(" ", "_"));
  campoNome.value = "";
}

function tratamentoIMDB(jsonIMDB) {
  const urlImagem = jsonIMDB.d[0].i[0];
  const nomeObra = jsonIMDB.d[0].l;
  const idObra = jsonIMDB.d[0].id;
  const ano = jsonIMDB.d[0].y;

  if (urlImagem.endsWith(".jpg")) {
    listarCapasNaTela(urlImagem, nomeObra, idObra, ano);
  } else {
    alert("URL de imagem inválida");
  }
}

function listarCapasNaTela(urlImagemCapa, nomeObra, idObra, ano) {
  const listaCapas = document.querySelector("#listaCapas");
  const elementoCapa =
    '<div id="capa"><a target=_blank alt="' +
    nomeObra +
    '" href="' +
    urlImagemCapa +
    '"><img width="182" height="268" src="' +
    urlImagemCapa +
    '"></a><p><b><a target=_blank alt="' +
    nomeObra +
    '" href="https://www.imdb.com/title/' +
    idObra +
    '/">' +
    nomeObra +
    "</a></b></p><p>" +
    ano +
    "</p></div>";
  listaCapas.innerHTML = listaCapas.innerHTML + elementoCapa;
}

function buscaIMDB(nome) {
  const comprimento = 6 + nome.length;

  $.getJSON(
    "https://api.allorigins.win/get?url=https%3A//sg.media-imdb.com/suggests/" +
      nome[0].toLowerCase() +
      "/" +
      nome +
      ".json&callback=?",
    function (data) {
      const retorno = data.contents.substr(
        comprimento,
        data.contents.length - comprimento - 1
      );
      tratamentoIMDB(JSON.parse(retorno));
    }
  );
}