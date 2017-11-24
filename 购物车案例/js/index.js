$(function () {
    // 初始化fullpage组件
    $('.container').fullpage({
        sectionsColor:["#fadd67", "#84a2d4",  "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered:false,
        navigation:true,
        afterLoad:function (link, index) {
            $('.section').eq(index-1).addClass('now');
        },
         /*离开某一个页面的时候触发*/
        onLeave:function (index, nextIndex, direction) {
            var currentSection = $('.section').eq(index-1);
            if(index == 2 && nextIndex == 3) {
                 /*当前是从第二页到第三页*/
               currentSection.addClass('leaved');
            }else if (index == 3 && nextIndex == 4) {
                 /*当前是从第三页到第四页*/
               currentSection.addClass('leaved');
            }else if (index == 5 && nextIndex == 6) {
                // 当前是从第五页到第六页
                currentSection.addClass('leaved');
                $('.screen06 .box').addClass('show');
            }else if (index == 6 && nextIndex == 7) {
                $('.screen07 .star').addClass('show');
                $('.screen07 .text').addClass('show');
                $('.screen07 .star img').each(function (i, item) {
                    $(this).css('transition-delay', i*0.5+'s');
                });
            }
        },

        afterRender:function () {
            $('.more').on('click', function (){
                $.fn.fullpage.moveSectionDown();
            });
              /*当第四屏的购物车动画结束之后执行收货地址的动画*/
            $('.screen04 .cart').on('transitionend', function (){
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });

            // 第八屏功能
            $('.screen08').on('mousemove', function (e) {
                $(this).find('.hand').css({
                    left:e.clientX-190,
                    top:e.clientY-20
                });
            }).find('.again').on('click', function () {
                $('.now, .leaved, .show').removeClass('now').removeClass('leaved').removeClass('show');
                $('.content [style]').removeAttr('style');
                $.fn.fullpage.moveTo(1);
            });
        },
        scrollingSpeed:1000
    });
});