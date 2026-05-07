const videoPlayer = document.getElementById("videoPlayer");

const videoInput = document.getElementById("videoInput");

const videoList = document.getElementById("videoList");

const seekBar = document.getElementById("seekBar");

const volumeBar = document.getElementById("volumeBar");

const fsSeekBar = document.getElementById("fsSeekBar");

const fsVolumeBar = document.getElementById("fsVolumeBar");

const container = document.getElementById("videoContainer");

let videos = [];

/* =========================
   CARREGAR VÍDEOS
========================= */

videoInput.onchange = (e)=>{

    [...e.target.files].forEach(file=>{

        videos.push({

            name:file.name,
            url:URL.createObjectURL(file)
        });

    });

    renderVideos();
};

function renderVideos(){

    videoList.innerHTML = "";

    videos.forEach((v,i)=>{

        let div = document.createElement("div");

        div.innerText = v.name;

        div.onclick = ()=>loadVideo(i);

        videoList.appendChild(div);
    });
}

function loadVideo(i){

    videoPlayer.src = videos[i].url;

    videoPlayer.play();
}

/* =========================
   PLAY CONTROLS
========================= */

function togglePlay(){

    videoPlayer.paused
        ? videoPlayer.play()
        : videoPlayer.pause();
}

function stopVideo(){

    videoPlayer.pause();

    videoPlayer.currentTime = 0;
}

function forward(){

    videoPlayer.currentTime += 10;
}

function backward(){

    videoPlayer.currentTime -= 10;
}

function muteVideo(){

    videoPlayer.muted = !videoPlayer.muted;
}

/* =========================
   TEMPO (SEEK BAR)
========================= */

videoPlayer.addEventListener("timeupdate",()=>{

    if(videoPlayer.duration){

        let value =
            (videoPlayer.currentTime /
            videoPlayer.duration) * 100;

        seekBar.value = value;
        fsSeekBar.value = value;
    }
});

seekBar.oninput = ()=>{

    videoPlayer.currentTime =
        (seekBar.value / 100) *
        videoPlayer.duration;
};

fsSeekBar.oninput = ()=>{

    videoPlayer.currentTime =
        (fsSeekBar.value / 100) *
        videoPlayer.duration;
};

/* =========================
   VOLUME
========================= */

volumeBar.oninput = ()=>{

    videoPlayer.volume = volumeBar.value;

    fsVolumeBar.value = volumeBar.value;
};

fsVolumeBar.oninput = ()=>{

    videoPlayer.volume = fsVolumeBar.value;

    volumeBar.value = fsVolumeBar.value;
};

/* =========================
   FULLSCREEN
========================= */

function toggleFullscreen(){

    if(!document.fullscreenElement){

        container.requestFullscreen();

    }else{

        document.exitFullscreen();
    }
}