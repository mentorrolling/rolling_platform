class Curso {
  constructor(id, titulo, descripcion, imagen, mentor, precio = 0) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.mentor = mentor;
    this.precio = precio;
  }
}

let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
let tableBody = document.querySelector("#table_body");
var myModal = new bootstrap.Modal(document.getElementById("myModal"));

// let curso1 = new Curso(
//   1,
//   "Html5",
//   "Curso básico de html 5 con buenas prácticas",
//   "https://programacion.net/files/article/article_02174_.jpg",
//   "Rocio Pereyra"
// );
// let curso2 = new Curso(
//   2,
//   "CSS de cero a experto",
//   "Curso de CSS donde aprenderás todo lo necesario para crear estilos espectaculares para tus sitios webs",
//   "https://www.solucionex.com/sites/default/files/posts/imagen/css_blog.png",
//   "Daniel Pastoruti"
// );
// let curso3 = new Curso(
//   3,
//   "Javascript básico",
//   "Aprende los fundamentos del lenguaje por excelencia de la web y crea aplicaciones interactivas",
//   "https://www.adictosaltrabajo.com/wp-content/uploads/2018/05/el_remozado_javascript.imagen.jpg",
//   "Ludovico Peluche"
// );

function agregarCurso(e) {
  e.preventDefault();
  let id = new Date().getTime();
  let titulo = document.getElementById("titulo").value;
  let desc = document.getElementById("desc").value;
  let imagen = document.getElementById("imagen").value;
  let mentor = document.getElementById("mentor").value;
  let precio = document.getElementById("precio").value;

  cursos.push(new Curso(id, titulo, desc, imagen, mentor, precio));
  localStorage.setItem("cursos", JSON.stringify(cursos));
  document.getElementById("formulario").reset();
  document.getElementById("titulo").focus();
  // cursos.push(curso1, curso2, curso3);
  cargarTabla();
}

const borrarCurso = (cursoId) => {
  let index = cursos.findIndex((curso) => {
    return curso.id === cursoId;
  });

  // console.log(index);

  let validar = confirm(
    `Está seguro que desea eliminar el curso "${cursos[index].titulo}"?`
  );

  if (validar) {
    cursos.splice(index, 1);
    localStorage.setItem("cursos", JSON.stringify(cursos));
    alert("Curso eliminado");
    cargarTabla();
  }
};

const editModal = (index) => {
  myModal.show();
  crearCuerpoModal(index);
};

const crearCuerpoModal = (cursoId) => {
  document.querySelector(".modal-body").innerHTML = "";

  let index = cursos.findIndex((curso) => {
    return curso.id === cursoId;
  });

  let bodyModal = document.querySelector(".modal-body");
  let contenidoBody = `<form id="form-update" onSubmit="actualizarCurso(event,${index})">
  <label>Título</label>
  <input id="titulo-update" class="form-control" type="text" value="${cursos[index].titulo}" required />
  <label>Descripción</label>
  <textarea id="desc-update" class="form-control" value="${cursos[index].descripcion}" required>${cursos[index].descripcion}</textarea>
  <label>Imagen</label>
  <input
    id="imagen-update"
    class="form-control"
    type="text"
    placeholder="Ingrese una url"
    value="${cursos[index].imagen}"
    required
  />
  <label>Mentor</label>
  <select id="mentor-update" class="form-control" required>
    <option selected>${cursos[index].mentor}</option>
    <option value="Ludovico Peluche">Ludovico Peluche</option>
    <option value="Daniel Pastoruti">Daniel Pastoruti</option>
    <option value="Rocio Pereyra">Rocio Pereyra</option>
  </select>
  <label>Precio</label>
  <input
    id="precio-update"
    class="form-control"
    type="number"
    value="${cursos[index].precio}"
    required
  />
  <button class="btn btn-primary mt-3 float-end">Guardar</button>
</form>`;

  bodyModal.innerHTML = contenidoBody;
  // document.getElementById("modal-content").appendChild(bodyModal);

  // `
  // <div class="modal-footer">
  //   <button
  //     type="button"
  //     class="btn btn-secondary"
  //     data-bs-dismiss="modal"
  //   >
  //     Close
  //   </button>
  //   <button type="button" class="btn btn-primary">Save changes</button>
  // </div>`;
};

const actualizarCurso = (e, index) => {
  e.preventDefault();
  let titulo = document.getElementById("titulo-update").value;
  let descripcion = document.getElementById("desc-update").value;
  let imagen = document.getElementById("imagen-update").value;
  let mentor = document.getElementById("mentor-update").value;
  let precio = document.getElementById("precio-update").value;

  const newData = {
    titulo,
    descripcion,
    imagen,
    mentor,
    precio,
  };

  cursos.splice(index, 1, newData);
  localStorage.setItem("cursos", JSON.stringify(cursos));
  myModal.hide();
  cargarTabla();
};

function cargarTabla() {
  tableBody.innerHTML = "";

  cursos.map(function (curso, index) {
    let tr = document.createElement("tr");
    let celda = `<th scope="row">${index + 1}</th>
        <td>${curso.titulo}</td>
        <td>${curso.descripcion}</td>
        <td>${curso.mentor}</td>
        <td>$${curso.precio}</td>
        <td><button class="btn btn-warning btn-sm" onclick="editModal(${
          curso.id
        })"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
        <td><button class="btn btn-danger btn-sm" onclick="borrarCurso(${
          curso.id
        })"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
        `;
    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
}

document.getElementById("formulario").addEventListener("submit", agregarCurso);

// agregarCurso();
cargarTabla();
