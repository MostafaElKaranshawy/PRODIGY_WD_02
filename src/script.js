let start = document.querySelector(".start");
let pause = document.querySelector(".pause");
let reset = document.querySelector(".reset");
let labButton = document.querySelector(".labB");


let formatter = function (t){
    var milliseconds = Math.floor(t % 1000);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / 1000 / 60 / 60) % 24);
    let ms = (milliseconds < 10 ? '00' : (milliseconds < 100 ? '0' : '')) + milliseconds;
    var formattedTime =
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds ;
    return [formattedTime, ms];
}

let displayTime = function(){
    let formatted = formatter(time);
    let formattedTime = formatted[0];
    let ms = formatted[1]
    document.querySelector(".time").textContent = formattedTime;
    document.querySelector('.ms').textContent = ms;
}
let PauseTime = false;

var labs = [];
var startTime;
var time = 0;
var pausedTime = 0;
var starting  = false;
let updateInterval;

let setColors = function(button){
    if(button == 'start'){
        start.style.backgroundColor = '#b30c0c'
        pause.style.backgroundColor = '#0000b9'
    }
    else if(button == 'pause'){
        start.style.backgroundColor = '#f74444'
        pause.style.backgroundColor = '#010163'
    }
    else if(button == 'reset'){
        start.style.backgroundColor = '#f74444'
        pause.style.backgroundColor = '#0000b9'
    }
}
let startStopWatch = function() {
    resetTime();
    // clearInterval(updateInterval);
    starting = true;
    setColors('start');
    startTime = new Date().getTime();
    updateInterval = setInterval(updateTime, 1);

}
let updateTime = function() {
    var currentTime = new Date().getTime();
    time = currentTime - startTime + pausedTime;
    displayTime();
}

let pauseTime = function() {
    if(!starting)return;
    PauseTime = !PauseTime;
    pausedTime = time;
    if(PauseTime) {
        setColors('pause')
        clearInterval(updateInterval);
    }
    else if(starting){
        setColors('reset')
        startTime = new Date().getTime();
        updateInterval = setInterval(updateTime, 1);
    }
}

let labArea = document.querySelector('.labs');
let resetTime = function() {
    setColors('reset')
    clearInterval(updateInterval);
    time = 0;
    pausedTime = 0;
    PauseTime = false;
    starting = false;
    labs = [];
    while (labArea.firstChild) {
        labArea.removeChild(labArea.firstChild);
    }
    displayTime();
}
let addLab = function(){
    const lab = {
        name: '#Lab ' + (labs.length+1),
        time: time
    };
    labs.push(lab);
    let labChild = document.createElement('div');
    labChild.className = 'lab'
    labChild.innerHTML = `<div class="labN"></div>
    <div class="labTime"></div>`
    labArea.insertBefore(labChild, labArea.firstChild);
    document.querySelector('.labs .lab:first-child .labN').textContent = lab.name
    document.querySelector('.labs .lab:first-child .labTime').textContent = formatter(time)[0] + ':' + formatter(time)[1]

}
start.addEventListener("click", startStopWatch)
pause.addEventListener("click", pauseTime)
reset.addEventListener("click", resetTime)
labButton.addEventListener("click", addLab)