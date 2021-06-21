const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

const songs = [ "Don't Fight The Feeling", "Just As Usual", "No Matter", "Paradise", "Runaway" ]

// keep track of songs

let songIndex = 0

// Initially load song info
loadSong(songs[songIndex])

// Update song details
function loadSong(song){
  const num = songIndex+1

  title.innerText = song
  cover.src = `/images/${num}.jpg`
  audio.src = `/music/${song}.mp3`
  console.log("Initially loaded")
}

function playSong(){
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fa').classList.remove('fa-play')
  playBtn.querySelector('i.fa').classList.add('fa-pause')

  audio.play()
}

function pauseSong(){
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fa').classList.remove('fa-pause')
  playBtn.querySelector('i.fa').classList.add('fa-play')


  audio.pause()
}

function previousSong() {
  songIndex--
  if(songIndex < 0){
    songIndex = songs.length-1
  }
  loadSong(songs[songIndex])
  playSong()
}

function nextSong() {
  songIndex++
  if(songIndex > songs.length-1){
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

function setProgress(e){
  const width = e.target.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX/width) * duration
}

// EVENT LISTENERS
playBtn.addEventListener('click', ()=>{
  const isPlaying = musicContainer.classList.contains('play')

  if(isPlaying){
    pauseSong()
  }else{
    playSong()
  }
})


// CHANGE SONG EVENTS

prevBtn.addEventListener('click', previousSong)

nextBtn.addEventListener('click', nextSong)

// progress
audio.addEventListener('timeupdate', (e)=> {
  const {duration, currentTime} = e.srcElement
  const progressPercent = (currentTime/duration) * 100
  progress.style.width = progressPercent + '%'
})

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)