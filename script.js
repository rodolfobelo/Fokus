const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgBtnComecarPausar = document.querySelector('.app__card-primary-butto-icon')

const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioTempoFInalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musica.loop = true;
// musica.play();
// console.log(botoes);
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else 
        musica.pause();
})

focoBt.addEventListener('click', () => {
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    botoes.forEach(contexto => {
        contexto.classList.remove('active');
        console.log(contexto);
        console.log(botoes);
        
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioTempoFInalizado.play();
        alert('Tempo Finalizado!!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    console.log('Tempo ' + tempoDecorridoEmSegundos);
    console.log('Id ' + intervaloId);
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar () {
    if(intervaloId){
        audioPause.play();
        zerar();        
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
    imgBtnComecarPausar.setAttribute('src', `./imagens/pause.png`);
}

function zerar () {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    imgBtnComecarPausar.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null;
}