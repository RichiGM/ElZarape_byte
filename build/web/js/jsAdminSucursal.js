/* global fetch */
// Inicializa los botones
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnAgregar = document.getElementById("btnAgregar");
const btnCambiarEstatus = document.getElementById("btnCambiarEstatus");

// Ocultar botones al cargar la página
btnModificar.style.display = "none";
btnEliminar.style.display = "none";
btnCambiarEstatus.style.display = "none";

let obj = []; // Arreglo que se llenará de objetos JSON
let indexSucursalSeleccionada;
let fotoBase64 = ""; // Variable para almacenar la imagen en base64

// Cargar datos y actualizar la tabla
fetch('../json/jsonSucursal.json')
    .then(response => response.json())
    .then(jasondata => {
        obj = jasondata;
        console.log(obj);
        actualizaTabla();
    });

// Actualiza la tabla con los datos de obj
function actualizaTabla() {
    let cuerpo = "";
    obj.forEach((elemento, index) => {
        // Determinar la longitud máxima permitida para la URL
        let maxLength = 30;
        let urlCorta = elemento.url.length > maxLength 
            ? elemento.url.substring(0, maxLength) + "..." 
            : elemento.url;

        let registro = `
            <tr onclick="selectSucursal(${index});">
                <td>${index + 1}</td>
                <td>${elemento.nombre}</td>
                <td>${elemento.direccion}</td>
                <td>${elemento.latitud}</td>
                <td>${elemento.longitud}</td>
                <td>${urlCorta}</td>
                <td>${elemento.horario}</td>
                <td><img src="${elemento.foto}" class="img-thumbnail" width="100" alt="${elemento.nombre}"></td>
                <td>${elemento.estatus}</td>
            </tr>`;
        cuerpo += registro;
    });
    document.getElementById("tblSucursal").innerHTML = cuerpo;
    filtrarSucursal(); // Aplicar el filtro al cargar la tabla
}

// Convierte una imagen a base64
function convertToBase64(event) {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    
    if (!allowedTypes.includes(file.type)) {
        alert("Formato de archivo no permitido. Por favor, sube una imagen en formato JPEG, JPG, o PNG.");
        document.getElementById("txtFotoRuta").value = "";
        return;
    }
    
    const reader = new FileReader();
    reader.onloadend = function () {
        fotoBase64 = reader.result;
        document.getElementById("txtFoto").src = fotoBase64;
    };
    reader.readAsDataURL(file);
}

// Despliega la foto seleccionada en el formulario
function despliegaFoto(foto) {
    foto = obtenerNombreFoto();
    document.getElementById("txtFoto").src = foto;
}

// Selecciona una sucursal y llena el formulario
function selectSucursal(index) {
    document.getElementById("txtNombre").value = obj[index].nombre;
    document.getElementById("txtDireccion").value = obj[index].direccion;
    document.getElementById("txtLatitud").value = obj[index].latitud;
    document.getElementById("txtLongitud").value = obj[index].longitud;
    document.getElementById("txtURL").value = obj[index].url;
    document.getElementById("txtHorario").value = obj[index].horario;
    document.getElementById("txtFoto").src = obj[index].foto;
    document.getElementById("txtFotoRuta").value = "";
    indexSucursalSeleccionada = index;

    // Mostrar botones relevantes
    btnModificar.style.display = "inline-block";
    btnEliminar.style.display = "none";
    btnCambiarEstatus.style.display = "inline-block";
    btnLimpiar.style.display = "inline-block";
    btnAgregar.style.display = "none";
}

// Cambia el estatus de la sucursal seleccionada
function cambiarEstatus() {
    if (indexSucursalSeleccionada !== undefined) {
        let sucursal = obj[indexSucursalSeleccionada];
        sucursal.estatus = (sucursal.estatus === "Activo") ? "Baja" : "Activo";
        actualizaTabla();
        selectSucursal(indexSucursalSeleccionada);
    }
    limpiar();
}

