//Coger los elementos del form
let preguntaInput = document.getElementById('pregunta');
let dificultadSelect = document.getElementById('dificultad');
let respuesta1Input = document.getElementById('respuesta1');
let correcta1Checkbox = document.getElementById('correcta1');
let respuesta2Input = document.getElementById('respuesta2');
let correcta2Checkbox = document.getElementById('correcta2');
let respuesta3Input = document.getElementById('respuesta3');
let correcta3Checkbox = document.getElementById('correcta3');
let respuesta4Input = document.getElementById('respuesta4');
let correcta4Checkbox = document.getElementById('correcta4');
let errorAdmin = document.getElementById('error-form-admin');
let checkboxes = document.getElementsByName('opcion');

console.log(respuesta1Input);

//Inserto la pregunta y recibo el id de la ultima pregunta
async function insert(pregunta) {
  let a = await fetch(conexionApi + '/api/Pregunta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pregunta)
  })
    .then(response => response.json())
    .catch(error => console.error('Unable to get items.', error));

  let idpregunta = a.idpregunta;

  let arrayRespuestas = [new Respuesta(idpregunta, respuesta1Input.value, correcta1Checkbox.checked),
  new Respuesta(idpregunta, respuesta2Input.value, correcta2Checkbox.checked),
  new Respuesta(idpregunta, respuesta3Input.value, correcta3Checkbox.checked),
  new Respuesta(idpregunta, respuesta4Input.value, correcta4Checkbox.checked)
  ];
  console.log(arrayRespuestas);

  //Inserto las respuestas
  for (let respuesta of arrayRespuestas) {
    await fetch(conexionApi + '/api/Respuesta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(respuesta)
    })
      .catch(error => console.error('Unable to get items.', error));
  }
}

//Agregar un evento para enviar una pregunta
document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();

  let dificultad = dificultadSelect.value;
  if (dificultad == "Facil") {
    dificultad = 1;
  } else if (dificultad == "Media") {
    dificultad = 2;
  } else {
    dificultad = 3;
  }

  if (preguntaInput.value == "" || respuesta1Input.value == "" || respuesta2Input.value == "" || respuesta3Input.value == "" || respuesta4Input.value == "") {
    errorAdmin.textContent = "Rellene el formulario por favor";
    return;
  }

  let numeroChecked = Array.from(checkboxes).filter(cb => cb.checked).length;
  if (numeroChecked == 0 || numeroChecked == 4) {
    errorAdmin.textContent = "Ha de haber 1-3 respuestas correctas";
    return;
  }

  let pregunta = new Pregunta(preguntaInput.value, dificultad);
  insert(pregunta);

  setTimeout(() => {
    location.reload();
  }, 800);
});