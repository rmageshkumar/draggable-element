let draggableElement = document.querySelector(".draggable-element");

let initialX = 0,
  initialY = 0,
  currentX = 0,
  currentY = 0;
let moveElement = false;

let events = {
  mouse: {
    down: "mousedown",
    up: "mouseup",
    move: "mousemove",
  },
  touch: {
    down: "touchstart",
    up: "touchend",
    move: "touchmove",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
