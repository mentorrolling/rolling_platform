let usuario = JSON.parse(localStorage.getItem("user")) || null;
let tarjetasContainer = document.getElementById("tarjetas_container");
let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

//verificación de administrador y login
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
  cargarTarjetas();
} else {
  document.body.innerHTML = `<div class="container">
  <div class="row mt-5">
  <div class="col">
    <div class="alert alert-danger" role="alert">
      Debe iniciar sesión para acceder al contenido.
    </div>
    <div>
    <a class="nav-item" href="../index.html">Login</a>
  </div>
  </div>
</div>
</div>
    
    `;
}

//Verificar si el usuario es administrador o está logueado
const validarUser = (user) => {
  if (user?.rol !== "admin" || user === null) {
    main.innerHTML = "";
    let container = document.createElement("div");
    container.classList = "container";

    let estructuraMain = `<div class="row mt-5">
    <div class="col">
      <div class="alert alert-danger" role="alert">
        No tiene permisos para acceder a esta página.
      </div>
      <div>
      <a class="nav-item" href="./home.html">Volver a Home</a>
    </div>
    </div>
  </div>
      
      `;
    container.innerHTML = estructuraMain;
    main.appendChild(container);
  } else {
    cargarTabla();
  }
};
//-----------------------------------------------------------

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

//desloguear-------------------
const logout = function () {
  localStorage.removeItem("user");
  location.replace("../index.html");
};

// cargarTarjetas();
