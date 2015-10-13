/*Ball*/
"use strict";
//document.oncontextmenu = new Function("return false;");

var doClick = true;
var newHeaderColor;

var id = {
    red: function(){
        change(15/*id.presure*/, 15, 15); },
    yellow: function(){
        change(0, id.presure, 0); },
    blue: function(){
        change(0, 0, id.presure); },

    presure: 1
};

function getElems() {

    var red = document.querySelector("#red");
    var yellow = document.querySelector("#yellow");
    var blue = document.querySelector("#blue");
    downPress(red, id.red);
    downPress(yellow, id.yellow);
    downPress(blue, id.blue);
}

function downPress(elem, change){
    var pressTimer;
    var size = {max: 100, size: 0, standard: 32};
    var pos = {x: 0, y: 0};
    var obj = {};
    var isDownPressing = false;

    if(!isMobile()){
        elem.addEventListener("mousedown", function (e) { mouseDown(e); }, false);
        elem.addEventListener("mouseup", function (e) { mouseUp(e); }, false);
        elem.addEventListener("mousemove", function(e){ mouseMove(e); }, false);
    }else{
        elem.addEventListener("touchstart", function (e) { mouseDown(e); }, false);
        elem.addEventListener("touchend", function (e) { mouseUp(e); }, false);
        elem.addEventListener("touchmove", function(e){ mouseMove(e); }, false);
    }

    function mouseDown(e){
        if(!doClick){
            return false;
        }
        id.presure = 32;
        doClick = false;
        isDownPressing = true;

        pos = getObjectPosition(e, size.standard);
        obj = new makeObject(size.standard, size.standard);
        setObjectPosition(obj.ball, pos.x, pos.y);
        objectProp(elem, obj);

        moveBallAnimationEnd(elem, obj, change);

        pressTimer = setInterval(function(){
            size.size++;
            if(size.size > size.max){
                setObjectSize(obj.ball, size.max, size.max);
                size.size = size.max;
                id.presure = size.size;
                //moveBallAnimationEnd(elem, obj, change, size.size);
            }else{
                setObjectSize(obj.ball, size.size, size.size);
                id.presure = size.size;
                //moveBallAnimationEnd(elem, obj, change, size.size);
            }
            setObjectPosition(obj.ball, pos.x, pos.y);
            //moveBallAnimationEnd(elem, obj, change);

        }, 20);
    }

    function mouseUp(e){
        clearInterval(pressTimer);
        isDownPressing = false;
        size.size = 0;
        obj.ball.classList.add("ballAnim");
    }

    function mouseMove(e){
        if(isDownPressing){
            pos = getObjectPosition(e, size.size);
        }
    }
}

function setObjectSize(elem, width, height){
    elem.style.width = width+"px";
    elem.style.height = height+"px";
}

function setObjectPosition(elem, left, top){
    elem.style.left = left+"px";
    elem.style.top = top+"px";
}

function isMobile(){
    var mobile = window.matchMedia("only screen and (min-device-width : 320px) and (max-device-width : 480px)");
    return mobile.matches;
}

function objectProp(elem, obj) {
    var elemColor = getElemColor(elem);
    setObjecColor(obj.ball, elemColor);
    appendObject(elem, obj.ball);
}

function moveBallAnimationEnd(elem, obj, change){
    var elemColor = getElemColor(elem);

    elem.addEventListener('webkitAnimationEnd', function(event){
        try{
            elem.removeChild(obj.ball);
            headerColor(elemColor, change);
            doClick = true;
        }catch(err){
        }
    }, false);
}


function setObjecColor(obj, color) {
    obj.style.backgroundColor = color;
}


function getElemColor(elem) {
    return elem.style.backgroundColor;
}

function getObjectPosition(event, size) {
    if(isMobile()){
        var touch = event.touches[0];
        return { x: touch.pageX-(size/2), y: touch.pageY-(size/2)};
    }
    return { x:event.clientX-(size/2), y:event.clientY-(size/2) };
}

function appendObject(elem, object) {
    elem.appendChild(object);
}

function makeObject(width, height) {
    this.ball = document.createElement("div");
    this.ball.setAttribute("class", "ball");
    this.ball.style.height = height+"px";
    this.ball.style.width = width+"px";
    this.ball.setAttribute("id", width);
}

function headerColor(color, change){
	var header = document.querySelector(".colorWrap");
    header.style.backgroundColor = color;
    header.classList.add("colorChange");

    header.addEventListener('webkitAnimationEnd', function(e){
        try{
			header.classList.remove("colorChange");
            change();
            removeFronColor();

        }catch(err){
        }
    }, false );
}

function setHeaderColor(color){
    document.querySelector(".menu").style.backgroundColor = color;
}

function removeFronColor(){
    document.querySelector(".colorWrap").style.backgroundColor = "initial";
}

function getHeaderColor(){
    return document.querySelector(".menu").style.backgroundColor;
}


window.onload = function(){
    getElems();
};
