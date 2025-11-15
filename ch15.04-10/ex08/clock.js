const SVG = "http://www.w3.org/2000/svg";
const secondHand = document.createElementNS(SVG, "line");
secondHand.setAttribute("x1", 50);
secondHand.setAttribute("y1", 50);
secondHand.setAttribute("x2", 50);
secondHand.setAttribute("y2", 15);
document.querySelector("#clock .hands").appendChild(secondHand);

(function updateClock() {
  const now = new Date();
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = (now.getHours() % 12) + min / 60;
  const secangle = sec * 6;
  const minangle = min * 6;
  const hourangle = hour * 30;

  const minhand = document.querySelector("#clock .minutehand");
  const hourhand = document.querySelector("#clock .hourhand");

  minhand.setAttribute("transform", `rotate(${minangle}, 50, 50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle}, 50, 50)`);
  secondHand.setAttribute("transform", `rotate(${secangle}, 50, 50)`);

  setTimeout(updateClock, 1000);
}());