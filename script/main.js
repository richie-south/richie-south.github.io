'use strict';

const random = (nr) => {
  return Math.floor(Math.random() * nr);
};

const starSize = () => {
  return Math.random() * 2;
};

const createStar = (canvas, x, y, size, start, stop) => {
  canvas.fillStyle = '#FFFFFF';
  canvas.beginPath();
  canvas.arc(x, y, size, start, stop * Math.PI);
  canvas.closePath();
  canvas.fill();
};

const background = (canvasElement) => {
  canvasElement.height = window.innerHeight;
  canvasElement.width = window.innerWidth;
  const canvas = canvasElement.getContext('2d');
  console.log(window.innerWidth / 4);
  for (let i = 0; i < (window.innerWidth / 4); i++) {
    createStar(
      canvas,
      random(canvasElement.width),
      random(canvasElement.height),
      starSize(),
      0, 2);
  }
};

const init = function(){
  const canvasElement = document.querySelector('#canvas');
  background(canvasElement);
  window.addEventListener('resize', function(event){
    background(canvasElement);
  });
};

window.onload = init;
