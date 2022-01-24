// $('html, body').stop().animate({
//     scrollTop : 0
// }, 1000)

// $(window).on('load', function() {
//     $('.loading').delay(3000).fadeOut()
// })

var loadcount = 0
var countStop = setInterval(add, 25)
function add() {
    loadcount++
    if (loadcount>100) {
        clearInterval(countStop)
        $('.loading').delay(100).fadeOut()
        return false
    }
    $('.loading p').text(loadcount+'%')

}

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

    if (num===4) {
        $('#sect4').addClass('on')
    } else {
        $('#sect4').removeClass('on')
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
        $('.skillContainer').removeClass('on')
        $('#sect2 .skillContainer > div > .score').css({
            height:'0%'
        })
    } else if ( sct>=sDist1 && sct<sDist2 && !cflag && !$('.skillContainer').hasClass('on')) {
        $('#menu li').eq(1).addClass('on').siblings().removeClass('on')
        $('.skillContainer').addClass('on')
        count(90, '.html', 15)
        count(80, '.css', 16)
        count(70, '.script', 17)
        count(60, '.jquery', 18)
        count(50, '.react', 19)
        $('#sect4').removeClass('on')
    } else if ( sct>=sDist2 && sct<lastSect && !cflag) {
        $('#menu li').eq(2).addClass('on').siblings().removeClass('on')
    } else if ( sct>=lastSect && !cflag) {
        $('#menu li').eq(3).addClass('on').siblings().removeClass('on')
        $('#sect4').addClass('on')
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


// ---
$(window).on('load', function() {
    $('#sect3 ul').isotope({
        filter:'*',
        layoutMode: 'masonry',
        itemSeletor: '.item'
    })
})

// 세번째 박스
$('#sect3 .category a').on('click', function() {
    var filterValue = $(this).attr('href')
    $('#sect3 ul').isotope({
        filter:filterValue,
        layoutMode: 'masonry', //fitRows, masonry
        itemSeletor: '.item'
    })

    return false
})

$('#sect3 .grid li a').on('click', function() {
    var href = $(this).attr('href')
    var title = $(this).attr('title')
    var src = $(this).find('img').attr('src')
    var alt = $(this).find('img').attr('alt')

    $('body').append(`<div class="outLayer"><div class="inLayer"><h2>${title}</h2><div><img src="${src}" alt="${alt}"><a href="${href}" target="_blank">사이트 이동</a></div></div><button type="button">닫기</button></div>`)
    $('.outLayer').css({
        position: 'fixed',
        top: 0, right: 0, left: 0, bottom: 0,
        background: 'rgba(0,0,0,.5)',
        zIndex:999999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    })
    $('.inLayer').css({
        maxWidth: '600px',
        fontSize: '30px',
        textAlign: 'center',
        color: '#fff'
    })
    $('.inLayer a').css({
        border: '2px solid #fff',
        display: 'block',
        width: '200px',
        fontSize: '20px',
        padding: '10px 20px',
        background: 'skyblue',
        margin: '10px auto'
    })
    $('.outLayer button').css({
        position: 'absolute',
        top: '10px', right: '10px',
        fontSize: '30px',
        color: '#fff'
    })

    return false;
})

$(document).on('click', '.outLayer button, .outLayer', function() {
    $('.outLayer').remove()
})

$(document).on('click', '.inLayer', function(e) {
    e.stopPropagation() /* inLayer에는 위에 remove()가 전파되지 않도록 하는 것 */
})
// 즉, inLayer를 클릭해도 링크이동만 작동할 뿐 본래 화면에서 inLayer는 안 닫히도록 함