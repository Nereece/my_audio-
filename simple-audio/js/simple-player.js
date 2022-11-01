console.log("hogwarts is real")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const audio = new Audio("audio/Soft-Background-for-Interview.webm");
let isSeeking = false;
// BUTTON LISTENERS
playPauseButton.onclick = function(){
    if(audio.paused){
    audio.play();
    }else{
       audio.pause(); 
    }
}
// AUDIO LISTENERS
// event triggured once audio loaded
audio.oncanplaythrough = function(){
    seekBar.disabled = false;
}
// event triggured when audio plays
audio.onplay = function(){
    playPauseButton.src = "images/pause.svg"
}
audio.onpause = function(){
    playPauseButton.src = "images/play.svg"
}
// event triggured by meta deta load
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0);
    seekBar.max = Math.floor (audio.duration);
}
// event triggured when playback time updates
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime)
if(!isSeeking){
    seekBar.value = Math.floor(audio.currentTime)
}
} 
// event triggured when audio ends
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekBar.value = 0;
    playPauseButton.src = "images/play.svg";
}
// SEEK BAR LISTENERS
//  event triggured on interation ith seek bar 
seekBar.oninput = function(){
    isSeeking = true;
}
// Event triggured when seek bar is changed manually 
seekBar.onchange = function(){
    audio.currentTime = seekBar.value;
    isSeeking = false;
}
// UTILITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}