// Limpia el formulario y oculta botones específicos
function limpiar() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtDireccion").value = "";
    document.getElementById("txtLatitud").value = "";
    document.getElementById("txtLongitud").value = "";
    document.getElementById("txtURL").value = "";
    document.getElementById("txtHorario").value = "";
    document.getElementById("txtFoto").src ="data:image/jpeg;base64,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AB3nTwAAAAAABcAAAAAAAD1/PngAAAAAAO86eAAAAAAALgAAAAAAATmvgAAAAAAOwdtAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAVIAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAALgAAAAAAAAAAAAAAAAAAAAAAXAAAAAAAAAAAAAAAAAAAAAAAuAAAAAAAAAAAAAAAAAAAAAABcAAAAAAAAAAAAAAAAAAAAAAC//8QA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";
   document.getElementById("txtFotoRuta").value = "";

    // Ocultar botones específicos
    btnModificar.style.display = "none";
    btnEliminar.style.display = "none";
    btnCambiarEstatus.style.display = "none";
    btnLimpiar.style.display = "inline-block";
    btnAgregar.style.display = "inline-block";
}

// Obtiene el nombre del archivo de la ruta proporcionada
function obtenerNombreFoto() {
    let nombreFoto = document.getElementById("txtFotoRuta").value;
    return nombreFoto.substring(nombreFoto.lastIndexOf("\\") + 1);
}

// Agrega una nueva sucursal a la lista
function agregarSucursal() {
    let nombre = document.getElementById("txtNombre").value;
    let direccion = document.getElementById("txtDireccion").value;
    let latitud = document.getElementById("txtLatitud").value;
    let longitud = document.getElementById("txtLongitud").value;
    let url = document.getElementById("txtURL").value;
    let horario = document.getElementById("txtHorario").value;
    let foto = fotoBase64;

    if (nombre && direccion && latitud && longitud && url && horario && foto) {
        let newSucursal = {nombre, direccion, latitud, longitud, url, horario, foto, estatus: "Activo"};
        obj.push(newSucursal);

        console.log(JSON.stringify(obj));
        limpiar();
        actualizaTabla();
    } else {
        alert("Hay campos obligatorios para agregar la sucursal");
    }
}

// Modifica una sucursal existente en la lista
function modificarSucursal() {
    if (indexSucursalSeleccionada !== undefined) {
        let nombre = document.getElementById("txtNombre").value;
        let direccion = document.getElementById("txtDireccion").value;
        let latitud = document.getElementById("txtLatitud").value;
        let longitud = document.getElementById("txtLongitud").value;
        let url = document.getElementById("txtURL").value;
        let horario = document.getElementById("txtHorario").value;

        obj[indexSucursalSeleccionada] = {
            ...obj[indexSucursalSeleccionada],
            nombre,
            direccion,
            latitud, 
            longitud, 
            url, 
            horario, 
            estatus: "Activo"
        };

        console.log(obj[indexSucursalSeleccionada].nombre, document.getElementById("txtNombre").value, nombre);
        actualizaTabla();
        selectSucursal(indexSucursalSeleccionada);
    }
}

// Elimina la sucursal seleccionada de la lista
function eliminarSucursal() {
    if (indexSucursalSeleccionada !== undefined) {
        obj = obj.filter((_, index) => index !== indexSucursalSeleccionada);
        limpiar();
        actualizaTabla();
    }
}

// Normaliza el texto para la búsqueda (minúsculas y sin acentos)
function normalizarTexto(texto) {
    return texto
        .toLowerCase() // Convertir a minúsculas
        .normalize("NFD") // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar marcas de acento
}

// Filtra las sucursales en la tabla según el texto de búsqueda
function filtrarSucursal() {
    const textoBusqueda = normalizarTexto(document.getElementById("buscarSucursal").value);
    const filas = document.querySelectorAll("#tblSucursal tr");

    filas.forEach(fila => {
        const nombre = normalizarTexto(fila.cells[1].textContent);
        const direccion = normalizarTexto(fila.cells[2].textContent);
        const latitud = normalizarTexto(fila.cells[3].textContent);
        const longitud = normalizarTexto(fila.cells[4].textContent);
        const url = normalizarTexto(fila.cells[5].textContent);
        const horario = normalizarTexto(fila.cells[6].textContent);
        const estatus = normalizarTexto(fila.cells[7].textContent);

        if (nombre.includes(textoBusqueda) || direccion.includes(textoBusqueda) || latitud.includes(textoBusqueda) || longitud.includes(textoBusqueda) || url.includes(textoBusqueda) || horario.includes(textoBusqueda) || estatus.includes(textoBusqueda)) {
            fila.style.display = "";
        } else {
            fila.style.display = "none";
        }
    });
}
