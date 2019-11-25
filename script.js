(function (){
function geraCartas (){  //Constroi Array com as imagens das cartas
    let cartas = ['img/facebook.png','img/android.png','img/chrome.png','img/firefox.png','img/html5.png','img/googleplus.png','img/twitter.png','img/windows.png'];
function embaralhaCartas(array) {  //Embaralha a Array com o algoritmo Fisher-Yates
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  let uniq = 0;
  embaralhaCartas(cartas); 
  cartas.forEach(imprimeCarta);
  embaralhaCartas(cartas);
  cartas.forEach(imprimeCarta);
function imprimeCarta(carta) {   //Gera o código html dar cartas dentro da div tabuleiro, dando um id único para cada imagem.
    uniq++;
    $('#tabuleiro').prepend('<div class="card" data-src="'+carta+'" data-id="'+uniq+'"><div class="baralho front"><img src="img/cross.png"></div><div class="baralho back"><img src="'+carta+'"></div></div>');
}
}
document.querySelector("#btnJogar").addEventListener("click", (ev)=>{ 
    reStart(); 
});
    function reStart () {
    $('#tabuleiro').empty();
    geraCartas();
    $(".card").addClass("virada");
    btnresetTimer();
    btnstartTimer();
    let srcprimeira, srcsegunda = 'primeira';
    let idprimeira, idsegunda, ultimorecorde = 0;
    let contamatch = 0;
    let esconde = 'inicio';
    esconde = 'aguardando';
    ultimorecorde = localStorage.getItem('recorde');
    if (ultimorecorde === undefined || ultimorecorde === null) { ultimorecorde = 9999; };
    $('#btnRecord').html('Best: '+ultimorecorde+'s');
    escondetimer = setTimeout(escondeCartas, 3000);
    $('.card').off('click').click(function(){ 
        if (!$(this).hasClass('permanente')) {   //Ignora caso seja carta de match.        
        if (esconde === 'aguardando') { //Testa se o timer de virar as cartas esta aberto, par antecipar a virada.
            clearTimeout(escondetimer);
            escondeCartas();
        }
        $(this).toggleClass('virada');
        idsegunda = $(this).attr("data-id");
        if (idsegunda !== idprimeira) {  //Quadrados diferentes, então adquire qual é a imagem para testar se deu match.
        srcsegunda = $(this).attr("data-src");
           if (srcsegunda === srcprimeira) { // deu match !
            deuMatch();
            contamatch += 1;
            if (contamatch === 8) {
                btnstopStimer();
                window.alert('Parabéns! Você completou em: '+seconds+' segundos.');
                if (seconds < ultimorecorde) {
                  $('#btnRecord').html('Best: '+seconds+'s');
                    window.alert('Novo Recorde! '+seconds);            
                localStorage.setItem('recorde', seconds);
                };
            };
           } else {
            //Não deu match (mas pode ser a primeira carta ainda... )
               if(typeof srcprimeira === 'undefined'){  // Era a primeira carta, agora escolha a segunda.
                srcprimeira = srcsegunda;
               } else {  //Não era match mesmo, vira as cartas (com timer).
                esconde = 'aguardando';
                escondetimer = setTimeout(escondeCartas, 1500);
                srcprimeira = (function () { return; })();  //Volta a variavel de primeira carta pra undefined.
                 };   
            };
        } ;
    idprimeira = idsegunda; //Seta a ID do quadrado, para ser comparada ao clicar na segunda carta.
      }});
      function deuMatch() {
          $('.card[data-src="'+srcsegunda+'"]').addClass('permanente'); //Adiciona classe de virada permanente para as cartas do match.
        srcprimeira = (function () { return; })();  //Volta a variavel de primeira carta pra undefined.
        $(".card").removeClass("virada"); //Vira todas as outras cartas pra baixo.
      }
      function escondeCartas() {
        $(".card").removeClass("virada");
        esconde = 'pronto';
      };
  };
  let seconds = 00; 
  let tens = 00; 
  let appendTens = document.getElementById("tens")
  let appendSeconds = document.getElementById("seconds")
  let Interval ;
  function btnstartTimer() {
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
    function btnstopStimer() {
       clearInterval(Interval);
  }
  function btnresetTimer() {
     clearInterval(Interval);
    tens = "00";
  	seconds = "00";
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
  }
  function startTimer () {
    tens++; 
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    };
    if (tens > 9){
      appendTens.innerHTML = tens;  
    } ;  
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }  
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    };
  };
  $( document ).ready( reStart );
  
})();
