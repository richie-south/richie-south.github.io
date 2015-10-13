"use strict";

function colorDot(width, height){
    this.ball = document.createElement("div");
    this.ball.setAttribute("class", "ball");
    this.ball.style.height = height+"px";
    this.ball.style.width = width+"px";
    this.ball.setAttribute("id", width);

}

colorDot.prototype.setObjecColor = function(color){
    this.ball.style.backgroundColor = color;
};

colorDot.prototype.objectProp = function(elem, obj){

};

colorDot.prototype.setObjectSize = function(width, height){
    this.ball.style.width = width+"px";
    this.ball.style.height = height+"px";
};

colorDot.prototype.setObjectPosition = function(left, top){
    this.ball.style.left = left+"px";
    this.ball.style.top = top+"px";
};
