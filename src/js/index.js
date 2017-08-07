var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = './mock/data.json';
var render = root.render;
var control;
var audiocontrol = new root.audioControl();
var songList;
var processor = root.processor;
var playlist = root.playList;


// 绑定touch事件
function bindTouch(){
    $sliderPoint = $scope.find('.slider-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on('touchstart',function(){
       processor.stop(); 
    }).on('touchmove',function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage < 0 || percentage > 1){
            percentage = 0;
        }
        processor.update(percentage);
    }).on('touchend',function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage<0||percentage>1){
            percentage = 0;
        }
        var index = control.index;
        var curData = songList[index];
        var currentTime = curData.duration * percentage;
        processor.start(percentage);
        audiocontrol.jumpToPlay(currentTime);
        $scope.find('.play-btn').addClass('playing');
        audiocontrol.status = 'play';
    })
}

$scope.on('play',function(event,index,flag){
    var curData = songList[index];
    render(curData);
    audiocontrol.setAudioSource(curData.audio);
    // playlist.singSong(control.index);
    if(audiocontrol.status == 'play' || flag){
        audiocontrol.play();
        processor.start();
    }
    processor.render(curData.duration);
    processor.update(0)
})

$scope.on('click','.prev-btn',function(){
    var index = control.prev();
    $scope.trigger('play',index);
})

$scope.on('click','.next-btn',function(){
    var index = control.next();
    $scope.trigger('play',index);
})



// 点击播放按钮
$scope.on('click','.play-btn',function(){
    if(audiocontrol.status === 'play'){
        audiocontrol.pause();
        processor.stop();
    }else{
        audiocontrol.play();
        processor.start();
    } 
    $(this).toggleClass('playing');
})

// 点击列表按钮
$scope.on('click','.list-btn',function(){
    playlist.show(control);
})
function successCallback(data){
    songList = data;
    bindTouch();
    playlist.render(data);
    control = new root.Control(data.length);
    $scope.trigger('play',0);
}
function getData(url,callback){
    $.ajax({
        url: url,
        type: "GET",
        success: callback,
        error: function(){
            console.log('error');
        }
    })
}
// root.renderInfo(data);
getData(dataUrl,successCallback);