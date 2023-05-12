//Conseguir los 10 primeros Usuarios
async function getAllUsuaris() {
    let arrayUsuari = await fetch(conexionApi + "/api/Usuari")
        .then(response => response.json())
        .catch(error => console.error('Unable to get items.', error));

    const tbody = document.querySelector('tbody');

    let posicion = 1;
    console.log(arrayUsuari);

    for (let i = 0; i < 10; i++) {
        // Crear un elemento tr para la fila
        let row = document.createElement('tr');

        // Crear un elemento td para cada columna
        let col1 = document.createElement('td');
        col1.textContent = posicion;

        let col2 = document.createElement('td');
        col2.textContent = arrayUsuari[i].nick;

        // Agregar las columnas a la fila
        row.appendChild(col1);
        row.appendChild(col2);

        // Agregar la fila al tbody
        tbody.appendChild(row);

        posicion++;
    }
}

getAllUsuaris();