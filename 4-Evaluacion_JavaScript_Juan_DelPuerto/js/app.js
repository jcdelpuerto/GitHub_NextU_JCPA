var tienePunto = false;
var esNegativo = false;
var numero1 = 0;
var numero2 = 0;
var resultado = 0;
var operacion = "no";
var operacionDosNumeros = false
var largoNum1 = 1;
var largoNum2 = 0;
var largoResultado = 0;
var operacionRealizada = false;

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
              limpiaVariables()
              break;

            case "punto":
              if (tienePunto == false) {
                if (valorEnPantalla != ""){
                    pantalla.innerHTML = valorEnPantalla + ".";
                }
                else {
                  pantalla.innerHTML = valorEnPantalla + "0.";
                }
                tienePunto = true;
              }
              break;

            case "signo":
              if (valorEnPantalla != "0" && valorEnPantalla != "0." && valorEnPantalla != "" && operacionRealizada == false){
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
              else if (operacionRealizada == true){
                numero1 = numero1 * (-1);
                pantalla.innerHTML = numero1.toString();
                if (esNegativo == false){
                  esNegativo = true;
                }
                else{
                  esNegativo = false;
                }
              }
              break;

            case "mas":
              operacion = "+";
              limpiaVariables2()
              pantalla.innerHTML = "";
              break;

            case "menos":
              operacion = "-";
              limpiaVariables2()
              pantalla.innerHTML = "";

              break;

            case "por":
              operacion = "*";
              limpiaVariables2()
              pantalla.innerHTML = "";

              break;

            case "dividido":
              operacion = "/";
              limpiaVariables2()
              pantalla.innerHTML = "";

              break;

            case "raiz":
              var operacionPrevia = operacion
              operacion = "sqr";
              operacionDosNumeros = false;
              if (esNegativo == true){
                alert("No se puede calcula raiz cuadrada de número negativo")
                operacion = operacionPrevia;
                operacionDosNumeros = true;
              }
              else if (valorEnPantalla == ""){
                alert("No hay número para calcular")
                operacion = operacionPrevia;
                operacionDosNumeros = true;
              }
              else {
                resultado = raizCuadrada(valorEnPantalla);
                operacionRealizada = true;
                pantalla.innerHTML = resultado;
              }
              break;

            case "igual":
              if (operacionDosNumeros = true){
                resultado = operaNumeros(numero1,numero2);
                operacionRealizada = true;
              }
              pantalla.innerHTML = resultado;
              break;

            case "0":
              if (valorEnPantalla != '0') {
                if (operacion == 'no'  && largoNum1 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero1 = parseFloat(pantalla.innerHTML);
                  largoNum1 = largoNumero(numero1);
                }
                else if (operacion != 'no' && largoNum2 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero2 = parseFloat(pantalla.innerHTML);
                  largoNum2 = largoNumero(numero2);
                }
              }
              break;

            default: //acciones con teclas numéricas
              if (valorEnPantalla == '0') {
                pantalla.innerHTML = agregarNumeroPantalla ;
                if (operacion == 'no'){
                  numero1 = parseFloat(pantalla.innerHTML);
                  largoNum1 = largoNumero(numero1);
                }
                else {
                  numero2 = parseFloat(pantalla.innerHTML);
                  largoNum2 = largoNumero(numero2);
                }
              }
              else if (valorEnPantalla != '0') {
                if (operacion == 'no' && largoNum1 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero1 = parseFloat(pantalla.innerHTML);
                  largoNum1 = largoNumero(numero1);
                }
                else if (operacionRealizada == false && operacion != 'no' && largoNum2 < 8 ){
                  pantalla.innerHTML = valorEnPantalla + agregarNumeroPantalla ;
                  numero2 = parseFloat(pantalla.innerHTML);
                  largoNum2 = largoNumero(numero2);
                }
                else if (operacionRealizada == true){
                  limpiaVariables()
                  pantalla.innerHTML = agregarNumeroPantalla ;
                  numero1 = parseFloat(pantalla.innerHTML);
                  largoNum1 = largoNumero(numero1);
                }
              }
              break;
          }

      }
      function operaNumeros(x,y){
        var z = 0
        switch (operacion) {
          case "+":
            z = x + y
          break;
          case "-":
            z = x - y
          break;
          case "*":
            z = x * y
          break;
          case "/":
            z = x / y
          break;

          default:
        }
        largoResultado = largoNumero(z);
        while (largoResultado > 8){
          var valorCadena = z.toString();
          valorCadena = valorCadena.substring(0,8);
          z = parseFloat(valorCadena);
          largoResultado = largoNumero(z);
        }
        numero1 = z;
        largoNum1 = largoNumero(numero1);

        return z;
      }
      function raizCuadrada(x){
        var z = 0
        z = Math.sqrt(x);
        largoResultado = largoNumero(z);
        while (largoResultado > 8){
          var valorCadena = z.toString();
          valorCadena = valorCadena.substring(0,8);
          z = parseFloat(valorCadena);
          largoResultado = largoNumero(z);
        }
        numero1 = z;
        largoNum1 = largoNumero(numero1);

        return z;

      }
      function largoNumero(x){
        var valorCadena = x.toString();

        return  valorCadena.length;
      }
      function limpiaVariables(){
        tienePunto = false;
        esNegativo = false;
        numero1 = 0;
        numero2 = 0;
        resultado = 0;
        operacion = "no";
        operacionDosNumeros = false;
        largoNum1 = 1;
        largoNum2 = 0;
        largoResultado = 0;
        operacionRealizada = false;
      }
      function limpiaVariables2(){
        operacionDosNumeros = true;
        numero2 = 0;
        resultado = 0;
        largoNum2 = 0;
        largoResultado = 0;
        operacionRealizada = false;
        esNegativo = false;
      }
}());
