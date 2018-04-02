/**
 * Created by Ð¡»Ò on 2018/4/2.
 */
function $(selector){
    return document.querySelector (selector);
}
var cover=$('.cover');
var backBtn=$('.music-box .back');
var playBtn=$('.music-box .play');
var forwardBtn=$(".music-box .forward");
var titleNode=$('.music-box .title ');
var authorNode=$(".music-box .auther");
var timeNode=$(".music-box .time");
var progressBarNode=$(".music-box .progress .bar");
var progressNowNode=$(".music-box .progress-now");
var musicListContainer=$('.music-box .list');
var timer;
var musicList;

var music = new Audio();
music.autoplay = true;
var musicIndex= 0;

getMusic(function(list){
    musicList = list;
    setPlaylist(list);
    loadMusic(list[musicIndex])
});

playBtn.onclick = function() {
    var icon = this.querySelector('.fa');
    if (icon.classList.contains('fa-play')){
        music.play();
    } else {
        music.pause();
    }
    icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');
};

forwardBtn.onclick=loadNextMusic;
backBtn.onclick=loadLastMusic;
music.onended=loadNextMusic;
music.shouldUpdata = true;

music.onplaying = function () {
    timer =setInterval(function () {
        updateProgress()
    },1000);
    console.log('play')
};


music.onpause =function(){
    console.log("pause");
    clearInterval(timer);
};

music.ontimeupdate = updateProgress;

progressBarNode.onclick = function(e){
    var percent = e.offsetX/parseInt(getComputedStyle(this).width);
    music.currentTime = percent*music.duration;
    progressNowNode.style.width = percent*100+"%";
};

musicListContainer.onclick = function (e) {
    if(e.targetName.toLowerCase()==="li"){
        for(var i=0;i<this.children.length;i++){
            if(this.children[i]=== e.target){
                musicIndex=i;
            }
        }
        console.log(musicIndex);
        loadMusic(musicList[musicIndex]);
    }
};


function setPlaylist(musiclist){
    var container = document.createDocumentFragment();
    musiclist.forEach(function (musicObj) {
        var node=document.createElement('li');
        node.innerText=musicObj.auther+'-'+musicObj.title;
        console.log(node);
        container.appendChild(node);
    });
    musicListContainer.appendChild(container);
}

function loadMusic(songObj){
    music.src = songObj.src;
    titleNode.innerText = songObj.title;
    authorNode.innerText =  songObj.auther;
    cover.style.backgroundImage ='url('+songObj.img+')';
    for(var i=0;i<musicListContainer.children.length;i++){
        musicListContainer.children[i].classList.remove('playing');
    }
    musicListContainer.children[musicIndex].classList.add('playing');
}

function loadNextMusic(){
    musicIndex++;
    musicIndex=musicIndex%musicList.length;
    loadMusic(musicList[musicIndex]);
}

function loadLastMusic(){
    musicIndex--;
    musicIndex=(musicIndex+musicList.length)%musicList.length;
    loadMusic(musicList[musicIndex]);
}

function updateProgress(){
    var percent = (music.currentTime/music.duration)*100+"%";
    progressNowNode.style.width = percent;
    var minutes = parseInt(music.currentTime/60);
    var seconds=parseInt(music.currentTime%60)+"";
    seconds = seconds.length==2 ? seconds:'0'+seconds;
    timeNode.innerText = minutes+":"+seconds;
}

function getMusic(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','music.json',true);
    xhr.send();
    xhr.onload=function(){
        if((xhr.status>=200&&xhr.status<300)||xhr.status===304){
            callback(JSON.parse(xhr.responseText))
        }
    }
}