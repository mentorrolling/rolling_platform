let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

const handleSubmit = function (e) {
  e.preventDefault();

  let email = document.querySelector("#text_email");
  let pass = document.querySelector("#text_password");

  let validar = usuarios.find(function (user) {
    return user.email === email.value;
  });

  console.log(validar);

  if (validar) {
    if (validar.password === pass.value) {
      //   let usuario = { ...validar };
      let usuario = {
        email: validar.email,
        nombre: validar.nombre,
        password: validar.password,
        rol: validar.rol,
      };
      localStorage.setItem("user", JSON.stringify(usuario));
      location.replace("./pages/home.html");
    } else {
      alert("Correo o contraseña incorrecto");
    }
  } else {
    alert("Correo o contraseña incorrecto");
  }
};

document.querySelector("#formulario").addEventListener("submit", handleSubmit);
