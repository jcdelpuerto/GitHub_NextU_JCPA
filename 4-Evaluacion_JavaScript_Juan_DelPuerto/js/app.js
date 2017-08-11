//nombre del modulo
var Calculadora = {};

//definición del módulo
Calculadora = (function(){
  var teclas, pantalla, x, nuevo, punto

  //poner las teclas en un arreglo
  teclas = document.getElementsByClassName('tecla');

  //elemento pantalla de la calculadora
  pantalla = document.getElementById("display");

  for (i = 0 ; i < teclas.length ; i++) {

    //identificar tecla oprimida
    teclas[i].dataPos = i + 1;

    //hacer que la tecla presionada reduzca su tamaño
    teclas[i].addEventListener("mousedown", function() {
    if (this.dataPos < 19) {
      this.style="width:25%;";
      this.style="height:58.91px";
    }
    else
    {
      this.style="width:80%;";
      this.style="height: 95%";
    }
    }, false);

    //hacer que la tecla presionada vuelva a su forma original al soltarla
    teclas[i].addEventListener("mouseup", function() {
    if (this.dataPos < 19) {
      this.style="width:29%;";
      this.style="height: 62.91px";
    }
    else
    {
      this.style="width:90%;";
      this.style="height: 100%";
    }
    }, false);
  }
  var numeros = document.querySelectorAll("img");
    for (var i = 0; i < numeros.length; i++) {
      numeros[i].onclick = agregar;
    }
      function agregar(e) {
          e.stopPropagation()
          var valorEnPantalla = pantalla.innerHTML
          var agregarNumeroPantalla = this.getAttribute("alt")
          switch (agregarNumeroPantalla) {
            case "0":
              if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "1":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "2":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "3":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "4":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "5":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "6":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "7":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "8":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "9":
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
              }
              else if (valorEnPantalla != '0') {
                pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
              }
              break;
            case "On":
              pantalla.innerHTML = "0";
              break;
            case "punto":
              var existePunto = valorEnPantalla.indexOf(".")
              if (existePunto == -1) {
                pantalla.innerHTML = valorEnPantalla + ".";
              }
              break;
            default:

          }

      }

}());
