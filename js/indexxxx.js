// $('html, body').stop().animate({
//     scrollTop : 0
// }, 1000)


$('#menu li').eq(0).addClass('on')
var cflag = false;
$('#menu li a').on('click', function(e){
    e.preventDefault()
    cflag = true;
    $(this).parent().addClass('on')
    $(this).parent().siblings().removeClass('on')
    var num = $(this).parent().index()
    var secDist = $('section').eq(num).offset().top
    if (num>=1 && !$('.skillContainer').hasClass('on')) {
        $('.skillContainer').addClass('on')
        count(90, '.html', 15)
        count(80, '.css', 16)
        count(70, '.script', 17)
        count(60, '.jquery', 18)
        count(50, '.react', 19)
    } else if (num<1) {
        $('.skillContainer').removeClass('on')
    }

    $('html, body').stop().animate({
        scrollTop : secDist
    }, 500, function(){
        cflag = false
    })
})


function count(jumsu, cname, time){
    let num = 0;
    var stop = setInterval(function(){
        num++
        if (num<=jumsu) {
            $(cname).find('.score').css({
                height:num+'%'
            })
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
        }
    }, time)
}



var sDist0 = $('#sect1').offset().top
var sDist1 = $('#sect2').offset().top
var sDist2 = $('#sect3').offset().top

// 마지막구간이 윈도우높이보다 클때
var lastSect = $('#sect4').offset().top             
// 마지막구간이 윈도우높이보다 작을때
// var lastSect = $('body').height() - $(window).height()
var sct=0;
$(window).on('scroll', function(){
    // var wh = $(this).height()
    sct = $(this).scrollTop()
    if ( sct>=sDist0 && sct<sDist1 && !cflag) {
        $('#menu li').eq(0).addClass('on').siblings().removeClass('on')
        $('.skillcontainer').removeClass('on')
        $('#sect2 .skillcontainer > div > .score').stop().animate({
            height: '0%'
        }, 500)
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag && !$('.skillcontainer').hasClass('on')) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
        $('.skillcontainer').addClass('on')
        count(90, '.html', 15)
        count(80, '.css', 16)
        count(70, '.script', 17)
        count(60, '.jquery', 18)
        count(50, '.react', 19)
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
    } 
})


$('section').on('mousewheel', function(event, delta){
    if (delta>0) {    // 마우스휠을 위로 굴리면 양수
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 1000)
    } else if (delta<0) {  // 마우스휠을 아래로 굴리면 음수
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 1000)
    }
})


$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }

})


// 세번째 박스
$('#sect3 ul').isotope({
    
})