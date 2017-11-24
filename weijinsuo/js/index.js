$(function () {
    /*动态响应式轮播图*/
    banner();
    /*初始化页签*/
    initTab();
});
var banner = function () {

    var getData = function (callback) {
        /*数据缓存*/
        if (window.data) {
            callback && callback(window.data);
            return false;
        }
        $.ajax({
            type: 'get',
            url: 'js/data.json',
            data: {},
            dataType: 'json',
            success: function (data) {
                window.data = data;
                callback && callback(window.data);
            }
        });
    };
    /*获取数据页面渲染*/
    var render = function () {
        getData(function (data) {        
            var isMobile = $(window).width() < 768 ? 1 : 0;
            var pointHtml = template('point', {list: data});
            var imageHtml = template('image', {list: data, isM: isMobile});
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    };
    render();
    /*在页面尺寸发生重新渲染*/
    $(window).on('resize', function () {
        render();
    });
    /*手势切换*/
    var isMove = false;
    var startX = 0;
    var distanceX = 0;
    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        /*判断手势*/
        if (isMove && Math.abs(distanceX) > 50) {
            /*左滑手势*/
            if(distanceX < 0){
                /*下一张*/
                $('.carousel').carousel('next');
            }
            /*右滑手势*/
            else{
                /*上一张*/
                $('.carousel').carousel('prev');
            }
        }
        isMove = false;
        startX = 0;
        distanceX = 0;
    })
};
var initTab = function () {
    var $navTabs = $('.nav-tabs');
    var $lis = $navTabs.find('li');
    var widthSum = 0;
    $lis.each(function (index,item) {
        widthSum += $(this).outerWidth(true);
    });
    console.log(widthSum);
    $navTabs.width(widthSum);
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false
    });
}