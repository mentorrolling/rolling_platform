let usuario = JSON.parse(localStorage.getItem("user")) || null;

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
