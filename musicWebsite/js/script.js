let songIndex = 0;
let audioElement = new Audio('./music/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressbar');
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Aashiyan", filePath: "../../music/1.mp3", coverPath:"./images/cover2.jpg"},
    {songName: "Raata", filePath: "../../music/2.mp3", coverPath:"./images/cover2.jpg"},
    {songName: "Merry Christmas", filePath: "../../music/3.mp3", coverPath:"./images/cover2.jpg"},
    {songName: "Aashiyan", filePath: "../../music/1.mp3", coverPath:"images/cover2.jpg"},
    {songName: "Raata", filePath: "../../music/2.mp3", coverPath:"images/cover2.jpg"}
];

songItems.forEach((element,i) => {
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle Play/Pause Click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime <= 0 ){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate', ()=> {
    //update seekbar
let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100); // convert time into percentage
myProgressBar.value = progress;

});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = parseInt(myProgressBar.value * audioElement.duration) / 100; // convert % of time into sec.

})

// code for Small play button

const makeAllPlays = () =>{
    
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
} 
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click", (e)=>{

        makeAllPlays();
        songIndex = parseInt(e.target.id);
       
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        // know which song button get clicked 

        audioElement.src = `./music/${songIndex+1}.mp3`;
        audioElement.currentTime = 0; // time of progressbar will become 0.
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity = 1;
        
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");


    })
})
// Next button function
document.getElementById("next").addEventListener('click', ()=>{
    if(songIndex >= 4){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `./music/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; // time of progressbar will become 0.
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

})

// previous button function
document.getElementById("previous").addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `./music/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; // time of progressbar will become 0.
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

})