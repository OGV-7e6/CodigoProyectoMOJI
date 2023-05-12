//Coger los elementos del form
let nick = document.getElementById('nombre');
let contrasenya = document.getElementById('contrasenya');
let error = document.getElementById('error-form');

//Main, determina si ya has iniciado sesión anteriormente
var visited = getCookie("visited");
console.log(visited);
if (visited == undefined || visited == false) {
    primeraVez();
} else {
    location.href = "principal.html";
}

//Si es tu primera vez inciando sesión
function primeraVez() {
    const conexionApi = "https://grupo7jugaton.azurewebsites.net";

    //Conseguir el usuario que has pedido
    async function getUser(usuario) {
        console.log(conexionApi + "/api/Usuari/" + usuario);
        let response = await fetch(conexionApi + "/api/Usuari/" + usuario)
            .then(response => response.json())
            .catch(error => console.error('Unable to get items.', error));
        return response;
    }

    // Agregar un evento de escucha para el envío del formulario de inicio de sesión
    document.getElementById('submit').addEventListener('click', async (event) => {
        event.preventDefault();

        if (nick.value == "" || contrasenya.value == "") {
            error.textContent = "Rellene el formulario por favor";
            return;
        }

        let usuario = nick.value + "," + contrasenya.value;
        let user = await getUser(usuario);
        console.log(user);

        //determinar si es admin o no, o existe el usuario
        if (user && user.admin == false) {
            setCookie("visited", true, 1);
            setCookie("id", user.id, 1);
            setCookie("admin", false, 1);
            setCookie("contrasenya", user.contrasenya, 1);

            location.href = "principal.html";
        }
        else if (user && user.admin == true) {
            setCookie("visited", true, 1);
            setCookie("id", user.id, 1);
            setCookie("admin", true, 1);
            setCookie("contrasenya", user.contrasenya, 1);

            location.href = "principal.html";
        }
        else {
            error.textContent = "No hay ningun usuario con esa contraseña";
        }
    });
}