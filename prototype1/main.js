/*Ball*/
document.oncontextmenu = new Function("return false;");

var doClick = true;
var newHeaderColor;

function getElems() {
    var elems = document.querySelectorAll("li");
    for (var i = 0; i < elems.length; i++) {
        eventListner(i);
    }

    function eventListner(j) {
        /*elems[j].addEventListener("click", function (event) {
            if(doClick){
                doClick = false;
                var obj = new makeObject(40, 40);
                objectProp(elems[j], event, obj);
            }
        }, false);*/
        downPress(elems[j]);
    }
}

function downPress(elem){
    var pressTimer;
    var size = {max: 100, size: 0, standard: 20};
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
        doClick = false;
        isDownPressing = true;

        pos = getObjectPosition(e, size.standard);
        obj = new makeObject(size.standard, size.standard);
        setObjectPosition(obj.ball, pos.x, pos.y);
        objectProp(elem, obj);

        pressTimer = setInterval(function(){
            size.size++;
            if(size.size > size.max){
                setObjectSize(obj.ball, size.max, size.max);
                size.size = size.max;
            }else{
                setObjectSize(obj.ball, size.size, size.size);
            }
            setObjectPosition(obj.ball, pos.x, pos.y);
        }, 40);
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

    elem.addEventListener('webkitAnimationEnd', function(event){
        try{
        	elem.removeChild(obj.ball);
			headerColor(elemColor);
            newHeaderColor = mixColors(elemColor);
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

function headerColor(color){
	var header = document.querySelector(".colorWrap");
    header.style.backgroundColor = color;
    header.classList.add("colorChange");

    header.addEventListener('webkitAnimationEnd', function(e){
        try{
			header.classList.remove("colorChange");
            var behindHeader = document.querySelector(".menu");
            behindHeader.style.backgroundColor = color;
            setHeaderColor(newHeaderColor);
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

function mixColors(color, size){
    size = size || 20;
    var activeColor = getHeaderColor();

    if(activeColor === ""){
        return false;
    }

    var activeRGB = rgbStringToArray(activeColor);
    var colorRGB = rgbStringToArray(color);

    // rybColorMix
    var c;
    var a = rgb2ryb(stringArrayToNumber(activeRGB));
    var b = rgb2ryb(stringArrayToNumber(colorRGB));


    c = rybColorMixer.mix(b, a);
    var d = rybColorMixer.rybToRgb(c);
    console.log(d);

    return "rgb("+d[0]+","+d[1]+","+d[2]+")";
    //var a = new one.color.CMYK(<cyan>, <magenta>, <yellow>, <black>[, <alpha>]);
    //console.log(a);

}

function rgbStringToArray(string){
    return string.match(/\d+/g);
}

function stringArrayToNumber(arr){
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(Number(arr[i]));
    }
    return result;
}

window.onload = function(){
    getElems();
};
