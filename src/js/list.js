// 播放列表模块
(function($,root){
    var $playList = $('<div class="play-list">' +
                    '<div class="head">播放列表</div>' +
                    '<ul class="play-list-wrap"></ul>' +
                    '<div class="close-btn">关闭</div>' +
                    '</div>');
    var $scope = $(document.body);
    var Control;
    function render(data){
        var html = '';
        for(var i = 0,Len = data.length; i < Len; i++){
            html += '<li><h3>' +data[i].song + '-<span>' + data[i].singer + '</span></h3></li>'
        }
        $playList.find('.play-list-wrap').html(html);
        $scope.append($playList);
        bindEvent();
    }
    // 绑定事件
    function bindEvent(){
        $playList.find('.close-btn').on('click',function(){
            $playList.removeClass('show');
        })
        $playList.find('ul li').on('click',function(){
            var index = $(this).index();
            Control.index = index;
            $scope.trigger('play',[index,true]);
            singSong(index);
            $scope.find('.play-btn').addClass('playing');
            setTimeout(function(){
                $playList.removeClass('show');
            },500)
        })
    }
    // 标记歌曲
    function singSong(index){
        $playList.find('li').removeClass('playing');
        $playList.find('li').eq(index).addClass('playing');
    }    
    // 显示播放列表
    function show(control){
        Control = control;
        var index = Control.index;
        singSong(index);
        $playList.addClass('show');
    }
    root.playList = {
        render: render,
        show:show,
        singSong:singSong
    }
}(window.Zepto,window.player||(window.player={})))