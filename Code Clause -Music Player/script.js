const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const volumeSlider = document.getElementById('volume-slider');
const playlist = document.getElementById('playlist');

const tracks = [
    { name: "Song 1", src: "audio/song1.mp3" },
    { name: "Song 2", src: "audio/song2.mp3" },
    { name: "Song 3", src: "audio/song3.mp3" }
];

let currentTrackIndex = 0;
let isShuffle = false;
let isRepeat = false;

// Load the track
function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.src;
    audioPlayer.play();
    updatePlaylistHighlight();
}

// Update playlist display
function updatePlaylist() {
    playlist.innerHTML = '';
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
        playlist.appendChild(li);
    });
}

// Highlight the current track
function updatePlaylistHighlight() {
    const items = playlist.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        if (i === currentTrackIndex) {
            items[i].classList.add('active');
        } else {
            items[i].classList.remove('active');
        }
    }
}

// Event Listeners
playBtn.addEventListener('click', () => audioPlayer.play());
pauseBtn.addEventListener('click', () => audioPlayer.pause());

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
});

nextBtn.addEventListener('click', () => {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    loadTrack(currentTrackIndex);
});

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.backgroundColor = isShuffle ? '#e94560' : '#0f3460';
});

repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.style.backgroundColor = isRepeat ? '#e94560' : '#0f3460';
});

audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        loadTrack(currentTrackIndex);
    } else {
        nextBtn.click();
    }
});

volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value;
});

// Initialize the player
loadTrack(currentTrackIndex);
updatePlaylist();