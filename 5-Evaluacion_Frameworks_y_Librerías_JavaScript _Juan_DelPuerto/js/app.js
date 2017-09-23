var movimientos = 2;
var puntuacion = 0;
var minuto= 1;
var segundo=60;
var bloqueo = false;
var vectorDiv = [];
var data = [];
var item;
var itemDiv;

var juegoDulces = {
  init: function(){
    juegoDulces.colorTitulo();
    $(".btn-reinicio").on("click", function(){
      if ($(".btn-reinicio").text() === 'Reiniciar') {
  			location.reload(true);
  		}
      else if ($(".btn-reinicio").text() === 'Iniciar') {
        $(".btn-reinicio").html('Reiniciar');
        juego = setInterval (function(){
          juegoDulces.cronometro()
        },1000);
        juegoDulces.mostrarImagenes();
        juegoDulces.buscaMatchColumna();
        juegoDulces.buscaMatchFila();
        if(data.length != 0){
          setTimeout(function(){
            juegoDulces.animarMatch();
          }, 800);
        }
      }
    });
  },

  colorTitulo: function(selector){
    $('.main-titulo').animate({
        opacity: '1',
      }, {
        step: function () {
          $(this).css('color', 'white');
        },
        queue: true
      })
      .delay(900)
      .animate({
        opacity: '1'
      }, {
        step: function () {
          $(this).css('color', 'yellow');
        },
        queue: true
      }, 500)
      .delay(900)
      .animate({
  			opacity: '1'
  		}, {
  			step: function () {
  				$(this).css('color', 'white');
  			},
  			queue: true
  		})
  		.animate({
  			opacity: '1'
  		}, {
  			step: function () {
  				$(this).css('color', 'yellow');
  				juegoDulces.colorTitulo();
  			},
  			queue: true
  		});
  },

  mostrarImagenes: function(){
    var contador = 1;
    var imagenNum = 1;
    for(var i = 1; i <= 7; i++){
      for(var j = 1; j <= 5; j++){
        var imagen = new this.imagenesDulces;
        var src = imagen[Math.floor(Math.random() * imagen.total)];
        $(".col-" + contador).append("<div id='item-"+ imagenNum +" img-"+ j +"'><img src="+ src +" class='imagen-"+ imagenNum +"'></div>");
        $(".imagen-" + imagenNum).draggable({
          revert: true,
          containment: ".panel-tablero",
          start: function(){
            if ($(".btn-reinicio").text() === 'Reiniciar'){
              $("#movimientos-text").html(movimientos++);
            }
          },
          stop: function(){
            if ($(".btn-reinicio").text() === 'Reiniciar'){
              if(bloqueo == false){
                juegoDulces.buscaMatchColumna();
                juegoDulces.buscaMatchFila();
                juegoDulces.animarMatch();
              }
            }
          },
          drag: function(event, ui){}
        });
        $("[id='item-"+ imagenNum +" img-"+ j +"'").droppable({
          drop: function(event, ui){
            if ($(".btn-reinicio").text() === 'Reiniciar'){
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
        imagenNum++;
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
          puntuacion = puntuacion + 49;
          item = {arrays: [0,1,2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 36;
          item = {arrays: [0,1,2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k] && $(col[i][6]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 36;
          item = {arrays: [1,2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [0,1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [1,2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][2]).attr("src") == imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k] && $(col[i][6]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [2,3,4,5,6], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][0]).attr("src") == imagen[k] && $(col[i][1]).attr("src") ==
                                            imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [0,1,2,3], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][1]).attr("src") == imagen[k] && $(col[i][2]).attr("src") ==
                                            imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [1,2,3,4], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][2]).attr("src") == imagen[k] && $(col[i][3]).attr("src") ==
                                            imagen[k] && $(col[i][4]).attr("src") ==
                                            imagen[k] && $(col[i][5]).attr("src") ==
                                            imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [2,3,4,5], colFil: colDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(col[i][3]).attr("src") == imagen[k] && $(col[i][4]).attr("src") ==
                                             imagen[k] && $(col[i][5]).attr("src") ==
                                             imagen[k] && $(col[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 16;
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
          puntuacion = puntuacion + 49;
          item = {arrays: [0,1,2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 36;
          item = {arrays: [0,1,2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 36;
          item = {arrays: [1,2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [0,1,2,3,4], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [1,2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][2]).attr("src") == imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 25;
          item = {arrays: [2,3,4,5,6], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][0]).attr("src") == imagen[k] && $(fila[i][1]).attr("src") ==
                                             imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [0,1,2,3], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][1]).attr("src") == imagen[k] && $(fila[i][2]).attr("src") ==
                                             imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [1,2,3,4], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][2]).attr("src") == imagen[k] && $(fila[i][3]).attr("src") ==
                                             imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 16;
          item = {arrays: [2,3,4,5], colFil: filaDiv[i], obj: objeto, item: i, puntos: puntuacion};
          data.push(item);
        }
        else if($(fila[i][3]).attr("src") == imagen[k] && $(fila[i][4]).attr("src") ==
                                             imagen[k] && $(fila[i][5]).attr("src") ==
                                             imagen[k] && $(fila[i][6]).attr("src") ==
                                             imagen[k]){
          puntuacion = puntuacion + 16;
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
      var imagenNum = 1;
      for(var i = 0;  i <= 7; i++){
        var contador2 = 1;
        for (var j = 0; j < 5; j++){
          var nuevoDiv = $(col[i])[j];
          $(nuevoDiv).attr("id", "item-"+ imagenNum +" img-"+ contador2);
          $(nuevoDiv).find("img").attr("class", "item-"+ imagenNum);
          contador2++;
          imagenNum++;
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
