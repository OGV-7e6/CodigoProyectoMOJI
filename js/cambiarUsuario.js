//Coger los elementos del form
let nick = document.getElementById('nick');
let contrasenyaActual = document.getElementById('contrasenaActual');
let contrasenya = document.getElementById('contrasena');
let pais = document.getElementById('pais');
let error = document.getElementById('error-form');

//Cambiar el usuario que has pedido
async function changeUser(usuario) {
    await fetch(conexionApi + '/api/Usuari', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
        .catch(error => console.error('Unable to get items.', error));
}

// Agregar un evento para modificar el usuario
document.getElementById('modificar-usuario').addEventListener('click', (event) => {
    event.preventDefault();

    if (nick.value == "" || contrasenyaActual.value == "" || contrasenya.value == "" || pais.value == "") {
        error.textContent = "Rellene el formulario por favor";
        return;
    }

    if (contrasenyaActual.value != getCookie("contrasenya")) {
        error.textContent = "La contraseña actual no coincide"
        return;
    }

    let usuarioNuevo = new Usuario(getCookie("id"), "", "", nick.value, contrasenya.value, pais.value);
    changeUser(usuarioNuevo);
    setCookie("contrasenya", contrasenya.value, 1);
    console.log(usuarioNuevo);

    setTimeout(() => {
        location.reload();
    }, 500)
});