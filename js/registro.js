//localstorage debe tener una clave llamada usuarios -> array de objetos con los datos de cada usuario registrado

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
  constructor(nombre, email, password, rol = "usuario") {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
  }
}

const registroUsuario = function (e) {
  e.preventDefault();

  let nombre = document.getElementById("text_nombre").value;
  let correo = document.getElementById("text_email").value;
  let password = document.getElementById("text_password").value;
  let password2 = document.getElementById("text_password2").value;

  //comparar contraseñas
  if (password !== password2) {
    return alert("No coinciden las contraseñas");
  }

  let validar = usuarios.find(function (usuario) {
    return usuario.email === correo;
  });

  if (validar) {
    return alert(
      "El usuario ya está registrado, inicie sesión con sus credenciales"
    );
  }

  usuarios.push(new Usuario(nombre, correo, password));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("formulario").reset();
  alert("Usuario registrado con éxito 😎");
  document.getElementById("text_nombre").focus();
  location.replace("../index.html");
};

document
  .getElementById("formulario")
  .addEventListener("submit", registroUsuario);
