const conexionApi = "https://grupo7jugaton.azurewebsites.net";

//Conseguir cookie
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

//Crear cookie
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//Clases
class Usuario {
  id = 0;
  nom;
  cognom;
  nick;
  contrasenya;
  pais;
  puntuacion;
  admin;
  constructor(id = 0, nom, cognom, nick, contrasenya, pais, puntuacion = 0, admin = false) {
    this.id = id;
    this.nom = nom;
    this.cognom = cognom;
    this.nick = nick;
    this.contrasenya = contrasenya;
    this.pais = pais;
    this.puntuacion = puntuacion;
    this.admin = admin;
  }
}

class Pregunta {
  idpregunta = 0;
  stringpregunta;
  dificultat;
  constructor(pregunta, dificultat) {
    this.stringpregunta = pregunta;
    this.dificultat = dificultat;
  }
}

class Respuesta {
  idpregunta;
  idrespuesta = 0;
  stringrespuesta;
  correcta;
  constructor(idpregunta, respuesta, correcta = false) {
    this.idpregunta = idpregunta;
    this.stringrespuesta = respuesta;
    this.correcta = correcta;
  }
}