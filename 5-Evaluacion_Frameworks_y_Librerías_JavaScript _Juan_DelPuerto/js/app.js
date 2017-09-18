


var juegoDulces = {
  init: function(){
    this.colorTitulo();
  },

  //El título “Match Game” debe tener una animación que cambie de color después de determinado tiempo,
  //posteriormente vuelva al color original, y permanezca cambiando entre dos colores indefinidamente.
  colorTitulo: function(){
    setInterval(function(){
      $(".main-titulo").switchClass("main-titulo","main-titulo-blanco", 350),
      $(".main-titulo-blanco").switchClass("main-titulo-blanco","main-titulo", 350)
      }, 1000);
    }
  }





  $(document).ready(function(){
    juegoDulces.init();
  });
