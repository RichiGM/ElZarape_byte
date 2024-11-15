/* global fetch */

// Arreglo que se llenará de objetos JSON
let obj = [];

fetch('./json/jsonCategoria.json')
    .then(response => response.json())
    .then(data => {
        obj = data;
        actualizaTabla();
    });

function actualizaTabla() {
    let cuerpo = "";
    obj.forEach((categoria, index) => {
        let registro = `
            <tr onclick="selectCategoria(${index});">
                <td>${index + 1}</td>
                <td>${categoria.descripcion}</td>
                <td>${categoria.tipo}</td>
                <td>${categoria.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblCategorias").innerHTML = cuerpo;
}

function normalizarTexto(texto) {
    return texto
        .toLowerCase() // Convertir a minúsculas
        .normalize("NFD") // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar marcas de acento
}

function filtrarCategorias() {
    const textoBusqueda = normalizarTexto(document.getElementById("searchInput").value);
    const filas = document.querySelectorAll("#tblCategorias tr");

    filas.forEach(fila => {
        const descripcion = normalizarTexto(fila.cells[1].textContent);
        const tipo = normalizarTexto(fila.cells[2].textContent);
        const estatus = normalizarTexto(fila.cells[3].textContent);

        if (descripcion.includes(textoBusqueda) || tipo.includes(textoBusqueda) || estatus.includes(textoBusqueda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}
