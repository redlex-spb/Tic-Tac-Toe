$(document).ready(function(){
    $('#playground').hide();
    $('#cross').click(function(){
        $('#intro').fadeOut();
        setTimeout(function(){
            $('#playground').fadeIn();
        },400)
    })
    $('#toe').click(function(){
        $('#intro').fadeOut();
        setTimeout(function(){
            $('#playground').fadeIn();
            var ran = getRandom(1,$('td:not(.lock)').length);
            $('td:not(.lock):eq('+ran+')').text('O').addClass('lock').addClass('toe');
        },400)
    })
    $('td').click(function(){
        if ($(this).text() == "") {
            $(this).text('X');
            $(this).addClass('lock');
            $(this).addClass('cross');
            var ran = getRandom(1,$('td:not(.lock)').length);
            $('td:not(.lock):eq('+ran+')').text('O').addClass('lock').addClass('toe');
            /*If Player Win*/
            for (var i=0; i<4 ; i++){
                if ($('tr:eq('+i+') td:eq(0)').hasClass('cross') == true & $('tr:eq('+i+') td:eq(1)').hasClass('cross') == true & $('tr:eq('+i+') td:eq(2)').hasClass('cross') == true) {
                    alert('Game Over!\nPlayer win');
                    reset_game();
                }
            }
            for (var i=0; i<4 ; i++){
                if ($('tr:eq(0) td:eq('+i+')').hasClass('cross') == true & $('tr:eq(1) td:eq('+i+')').hasClass('cross') == true & $('tr:eq(2) td:eq('+i+')').hasClass('cross') == true) {
                    alert('Game Over!\nPlayer win');
                    reset_game();
                }
            }
            if ($('tr:eq(0) td:eq(0)').hasClass('cross') == true & $('tr:eq(1) td:eq(1)').hasClass('cross') == true & $('tr:eq(2) td:eq(2)').hasClass('cross') == true)
            {
                alert('Game Over!\nPlayer win');
                reset_game();
            } 
            if ($('tr:eq(0) td:eq(2)').hasClass('cross') == true & $('tr:eq(1) td:eq(1)').hasClass('cross') == true & $('tr:eq(2) td:eq(0)').hasClass('cross') == true)
            {
                alert('Game Over!\nPlayer win');
                reset_game();
            }       
            /*If Comp Win*/
            for (var i=0; i<4 ; i++){
                if ($('tr:eq('+i+') td:eq(0)').hasClass('toe') == true & $('tr:eq('+i+') td:eq(1)').hasClass('toe') == true & $('tr:eq('+i+') td:eq(2)').hasClass('toe') == true) {
                    alert('Game Over!\nComp win');
                    reset_game();
                }
            }
            for (var i=0; i<4 ; i++){
                if ($('tr:eq(0) td:eq('+i+')').hasClass('toe') == true & $('tr:eq(1) td:eq('+i+')').hasClass('toe') == true & $('tr:eq(2) td:eq('+i+')').hasClass('toe') == true) {
                    alert('Game Over!\nComp win');
                    reset_game();
                }
            }
            if ($('tr:eq(0) td:eq(0)').hasClass('toe') == true & $('tr:eq(1) td:eq(1)').hasClass('toe') == true & $('tr:eq(2) td:eq(2)').hasClass('toe') == true)
            {
                alert('Game Over!\nComp win');
                reset_game();
            } 
            if ($('tr:eq(0) td:eq(2)').hasClass('toe') == true & $('tr:eq(1) td:eq(1)').hasClass('toe') == true & $('tr:eq(2) td:eq(0)').hasClass('toe') == true)
            {
                alert('Game Over!\nComp win');
                reset_game();
            }  
            /*If Draw*/
            if ($('td:not(.lock)').length == 0) {
                alert('Game Over!\nDraw');
                reset_game();
            }
        }
        else {
            alert('Error');
        }
    });
})


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function reset_game() {
    $('#playground').fadeOut();
    setTimeout(function(){
        $('#intro').fadeIn();
    },400);
    for (var i=0;i<10;i++) {
        $('td:eq('+i+')').text("");
        $('td:eq('+i+')').removeClass('lock').removeClass('cross').removeClass('toe');
    }
}