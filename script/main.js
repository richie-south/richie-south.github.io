'use strict';

const colors = ['#0ADFFC', '#FFDA04', '#BA52F7', '#11ED38'];




const random = (nr) => {
  return Math.floor(Math.random() * nr);
};

const starSize = () => {
  return Math.random() * 2;
};

class Star {
  constructor(x, y, size, start, stop, color){
    this.x = x;
    this.y = y;
    this.size = size;
    this.start = start;
    this.stop = stop * Math.PI;
    this.width = 60 + size;
    this.height = 60 + size;
    this.visited = false;
    this.color = color;
  }

  colision(star){
    return this.x < star.x + star.width &&
      this.x + this.width  > star.x &&
      this.y < star.y + star.height &&
      this.y + this.height > star.y;
  }

  drawLineTo(canvas, star, done){
    let amount = 0;

    const drawInterval = setInterval(() => {
      canvas.beginPath();
      if (amount > 1) {
      	amount = 1;
        clearInterval(drawInterval);
        done();
        //const audio = new Audio('./blop.mp3');
        //audio.play();
        //createCanvasStar(canvas, star.x, star.y, star.size, star.start, star.stop, star.color);
      }
      canvas.lineWidth = 0.2;
      canvas.strokeStyle = /*this.color;*/ '#ff7280';
      canvas.moveTo(this.x, this.y);

      canvas.lineTo(this.x + (star.x - this.x) * amount, this.y + (star.y - this.y) * amount);
      canvas.stroke();

      amount += 0.08;

    }, Math.random() * 50);
  }
}


const createCanvasStar = (canvas, x, y, size, start, stop, color) => {
  canvas.fillStyle = color || '#FFFFFF';
  canvas.beginPath();
  canvas.arc(x, y, size, start, stop);
  canvas.closePath();
  canvas.fill();
};


const connectStar = (canvas, stars, root) =>{
  stars
    .filter(star => !star.visited && root.colision(star))
    .map(star => { star.visited = true; return star; })
    .forEach(star =>
      root.drawLineTo(canvas, star, connectStar.bind(null, canvas, stars, star)));
};

const background = (canvasElement) => {
  canvasElement.height = window.innerHeight;
  canvasElement.width = window.innerWidth;
  const canvas = canvasElement.getContext('2d');

  const stars = [];
  for (let i = 0; i < (window.innerWidth / 4); i++) {
    const star = new Star(
      random(window.innerWidth),
      random( window.innerHeight),
      starSize(),
      0, 2,
      colors[Math.floor(Math.random()*colors.length)]
    );
    stars.push(star);

    createCanvasStar(
      canvas,
      star.x,
      star.y,
      star.size,
      star.start,
      star.stop);
  }

  connectStar(canvas, stars, stars[Math.floor(Math.random()*stars.length)]);
};

const init = function(){
  const canvasElement = document.querySelector('#canvas');


  background(canvasElement);
  window.addEventListener('resize', function(event){
    background(canvasElement);
  });
};

window.onload = init;
