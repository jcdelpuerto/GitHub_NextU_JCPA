$(document).ready(function(){
  juegoDulces.init();
});

var numColumnas = 7;
var numFilas = 5;

var juegoDulces = {
  init: function(){
    this.colorTitulo();
    this.mostrarImagenes();
  },

  colorTitulo: function(){
    setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-titulo-blanco", 350),
      $(".main-titulo-blanco").switchClass("main-titulo-blanco","main-titulo", 350)
      }, 1000);
    },

    mostrarImagenes: function(){
      var contador = 1;
      var numImg = 1;
      for(var i = 1; i <= numColumnas; i++){
        for(var j = 1; j <= numFilas; j++){
          var imagen = new this.imagenesDulces;
          var src = imagen[Math.floor(Math.random() * imagen.total)];
          $(".col-" + contador).append("<div id='item-"+ numImg +" img-"+ j +"'><img src="+ src +" class='imagen-"+ numImg +"'></div>");

          numImg++;
        }
        contador++;
      }
    },

    imagenesDulces: function(){
      var i = 0;
      this[i++] = "image/1.png";
      this[i++] = "image/2.png";
      this[i++] = "image/3.png";
      this[i++] = "image/4.png";
      this.total = i;
    }



  }
