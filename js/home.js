let usuario = JSON.parse(localStorage.getItem("user")) || null;
let tarjetasContainer = document.getElementById("tarjetas_container");
let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

if (usuario) {
  if (usuario.rol === "admin") {
    let item = document.createElement("li");
    item.classList = "nav-item";
    let opcion = ` <a class="nav-link" aria-current="page" href="./admin.html"
        >Administración</a
      >`;
    item.innerHTML = opcion;
    document.querySelector("#menu_lista").appendChild(item);
  }
}

function cargarTarjetas() {
  tarjetasContainer.innerHTML = "";
  cursos.map(function (curso) {
    let div = document.createElement("div");
    div.classList = "col-12 col-md-4 mb-3";

    let tarjeta = `<div class="card h-100" >
  <img src="${curso.imagen}" class="card-img-top img_tarjeta" alt="${curso.titulo}">
  <div class="card-body">
    <h5 class="card-title">${curso.titulo}</h5>
    <p class="card-text">${curso.descripcion}</p>

   
  </div>
  <div class="card-footer">
  <a href="#" class="btn btn-primary float-end">Comprar</a>
  </div>
  </div>`;

    div.innerHTML = tarjeta;
    tarjetasContainer.appendChild(div);
  });
}

cargarTarjetas();
