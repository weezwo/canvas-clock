// canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let radius = canvas.height / 2; // initial radius set to move drawing object

// constants
//const clockFont = "Lobster Two"; 
const clockFont = 'serif';
const hourRad = Math.PI / 6; // radians between numbers on face
const minuteRad = Math.PI / 30; // radians between each minute

ctx.translate(radius, radius);
radius = radius * 0.90; // radius made smaller to draw clock
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius){
  let grad;

  // clock body
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();
  grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  grad.addColorStop(0, '#B7862D');
  grad.addColorStop(0.5, '#F8E27A');
  grad.addColorStop(1, '#B7862D');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius * 0.1;
  ctx.stroke();

}

function drawNumbers(ctx, radius) {
  let ang;

  ctx.beginPath();
  ctx.fillStyle = '#333';
  ctx.font = radius * 0.20 + `px ${clockFont}`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  for(let num = 1; num <= 12; num++){
    ang = num * hourRad;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.78);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.78);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // hour hand
  hour = hour % 12;
  hour = (hour * hourRad) + (minute * Math.PI/(6*60)) + (second * Math.PI/(360*60));
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute hand
  minute = (minute * minuteRad) + (second * Math.PI/(30*60));
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second hand
  second = (second*minuteRad);
  drawHand(ctx, second, radius * 0.9, radius * 0.02);

  // hand nubbin
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();

}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}
