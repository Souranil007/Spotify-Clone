//Iniatialize the variables

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    { songName: "Enemy-Imagine Dragons", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Bones-Imagine Dragons", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Suzume No Tozomari", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Night Changes-One Direction", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "DVRST-Close Eyes", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Tokyo Ghoul", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Unstoppable-Sia", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Sahara-Hensen", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Driver's Liscense x Take me to church", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "No Lies-Dua Lipa", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;  //This will give the cover image for each song
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; //This will give the song name to each song 
})
//auioElement.play();

//Handle play pause click

//this will start the song and pause
masterPlay.addEventListener('click', () => {  //this is the function, we are alos using arrow function
    if (audioElement.paused || audioElement.currentTime <= 0) {  //if the song hasn't started yet then we use these commands
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1; //When the music starts the image given by the gif id will appear//
    }
    else {
        audioElement.pause()  //if we have to pause the song
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0; //When the music starts the image given by the gif id will disappear//
    }
})
//Listen to events
audioElement.addEventListener('timeupdate', () => {
    // update seek bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100); //this will show what percentage of the song has been played//
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;  //When we move the progressBar manually we have to use this calculation//
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })

})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})