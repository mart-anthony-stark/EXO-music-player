const player = document.querySelector('.player')
const cover = document.querySelector('#cover')
const title = document.querySelector('#title')
const audio = document.querySelector('#audio')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-cont')
const runningTime = document.querySelector('#currentTime')
const disc = document.querySelector('.disc')


const songs = [
  {
    title: "Don't Fight The Feeling",
    audio: "./music/dftf/Don't Fight The Feeling.mp3",
    cover: "./images/dftf/album.jpg"
  },
  {
    title: "Just As Usual",
    audio: "./music/dftf/Just As Usual.mp3",
    cover: "./images/dftf/2.jpg"
  },
  {
    title: "No Matter",
    audio: "./music/dftf/No Matter.mp3",
    cover: "./images/dftf/3.jpg"
  },
  {
    title: "Paradise",
    audio: "./music/dftf/Paradise.mp3",
    cover: "./images/dftf/4.jpg"
  },
  {
    title: "Runaway",
    audio: "./music/dftf/Runaway.mp3",
    cover: "./images/dftf/5.jpg"
  },
]

let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song){
  title.innerText = song.title
  audio.src = song.audio
  cover.src = song.cover
}

// PLAY/PAUSE THE CURRENT SONG
function playSong(){
  player.classList.add('play')
  playBtn.querySelector('i.fa').classList.remove('fa-play')
  playBtn.querySelector('i.fa').classList.add('fa-pause')
  audio.play()
}
function pauseSong(){
  player.classList.remove('play')
  playBtn.querySelector('i.fa').classList.add('fa-play')
  playBtn.querySelector('i.fa').classList.remove('fa-pause')
  audio.pause()
}

// NEXT SONG
function nextSong(){
  songIndex++
  if(songIndex > songs.length-1)
    songIndex = 0
  
  loadSong(songs[songIndex])
  playSong()
}
// PREVIOUS SONG
function prevSong(){
  songIndex--
  if(songIndex < 0)
    songIndex = songs.length-1
  
  loadSong(songs[songIndex])
  playSong()
}


// EVENT LISTENERS

// PLAY BUTTON
playBtn.addEventListener('click', ()=> {
  const isPlaying = player.classList.contains('play')
  if(isPlaying){
    pauseSong()
  }else{
    playSong()
  }
})

disc.addEventListener('dblclick', ()=> {
  const isPlaying = player.classList.contains('play')
  if(isPlaying){
    pauseSong()
  }else{
    playSong()
  }
})


// SET SEEK SONG PROGRESS
function setProgress(e){
  const isPlaying = player.classList.contains('play')

  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration

  if(!isPlaying) playSong()
}



// NEXT BUTTON
nextBtn.addEventListener('click', nextSong)
// PREVIOUS BUTTON
prevBtn.addEventListener('click', prevSong)

// SONG PROGRESS
audio.addEventListener('timeupdate', (e)=>{
  const {duration, currentTime} = e.srcElement
  const percent = (currentTime/duration) * 100
  progress.style.width = `${percent}%`

  runningTime.innerText = currentTime.toFixed(2)
})

// SEEK SONG
progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)


// SIDEBAR
const sidebar = document.querySelector('.sidebar')
const listBtn = document.querySelector('#list')
const songSelectBtns = document.querySelectorAll('#song-select')
const exitSidebar = document.querySelector('#x-sidebar')
listBtn.addEventListener('click', ()=>{
  sidebar.classList.toggle('open')
})
exitSidebar.addEventListener('click', ()=>{
  sidebar.classList.remove('open')
})

console.log(songSelectBtns)

for(let i = 0; i < songs.length; i++){
  console.log(songs[i])
  songSelectBtns[i].addEventListener('click', ()=>{
    songIndex = i
    loadSong(songs[songIndex])
    playSong()
    sidebar.classList.remove('open')
  })
}