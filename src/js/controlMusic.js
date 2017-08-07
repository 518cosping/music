// 播放音乐模块//
(function($,root){
    var $scope = $(document.body);
    var audioControl = function(){
        this.audio = new Audio();
        this.status = 'pause';
        this.bindEvent();
    }
    audioControl.prototype = {
        bindEvent:function(){
            $(this.audio).on('ended',function(){
                $scope.find('.next-btn').trigger('click');
            });
        },
        // 播放
        play:function(){
            this.audio.play();
            this.status = 'play';
        },
        // 暂停
        pause:function(){
            this.audio.pause();
            this.status = 'pause';
        },
        // 设置音频地址
        setAudioSource:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        // 跳转歌曲进度
        jumpToPlay:function(time){
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.audioControl = audioControl;
}(window.Zepto,window.player||(window.player={})))