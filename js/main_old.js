var URL_API_SWAPI = "https://swapi.co/api/people";
var page1 = "page=1";
var personagens = [];

function pegarInfo() {
  for (let i = 1; i < 10; i++) {
    $.getJSON(URL_API_SWAPI + "?page=" + i, function(data) {}).done(function(
      data
    ) {
      data.results.map(item => {
        personagens.push(item);
      });

      if (personagens.length == 87) {
        // console.log(personagens.sort());
        console.log(
          personagens.sort(function(a, b) {
            return a.name - b.name;
          }),
          "personagens"
        );
        $.each(personagens, function(val, text) {
          console.log(val, text);
          $("#opcoes").append(
            $("<option></option>")
              .val(text.name)
              .html(text.name)
          );
        });
        // popularSelect(personagens.sort());
      }
    });
  }
}

// function popularSelect(personagens) {
//   var autors = personagens.sort();
//   console.log(autors, "autors")
//   const selectP = document.querySelector('#selectPersonagem');
//   let html = '<option value="">Carregando...</option>';

//   // $.each(personagens, function(val, text) {
//   //   $('#selectPersonagem').append(

//   //       $('<option></option>').val(val.name).html(text)
//   //   );
//   // })
//   autors.forEach(item => {
//     html += `
//       <option value="${item.url}">${item.name}</option>
//     `;
//   });

//   selectP.innerHTML = html;
// }

pegarInfo();
