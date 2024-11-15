/* global fetch */
const btnModificar = document.getElementById("btnModificar");
const btnCambiarEstatus = document.getElementById("btnCambiarEstatus");
const btnAgregar = document.getElementById("btnAgregar");
const btnLimpiar = document.getElementById("btnLimpiar");
let obj = [];
let indexCategoriaSeleccionada;

fetch('../json/jsonCategoria.json')
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

function agregarCategoria() {
    let descripcion = document.getElementById("txtDescripcion").value;
    let tipo = document.getElementById("txtTipo").value;
    if (descripcion && tipo) {
        let newCategoria = { descripcion, tipo, estatus: "Activo" };
        obj.push(newCategoria);
        actualizaTabla();
        limpiar();
    } else {
        alert("Hay campos obligatorios para agregar la Categoría");
    }
}

function selectCategoria(index) {
    document.getElementById("txtDescripcion").value = obj[index].descripcion;
    document.getElementById("txtTipo").value = obj[index].tipo;
    indexCategoriaSeleccionada = index;

    // Mostrar botones de Modificar y Cambiar Estatus, ocultar Agregar
    btnModificar.style.display = "inline-block";
    btnCambiarEstatus.style.display = "inline-block";
    btnAgregar.style.display = "none";
}

function modificarCategoria() {
    if (indexCategoriaSeleccionada !== undefined) {
        obj[indexCategoriaSeleccionada].descripcion = document.getElementById("txtDescripcion").value;
        obj[indexCategoriaSeleccionada].tipo = document.getElementById("txtTipo").value;
        actualizaTabla();
        limpiar();
    }
}

function cambiarEstatus() {
    if (indexCategoriaSeleccionada !== undefined) {
        obj[indexCategoriaSeleccionada].estatus = obj[indexCategoriaSeleccionada].estatus === "Activo" ? "Baja" : "Activo";
        actualizaTabla();
        limpiar();
    }
}

function limpiar() {
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtTipo").value = "";
    btnModificar.style.display = "none";
    btnCambiarEstatus.style.display = "none";
    btnAgregar.style.display = "inline-block";
}

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
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
