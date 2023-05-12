//Coger los elementos del form
const nombre = document.getElementById('nombre');
const apellidos = document.getElementById('apellidos');
const nick = document.getElementById('nick');
const contrasenya = document.getElementById('contrasena');
const pais = document.getElementById('pais');
let error = document.getElementById('error-form');

//Insertar usuario
async function insert(usuario) {
    await fetch(conexionApi + '/api/Usuari', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .catch(error => console.error('Unable to get items.', error));

}

//Agregar un evento de escucha para el envío del formulario
document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();

    if (nombre.value == "" || apellidos.value == "" || nick.value == "" || contrasenya.value == "" || pais.value == "") {
        error.textContent = "Rellene el formulario por favor";
        return;
    }

    let usuario = new Usuario(0, nombre.value, apellidos.value, nick.value, contrasenya.value, pais.value);
    console.log(usuario);

    insert(usuario);

    setCookie("visited", false, 1);
    location.href = "inicio-sesion.html";
});