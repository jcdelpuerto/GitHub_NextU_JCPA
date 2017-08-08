//hacer que la tecla presionada reduzca su tamaño
var teclas = document.getElementsByClassName('tecla');
for (i = 0 ; i < teclas.length ; i++) {
  teclas[i].dataPos = i + 1;
  teclas[i].addEventListener("mousedown", function() {
  if (this.dataPos < 19) {
    this.style="width:25%;";
    this.style="height:58.91px";
  } else {
    this.style="width:80%;";
    this.style="height: 95%";
  }
  }, false);
}

//y vuelva a su forma original al soltarla
for (i = 0 ; i < teclas.length ; i++) {
  teclas[i].dataPos = i + 1;
  teclas[i].addEventListener("mouseup", function() {
  if (this.dataPos < 19) {
    this.style="width:29%;";
    this.style="height: 62.91px";
  } else {
    this.style="width:90%;";
    this.style="height: 100%";
  }
  }, false);
}








//Identificamos la pantalla de la Calculadora al cargar la página
window.onload = function(){
  pantalla=document.getElementById("display");
}

//variables para control
var x="0"; //guardar número que está en pantalla
var xi=1; //iniciar número en pantalla: 1=nuevo número; 0=agregar dígitos;
var punto=0; //estado punto decimal 0=no, 1=si;


function numero(xx) { //recoge el número pulsado en el argumento.
         if (x=="0" || xi==1  ) { // inicializar un número,
            pantalla.innerHTML=xx; //mostrar en pantalla
            x=xx; //guardar número
            if (xx==".") { //si escribimos un  punto  al principio del número
               pantalla.innerHTML="0."; //escribimos 0.
               x=xx; //guardar número
               punto=1; //cambiar estado del punto
               }
           }
           else { //continuar escribiendo un número
               if (xx=="." && punto==0) { //si escribimos un punto decimal pòr primera vez
                   pantalla.innerHTML+=xx;
                   x+=xx;
                   punto=1; //cambiar el estado del punto
               }
              //si intentamos escribir un segundo punto decimal no realiza ninguna acción.
               else if (xx=="." && punto==1) {}
               //Resto de casos: escribir un número del 0 al 9:
               else {
                   pantalla.innerHTML+=xx;
                   x+=xx
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
         }


var Calculadora = {
  init: function(){

  }
}
