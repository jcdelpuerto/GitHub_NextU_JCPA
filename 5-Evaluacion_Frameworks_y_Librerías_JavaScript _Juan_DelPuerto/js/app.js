var numColumnas = 7;
var numFilas = 5;
var statusJuego = 0;
var movimientos = 2;
var puntuacion = 0;
var bloqueo = false;
var vectorDiv = [];
var item;
var itemDiv;
var data = [];
var minuto= 1;
var segundo=60;
var juegoDulces = {
  init: function(){
    $(".btn-reinicio").on("click", function(){
      switch(statusJuego){
        case 0:
          juegoDulces.iniciar();
          break;
        case 1:
          statusJuego = 2;
          clearInterval(juego);
          juegoDulces.terminar();
          break;
        case 2:
          juegoDulces.reiniciar();
          break;
        default:
          alert('Estatus de juego no definido');
      }
    });
    this.colorTitulo();
    this.mostrarImagenes();
  },

  iniciar: function(){
    $(".btn-reinicio").html('Reiniciar');
    statusJuego = 1;
    juego = setInterval (function(){
      juegoDulces.cronometro()
    },1000);
    this.buscaMatchColumna();
    this.buscaMatchFila();
    if(data.length != 0){
      setTimeout(function(){
        juegoDulces.animarMatch();
      }, 800);
    }
  },

  terminar: function(){
    $(".panel-tablero").hide("slide", {direction: "left"}, "slow", function(){
      $(".time").hide("slide", {direction: "left"}, "slow");
      $(".panel-score").animate({width: "390%"}, 1000);
      if(statusJuego != 1){
        $(".score").before("<p class='final'>Juego Terminado</p>");
      }
    });
  },

  reiniciar: function(){
    var col = $("div[class^='col']");
    for (var i = 0; i < col.length; i++) {
      $(col[i]).html('');
    }
    clearInterval(juego);
    $(".btn-reinicio").html('Iniciar');
    $("#timer").html('02:00');
    $(".final").remove();
    $("#movimientos-text").html('0');
    $("#score-text").html('0');
    puntuacion = 0;
    movimientos = 0;
    this.mostrarImagenes();
    $(".main-titulo-2").remove();
    $(".panel-score").animate({width: "25%"}, 1000, function(){
      $(".panel-tablero").show("slide", {direction: "left"}, "slow");
      $(".time").show("slide", {direction: "left"}, "slow");
    });
    statusJuego = 0;
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
        $(".imagen-" + numImg).draggable({
          revert: true,
          containment: ".panel-tablero",
          start: function(){
            if(statusJuego == 1){
              $("#movimientos-text").html(movimientos++);
            }
          },
          stop: function(){
            if(statusJuego == 1){
              if(bloqueo == false){
                juegoDulces.buscaMatchColumna();
                juegoDulces.buscaMatchFila();
                juegoDulces.animarMatch();
              }
            }
          },
          drag: function(event, ui){}
        });

        $("[id='item-"+ numImg +" img-"+ j +"'").droppable({
          drop: function(event, ui){
            if(statusJuego == 1){
              if(bloqueo == false){
                primeraImagen = event.target.lastChild;
                segundaImagen = ui.draggable[0];
                imgUno = $(primeraImagen).attr("src");
                imgDos = $(segundaImagen).attr("src");
                $(primeraImagen).attr("src", imgDos);
                $(segundaImagen).attr("src", imgUno);
              }
            }
          }
        });
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
  },

  tomarColumnas: function(){
    var i = 0;
    this[i++] = $(".col-1").find("div");
    this[i++] = $(".col-2").find("div");
    this[i++] = $(".col-3").find("div");
    this[i++] = $(".col-4").find("div");
    this[i++] = $(".col-5").find("div");
    this[i++] = $(".col-6").find("div");
    this[i++] = $(".col-7").find("div");
    this.total = i;
  },

  tomarFilas: function(){
    var i = 0;
    this[i++] = $("[id*=img-1]");
    this[i++] = $("[id*=img-2]");
    this[i++] = $("[id*=img-3]");
    this[i++] = $("[id*=img-4]");
    this[i++] = $("[id*=img-5]");
    this[i++] = $("[id*=img-6]");
    this[i++] = $("[id*=img-7]");
    this.total = i;
  },

  buscaMatchColumna: function(){
    var imagen = new juegoDulces.imagenesDulces;
    var colDiv = new juegoDulces.tomarColumnas;
    var col = new juegoDulces.tomarColumnas;
    var objeto = "Col";
    for (var i = 0; i < col.total; i++) {
      col[i] = $(col[i]).find("img");
    }
    for(var i = 0; i < col.total; i++){
      for(var k = 0; k < imagen.total; k++){
        if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                       imagen[k] && $(col[i][2]).attr("src") ==
                                       imagen[k] && $(col[i][3]).attr("src") ==
                                       imagen[k] && $(col[i][4]).attr("src") ==
                                       imagen[k] && $(col[i][5]).attr("src") ==
                                       imagen[k] && $(col[i][6]).attr("src") ==
                                       imagen[k]){
          puntuacion = puntuacion + 7;
          item = {arrays: [0,1,2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 6;
          item = {arrays: [0,1,2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k] && $(col[i][6]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 6;
          item = {arrays: [1,2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [0,1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [1,2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][2]).attr("src") == imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k] && $(col[i][6]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [0,1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][2]).attr("src") == imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][3]).attr("src") == imagen[k] && $(col[i][4]).attr("src") ==
                                             imagen[k] && $(col[i][5]).attr("src") ==
                                             imagen[k] && $(col[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [0,1,2], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][2]).attr("src") == imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][3]).attr("src") == imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][4]).attr("src") == imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k] && $(col[i][6]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else{

        }
      }
    }
  },

  buscaMatchFila: function(){
    var imagen = new juegoDulces.imagenesDulces;
    var filaDiv = new juegoDulces.tomarFilas;
    var fila = new juegoDulces.tomarFilas;
    var objeto = "Fila";
    for (var i = 0; i < fila.total; i++) {
      fila[i] = $(fila[i]).find("img");
    }
    for(var i = 0; i < fila.total; i++){
      for(var k = 0; k < imagen.total; k++){
        if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                        imagen[k] && $(fila[i][2]).attr("src") ==
                                        imagen[k] && $(fila[i][3]).attr("src") ==
                                        imagen[k] && $(fila[i][4]).attr("src") ==
                                        imagen[k] && $(fila[i][5]).attr("src") ==
                                        imagen[k] && $(fila[i][6]).attr("src") ==
                                        imagen[k]){
          puntuacion = puntuacion + 7;
          item = {arrays: [0,1,2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 6;
          item = {arrays: [0,1,2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 6;
          item = {arrays: [1,2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [0,1,2,3,4], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [1,2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][2]).attr("src") == imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 5;
          item = {arrays: [2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [0,1,2,3], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [1,2,3,4], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][2]).attr("src") == imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][3]).attr("src") == imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 4;
          item = {arrays: [3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [0,1,2], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [1,2,3], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][2]).attr("src") == imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [2,3,4], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][3]).attr("src") == imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][4]).attr("src") == imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 3;
          item = {arrays: [4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else{

        }
      }
    }
  },

  animarMatch: function(){
    var array
    var claseCol
    var cajaImagenDulce
    if(data.length != 0){
      for(var i = 0; i < data.length; i++){
        switch(data[i].obj){
          case "Col":
            objeto = new juegoDulces.tomarColumnas;
            break;
          case "Fila":
            objeto = new juegoDulces.tomarFilas;
            break;
          default:
            alert("Error en animarMatch");
        }
        for(var j = 0; j < data[i].arrays.length; j++){
          $(data[i].colFil[data[i].arrays[j]]).hide("pulsate", 400, function(){});
          cajaImagenDulce = $(data[i].colFil[data[i].arrays[j]]);
          claseCol = "."+$(data[i].colFil[data[i].arrays[j]])[0].parentNode.className;
          itemDiv = {obj: $(data[i].colFil[data[i].arrays[j]]), clase: claseCol};
          vectorDiv.push(itemDiv);
        }
        $("#score-text").html(data[i].puntos);
      }
      data = [];
      juegoDulces.agregaDiv();
    }
  },

  agregaDiv: function(){
    bloqueo = true;
    setTimeout(function(){
      var imagen = new juegoDulces.imagenesDulces
      var datos = vectorDiv;
      for(var i = 0; i < datos.length; i++){
        var id = $(datos[i].obj)[0].id;
        var src = imagen[Math.floor(Math.random() * imagen.total)];
        var divEliminado = $(datos[i].obj).detach();
        var divNuevo = $(divEliminado)[0];

        $(divNuevo).find("img").attr("src", src);
        $(divNuevo).attr("id", id);
        $(datos[i].clase).prepend(divNuevo);
        $("[id*='"+ id +"']").show('bounce', 400, 'slow');
      }
      vectorDiv = [];
      juegoDulces.quitarDiv();
    }, 1000);
  },

  quitarDiv: function(){
    setTimeout(function(){
      var col = new juegoDulces.tomarColumnas;
      var contador = 1;
      var numImg = 1;
      for(var i = 0;  i <= numColumnas; i++){
        var contador2 = 1;
        for (var j = 0; j < numFilas; j++){
          var nuevoDiv = $(col[i])[j];
          $(nuevoDiv).attr("id", "item-"+ numImg +" img-"+ contador2);
          $(nuevoDiv).find("img").attr("class", "item-"+ numImg);
          contador2++;
          numImg++;
        }
        contador++;
      }
      juegoDulces.buscaMatchColumna();
      juegoDulces.buscaMatchFila();
      if(data.length != 0){
        setTimeout(function(){
        juegoDulces.animarMatch();
        }, 800);
      }
      bloqueo = false;
    }, 800);
  },

  cronometro: function(){
    if (segundo !=0) {
      segundo = segundo -1;
      $('#timer').html('0'+minuto+':'+segundo);
    }
    if (segundo>0 && segundo<10){
      $('#timer').html('0'+minuto+':'+'0'+segundo);
    }
    if (minuto==0 && segundo==0){
      clearInterval(juego);
      $(".panel-tablero").hide("fold",2000,animarPanel);
      $(".time").hide();
      segundo=60;
      minuto=1;
      statusJuego=2;
      $("#timer").html("0"+minuto+":"+segundo);
    }
    if ( segundo == 0)  {
        minuto=minuto-1;
        segundo=59;
        $('#timer').html('0'+minuto+':'+segundo);
    }
    function animarPanel(){
    $( ".panel-score" ).animate({width:'100%'},3000);
    $(".score").before("<p class='final'>Juego Terminado</p>");
    }
  }
}

$(document).ready(function(){
  juegoDulces.init();
});
