'use strict';

function init(){
    var p = document.querySelector('.mySpan');
    var btn1 = document.querySelector('#divList');
    var btn2 = document.querySelector('#copy');

    btn1.addEventListener('click', function(){
        var div = document.querySelector('.myDiv');
        div.appendChild(makeDivList(10000));
    });

    btn2.addEventListener("click", function(){
        var div = document.querySelector('.myTemp');
        div.appendChild(getTemp());
    });
}

function getTemp(){
    var template = document.querySelector('#template');
    return template.content.querySelector(".temp").cloneNode(true);
}

function makeDivList(len){
    var div;
    var span = document.createElement('span');
    for (var i = 0; i < len; i++) {
        div = document.createElement('div');
        div.innerHTML = i;
        span.appendChild(div);
    }
    return span;
}


window.onload = init;
