const URL_API_SWAPI_GET_PEOPLE = "https://swapi.co/api/people";
const resultadosPorPagina = 10;
const selectP = document.querySelector("#selectPersonagem");
const carregando = document.querySelector("#carregando");
let personagens = [];
let totalPersonagens;
let pageNumber = 1;

let arrayApi = [];

function ordenar(itemA, itemB) {
  if (itemA.name < itemB.name) return -1;
  if (itemA.name > itemB.name) return 1;
  return 0;
}

// consome api para buscar personagens
async function buscarPersonagens(pageNumber) {
  console.log("aqui", pageNumber);
  let response = await $.getJSON(
    URL_API_SWAPI_GET_PEOPLE,
    {
      page: pageNumber
    },
    function(data) {
      totalPersonagens = Number(data.count);
    }
  );
  response.results.map(item => {
    personagens.push(item);
  });
  return personagens;
}

buscarTodosPersonagens(pageNumber);

function buscarTodosPersonagens(pageNumber) {
  buscarPersonagens(pageNumber)
    .then(response => {
      console.log(response, "response");
      if (pageNumber < totalPersonagens / resultadosPorPagina) {
        pageNumber++;
        buscarTodosPersonagens(pageNumber);
      } else {
        popularSelect(personagens.sort(ordenar));
      }
    })
    .catch(error => {
      console.log(error, "error");
    });
}

function popularSelect(personagens) {
  let html = "";

  personagens.forEach(item => {
    html += `
      <option value="${item.url}">${item.name}</option>
    `;
  });

  selectP.innerHTML = html;
  carregando.remove();
}

$("#selectPersonagem").change(function() {
  let url = $("#selectPersonagem option:selected").val();
  detalharPersonagem(url)
    .then(personagemSelecionado => {
      console.log(personagemSelecionado, "sucesso");
      $("#infoPersonagem")
        .find("p")
        .remove();
      let html = `
                  <p>Name: ${personagemSelecionado.name}</p>
                  <p>Gender: ${personagemSelecionado.gender}</p>
                  <p>Hair color: ${personagemSelecionado.hair_color}</p>
                  <p>Height: ${personagemSelecionado.height}</p>
                  <p>Skin color: ${personagemSelecionado.skin_color}</p>
                  `;

      $("#infoPersonagem").append($(html));
    })
    .catch(error => {
      console.log(error, "error");
    });
  console.log(personagemSelecionado);
});

async function detalharPersonagem(url) {
  let infoPersonagem = await $.getJSON(url, function(data) {});
  return infoPersonagem;
}

document.addEventListener("mousemove", () => {
  const audio = document.querySelector("audio");
  audio.play();
});
