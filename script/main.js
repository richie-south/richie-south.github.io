'use strict';

var scr = scr || {};

scr.init = function(){
    //scr.menu();
    //scr.profileImage();
};

scr.profileImage = function(){
    var imageDiv = document.querySelector('.profileImage');
    window.addEventListener('scroll', function(e){
        var max = window.pageYOffset;
        imageDiv.style.borderRadius = max+"px";
    });
};

scr.menu = function(){
    var max, percent;
    var header = document.querySelector('header');
    var imageDiv = document.querySelector('.profileImage');

    imageDiv.style.height = '1px';
    imageDiv.style.width = '1px';
    imageDiv.style.visibility = 'hidden';

    window.addEventListener('scroll', function(e){
        max = document.body.scrollHeight - innerHeight;
        percent = (pageYOffset / max) * 100;

        imageDiv.style.height = percent*8 +'px';
        imageDiv.style.width = percent*8 +'px';
        imageDiv.style.visibility = ''

        if(percent === 0){
            imageDiv.style.height = '1px';
            imageDiv.style.width = '1px';
            imageDiv.style.visibility = 'hidden';
        }else if(percent > 30){
        }
    });
};

window.onLoad = new scr.init;
