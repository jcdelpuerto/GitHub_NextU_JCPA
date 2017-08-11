var tienePunto = false;
var esNegativo = false;
var numero1 = 0;
var numero2 = 0;
var resultado = 0;
var operacion = "no";
var largoNum1 = 1;
var largoNum2 = 0;

//poner las teclas en un arreglo
var teclas = document.getElementsByClassName('tecla');

//elemento pantalla de la calculadora
var pantalla = document.getElementById("display");

//nombre del modulo
var Calculadora = {};

//definición del módulo
Calculadora = (function(){
  for (i = 0 ; i < teclas.length ; i++) {
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

  //acciones de cada tecla
  var numeros = document.querySelectorAll("img");
    for (var i = 0; i < numeros.length; i++) {
      numeros[i].onclick = agregar;
    }
      function agregar(e) {
          e.stopPropagation()
          var valorEnPantalla = pantalla.innerHTML
          var agregarNumeroPantalla = this.getAttribute("alt")
          switch (agregarNumeroPantalla) {
            case "On":
              pantalla.innerHTML = "0";
              tienePunto = false;
              numero1 = 0;
              numero2 = 0;
              resultado = 0;
              operacion = "no";
              largoNum1 = 1;
              largoNum2 = 0;
              esNegativo = false;
              break;

            case "punto":
              if (tienePunto == false) {
                pantalla.innerHTML = valorEnPantalla + ".";
                tienePunto = true;
              }
              break;

            case "signo":
              if (valorEnPantalla != "0" && valorEnPantalla != "0." && valorEnPantalla != "" ){
                if (operacion == 'no'){
                  numero1 = numero1 * (-1);
                  pantalla.innerHTML = numero1.toString();
                }
                else {
                  numero2 = numero2 * (-1);
                  pantalla.innerHTML = numero2.toString();
                }
                if (esNegativo == false){
                  esNegativo = true;
                }
                else{
                  esNegativo = false;
                }
              }
              break;

            case "mas":

              break;

            case "menos":

              break;

            case "por":

              break;

            case "dividido":

              break;

            case "raiz":

              break;

            case "igual":

              break;

            case "0":
              if (valorEnPantalla != '0') {

                if (operacion == 'no'  && largoNum1 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero1 = parseFloat(pantalla.innerHTML);
                  var largo5 = numero1.toString();
                  largoNum1 = largo5.length;
                }
                else if (operacion != 'no' && largoNum2 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero2 = parseFloat(pantalla.innerHTML);
                  var largo6 = numero2.toString();
                  largoNum2 = largo6.length;
                }
              }
              break;

            default: //acciones con teclas numéricas
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
                if (operacion == 'no'){
                  numero1 = parseFloat(pantalla.innerHTML);
                  var largo1 = numero1.toString();
                  largoNum1 = largo1.length;
                }
                else {
                  numero2 = parseFloat(pantalla.innerHTML);
                  var largo2 = numero2.toString();
                  largoNum2 = largo2.length;
                }
              }
              else if (valorEnPantalla != '0') {
                if (operacion == 'no' && largoNum1 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero1 = parseFloat(pantalla.innerHTML);
                  var largo3 = numero1.toString();
                  largoNum1 = largo3.length;
                }
                else if (operacion != 'no' && largoNum2 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero2 = parseFloat(pantalla.innerHTML);
                  var largo4 = numero2.toString();
                  largoNum2 = largo4.length;
                }
              }
              break;
          }

      }

}());
