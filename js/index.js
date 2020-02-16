/**
 * Created by zhangfuwei on 2020/2/16.
 */


$(window).on('load',function () {

    waterFall();
    $(window).on('scroll',function () {

        if (checkLoadMore()){
            var datas = {'dataImg':[{'img':'1.jpg'},{'img':'1.jpg'},
                {'img':'1.jpg'},{'img':'6.jpg'},
                {'img':'6.jpg'},{'img':'1.jpg'},
                {'img':'2.jpg'},{'img':'2.jpg'}]};
                
                $.each(datas.dataImg,function (index,value) {
                   // 使用jquery实现创建,拼接
                   //  $('<div>')创建div标签
                   //  addClass 添加classname

                    var newBox = $('<div>').addClass('box').appendTo($('#main'));
                    var newpic = $('<div>').addClass('pic').appendTo($(newBox));

                    //创建img标签,修改src属性,拼接
                    $('<img>').attr('src','imgs/'+ $(value).attr('img')).appendTo($(newpic));
                })

            waterFall();
        }
    })

})


function checkLoadMore() {

    var allbox = $('#main>.box');
    var lastBox = $(allbox).last().offset().top;

    // 使用jquery的函数获取对应高度/头部偏移量
    var screenH = $(window).height();
    var screenTop = $(window).scrollTop();

    // console.log(lastBox,screenH,screenTop);

    return lastBox <= screenH+screenTop;

}

function waterFall() {

    // 盒子标签
    var allBox = $('#main>.box');

    // 盒子宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    // 屏幕宽度
    var screenWidth = $(window).width();
    // 列数
    var colum =  Math.floor(screenWidth/boxWidth);


    $('#main').css({
        'width':boxWidth * colum + 'px',
        'margin':'0 auto',
    })


    var heightArrs = [];

    $.each(allBox,function (index,value) {
        // 盒子高度
        var height = $(value).outerHeight();

        // alert(height);
        if (index < colum) {
            // 初始化第一行
            heightArrs[index] = height;
        }else {
            // 获取最低高度
            var minHeight = Math.min.apply(null,heightArrs);
            // 对应高度索引
            var minIdx = $.inArray(minHeight,heightArrs);

            $(value).css({
                'position' : 'absolute',
                'left': boxWidth * minIdx+ 'px',
                'top': minHeight,
            })
            heightArrs[minIdx] += height;
        }

    })



}