'use strict';

var scr = scr || {};

scr.init = function(){
    var set = [];
    var loops = 50;

    for (var i = 0; i < loops; i++) {
        set.push(Math.floor(Math.random() * 500) +1)
        console.log('hej');
    }
    console.log(set);
};

window.onload = scr.init;
