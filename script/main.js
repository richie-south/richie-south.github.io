'use strict';


const random = (nr) => {
  return Math.floor(Math.random() * nr);
};

const starSize = () => {
  return Math.random() * 2;
};

const Star = class {

  constructor(x, y, size, start, stop){
    this.x = x;
    this.y = y;
    this.size = size;
    this.start = start;
    this.stop = stop * Math.PI;
    this.width = 60 + size;
    this.height = 60 + size;

    this.visited = false;
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
      if (amount > 1) {
        clearInterval(drawInterval);
        done();
      }
      canvas.beginPath();
      canvas.lineWidth = 0.2;
      canvas.strokeStyle = '#ff7280';
      canvas.moveTo(this.x, this.y);
      canvas.lineTo(this.x + (star.x - this.x) * amount, this.y + (star.y - this.y) * amount);
      canvas.stroke();


      amount += 0.06;
    }, Math.random() * 100);
  }
};

const shuffle = (a) => {
    let j, x, i;
    const array = a.slice();
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
  return array;
};

const connectStars = (canvas, stars, root) =>{
  stars
    .filter(star => !star.visited && root.colision(star))
    .map(star => { star.visited = true; return star; })
    .forEach(star =>
      root.drawLineTo(canvas, star, connectStars.bind(null, canvas, stars, star)));
};

const createCanvasStar = (canvas, x, y, size, start, stop, color) => {
  canvas.fillStyle = color || '#FFFFFF';
  canvas.beginPath();
  canvas.arc(x, y, size, start, stop);
  canvas.closePath();
  canvas.fill();
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
      0, 2
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
  return [canvas, stars];
};

const init = () => {
  const canvasElement = document.querySelector('#canvas');

  const [canvas, stars] = background(canvasElement);
  connectStars(canvas, stars, stars[Math.floor(Math.random()*stars.length)]);

  window.addEventListener('resize', function(event){
    background(canvasElement);
  });
};

window.onload = init;
