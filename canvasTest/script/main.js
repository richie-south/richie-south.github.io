'use strict';

var scr = scr || {};
scr.star = scr.star || {};

scr.init = function(){
    new scr.star.init();
};

scr.star.init = function(){
    this.canvasHeight = 600;
    this.canvasWidth = 600;
    this.starPos = [];
    this.player;

    this.canvas = document.querySelector("#canvas");
    this.draw = this.canvas.getContext("2d");
    this.canvas.height = this.canvasHeight;
    this.canvas.width = this.canvasWidth;

    for (var i = 0; i < 300; i++) {
        var y = scr.star.starPosX(this.canvasHeight);
        var x = scr.star.starPosY(this.canvasWidth);
        var size = scr.star.starSize();

        this.starPos.push({ posX: x, posY: y, size: size });
        scr.star.createStar(this.draw, x, y, size, 0, 2);
    }

    scr.star.createStar(this.draw, x, y, size, 0, 2);

    scr.star.toCanvas(this.draw);
    scr.star.update(this);

    //var p = new Path2D("M10 10 h 80 v 80 h -80 Z");
    //this.draw.fill(p);
};

scr.star.update = function(that){
    var mousePos = {};
    var connectedNodes = 0;
    function update(){
        that.draw.clearRect(0, 0, that.canvasWidth, that.canvasHeight);

        for (var i = 0; i < that.starPos.length; i++) {

            if(scr.star.colision( {x: that.starPos[i].posX, y: that.starPos[i].posY, width: 60, height: 60},
                {x: mousePos.x, y: mousePos.y, width: 60, height: 60} )){

                connectedNodes++;
                scr.star.drawLineToMouse(that, mousePos.x, mousePos.y, that.starPos[i].posX, that.starPos[i].posY, that.starPos[i].size);
            }

            scr.star.createStar(that.draw, that.starPos[i].posX, that.starPos[i].posY, that.starPos[i].size, 0, 2);
        }
        setTimeout(update, 0);
        connectedNodes = 0;
    }

    update();
    that.canvas.addEventListener("mousemove", function(e){
        mousePos = scr.star.getMousePos(that.canvas, e);
    });
};

scr.star.colision = function(obj1, obj2){
    if (obj1.x < obj2.x + obj2.width  && obj1.x + obj1.width  > obj2.x &&
        obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y) {

        return true;
    }
    return false;
};

scr.star.drawLineToMouse = function(that, fromX, fromY, toX, toY, lineWidth){
    lineWidth = lineWidth || 1;

    that.draw.beginPath();
    that.draw.moveTo(fromX, fromY);
    that.draw.lineTo(toX, toY);
    that.draw.strokeStyle = "#ff7280"; //färg
    that.draw.lineWidth = lineWidth;
    scr.star.toCanvas(that.draw);
};

scr.star.getMousePos = function(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
};

scr.star.random = function(nr){
    return Math.floor(Math.random() * nr);
};

scr.star.starPosX = function(height){
    return Math.floor(Math.random() * height);
};

scr.star.starPosY = function(width){
    return Math.floor(Math.random() * width);
};

scr.star.starSize = function(){
    return Math.random() * 2;
};

scr.star.createStar = function(canvas, x ,y ,r, start, stop, color){
    color = color || "#FFFFFF";
    canvas.fillStyle = color;
    canvas.beginPath();
    canvas.arc(x, y, r, start, stop*Math.PI);
    canvas.closePath();
    canvas.fill();
};

scr.star.toCanvas = function (canvas){
    canvas.stroke();
};

window.onLoad = new scr.init;


/*
scr.star.init.prototype.mouseOrb = function(that, draw, canvas){
    var targetX = 0,
        targetY = 0,
        x = 10,
        y = 10,
        velX = 0,
        velY = 0,
        speed = 10;

    function update(){
        var tx = targetX - x,
            ty = targetY - y,
            dist = Math.sqrt(tx*tx+ty*ty),
            rad = Math.atan2(ty,tx),
            angle = rad/Math.PI * 180;

            velX = (tx/dist)*speed;
            velY = (ty/dist)*speed;

            x += velX;
            y += velY;

            //draw.clearRect(0,0,that.canvasWidth, that.canvasHeight);
            draw.fillStyle = "#FFFFFF";
            draw.beginPath();
            draw.arc(x,y,80,0,Math.PI*2);
            draw.fill();

        setTimeout(update,0);
    }

    update();

    canvas.addEventListener("mousemove", function(e){
        targetX = e.pageX;
        targetY = e.pageY;
    });
};*/
