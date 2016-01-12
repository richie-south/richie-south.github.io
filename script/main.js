'use strict';

var scr = scr || {};

scr.init = function(){
    console.log("init");
    //scr.menu();
    //scr.profileImage();
    scr.mainMenu();
};

scr.mainMenu = function(callback){
    var menuMove = 325;
    var menu = document.querySelector("#menu");
    var leftMenuButton = menu.querySelector(".leftMenuButton");
    var rightMenuButton = menu.querySelector(".rightMenuButton");

    window.addEventListener("scroll", function(e){

        var scrollPos = window.pageYOffset;
        if(scrollPos > menuMove){
            menu.setAttribute("class", "menuFixed");
            leftMenuButton.classList.remove("hide");
            rightMenuButton.classList.remove("hide");
        }else{
            menu.removeAttribute("class", "menuFixed");
            leftMenuButton.classList.add("hide");
            rightMenuButton.classList.add("hide");
        }
    });
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
        max = document.body.scrollHeight - window.innerHeight;
        percent = (window.pageYOffset / max) * 100;

        imageDiv.style.height = percent*8 +'px';
        imageDiv.style.width = percent*8 +'px';
        imageDiv.style.visibility = '';

        if(percent === 0){
            imageDiv.style.height = '1px';
            imageDiv.style.width = '1px';
            imageDiv.style.visibility = 'hidden';
        }else if(percent > 30){
        }
    });
};

window.onload = scr.init;
