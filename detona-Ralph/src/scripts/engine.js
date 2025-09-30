const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#lifes"),
        botao: document.querySelector(".botao"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        currentLife: 3,
        attempt1: 0,
        attempt2: 0,
        attempt3: 0,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function playSound(audioName){
    let audio = new Audio(`/src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randonNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randonNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function countDown(){

    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0 ){

        if(state.values.currentLife == 3){
            state.values.attempt3 = state.values.result;
        }else if (state.values.currentLife == 2){
            state.values.attempt2 = state.values.result;
        }else if (state.values.currentLife == 1){
            state.values.attempt1 = state.values.result;
        }

        loseLife();

    }
}

function loseLife(){
    state.values.currentLife--;
    state.view.life.textContent = state.values.currentLife;

    if(state.values.currentLife <= 0){

        gameOver();

    }else{

        alert("Voce gastou 1 vida, vidas restantes: " + state.values.currentLife + "\nSua pontuação: " + state.values.result);
        state.actions.countDownTimerId;
        state.actions.timerId;
        state.values.currentTime = 60;
        state.values.result = 0;
        state.view.score.textContent = state.values.result;

    }
}

function gameOver(){
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    let melhor = 0;
    let segundaMelhor = 0;
    let terceiraMelhor = 0;
    if(state.values.attempt1 >= state.values.attempt2 && state.values.attempt1 >= state.values.attempt3){
        melhor = state.values.attempt1;
        if(state.values.attempt2 >= state.values.attempt3){
            segundaMelhor = state.values.attempt2;
            terceiraMelhor = state.values.attempt3;
        }else{
            segundaMelhor = state.values.attempt3;
            terceiraMelhor = state.values.attempt2;
        }
    }else if(state.values.attempt2 > state.values.attempt1 && state.values.attempt2 >= state.values.attempt3){
        melhor = state.values.attempt2;
        if(state.values.attempt1 >= state.values.attempt3){
            segundaMelhor = state.values.attempt1;
            terceiraMelhor = state.values.attempt3;
        }else{
            segundaMelhor = state.values.attempt3;
            terceiraMelhor = state.values.attempt1;
        }
    }else{
        melhor = state.values.attempt3;
        if(state.values.attempt1 >= state.values.attempt2){
            segundaMelhor = state.values.attempt1;
            terceiraMelhor = state.values.attempt2;
        }else{
            segundaMelhor = state.values.attempt2;
            terceiraMelhor = state.values.attempt1;
        }
    }

    alert("Game Over!" + "\nMelhor pontuação: " + melhor + "\nSegunda melhor pontuação: " + segundaMelhor + "\nTerceira melhor pontuação: " + terceiraMelhor);
}

function restart(){
    state.view.botao.addEventListener("click", function(){
        window.location.reload();
    })
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){

                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
                
            }
        });
    });  
}



function initialize(){
    addListenerHitBox();
}

initialize();
restart();

