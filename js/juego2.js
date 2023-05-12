//Coger dificultad
let dificultat = localStorage.getItem("dificultat");
let h2 = document.createElement("h2");
h2.innerText = dificultat;
document.getElementById("Nivel").appendChild(h2);

//Coger una pregunta aleatoriamente y sus respuestas
let question;
getItems();
async function getItems() {
  if (dificultat == "FACIL") {
    dificultat = 1;
  } else if (dificultat == "MEDIA") {
    dificultat = 2;
  } else {
    dificultat = 3;
  }

  const pregunta = await fetch(conexionApi + "/api/Pregunta/" + dificultat)
    .then(response => response.json())
    .catch(error => console.error('Unable to get items.', error));

  const arrayRespuestas = await fetch(conexionApi + "/api/Respuesta/" + pregunta.idpregunta)
    .then(response => response.json())
    .catch(error => console.error('Unable to get items.', error));

  question = {
    question: pregunta.stringpregunta,
    options: [arrayRespuestas[0].stringrespuesta, arrayRespuestas[1].stringrespuesta, arrayRespuestas[2].stringrespuesta, arrayRespuestas[3].stringrespuesta],
    answer: [arrayRespuestas[0].correcta, arrayRespuestas[1].correcta, arrayRespuestas[2].correcta, arrayRespuestas[3].correcta]
  }

  console.log(question);
}

//Mostrar por pantalla la pregunta y sus respuestas
function askQuestion(question) {
  //Mostrar pregunta
  let pregunta = document.getElementById("Pregunta");
  let message = question.question;
  const p = document.createElement("h1");
  p.textContent = message;
  pregunta.appendChild(p);

  //Crear botones para cada opción de respuesta
  const buttons = [];
  const respostes = document.getElementById("Respuestas");
  for (let i = 0; i < question.options.length; i++) {
    buttons.push(document.createElement("button"));
    buttons[i].classList.add("btn");
    buttons[i].classList.add("mod-btn");
    buttons[i].innerHTML = (i + 1) + ". " + question.options[i];
    buttons[i].addEventListener("click", checkAnswer);
    respostes.appendChild(buttons[i]);
  }

  //Configurar timer
  let start;
  const timer = startTimer(30000, () => {
    respostes.innerHTML = "";
    p.textContent = "Se ha agotado el tiempo...";
    pregunta.appendChild(p);
    reset();
  });

  const tiempoDiv = document.getElementById("Tiempo");
  const tiempoElement = document.createElement("h2");
  tiempoElement.id = "temporizador";
  tiempoDiv.appendChild(tiempoElement);

  let tiempo = 0;

  function startTimer(duration, callback) {
    start = Date.now();
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - start;
      tiempo = Math.max(parseInt((duration - elapsedTime) / 1000), 0);
      tiempoElement.textContent = tiempo;
      if (elapsedTime >= duration) {
        clearInterval(timer);
        callback();
      }
    }, 10);
    return timer;
  }

  //Verificar respuesta
  function checkAnswer(event) {
    const selectedAnswer = parseInt(event.target.innerHTML.split(".")[0]) - 1;
    respostes.innerHTML = "";
    if (question.answer[selectedAnswer]) {
      addPoints();
    } else {
      p.textContent = "Has fallado!!";
      pregunta.appendChild(p);

      reset();
    }
  }

  //Actualizar puntuación
  async function putPuntuacion(puntuacion) {
    await fetch(conexionApi + '/Puntos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puntuacion)
    })
      .catch(error => console.error('Unable to get items.', error));
  }

  //Calculo de puntos y los añade
  function addPoints() {
    let timeTaken = parseInt((Date.now() - start) / 1000);
    let points = Math.floor((30 - timeTaken) * 10) * dificultat;
    p.textContent = "Has ganado " + points + " puntos.";
    pregunta.appendChild(p);

    let puntuacion = new Usuario(getCookie("id"), "", "", "", "", "", points);
    console.log(puntuacion);
    putPuntuacion(puntuacion);

    reset();
  }

  //Función para limpiar la pantalla y prepararse para la siguiente pregunta
  function reset() {
    clearInterval(timer);

    tiempoDiv.innerHTML = "";
    tiempoElement.textContent = 0;
    tiempo = 0;

    let salir = document.createElement("button");
    salir.classList.add("btn");
    salir.classList.add("mod-btn");
    salir.innerHTML = "Salir";
    salir.addEventListener("click", function () {
      location.href = "principal.html";
    })
    respostes.appendChild(salir);
  }
}

//Llamar a la función askQuestion() para comenzar el juego
setTimeout(() => {
  askQuestion(question);
}, 500)