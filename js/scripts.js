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

isTouchDevice();

draggableElement.addEventListener(events[deviceType].down, (e) => {
  e.preventDefault();

  initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
  initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

  moveElement = true;
});

draggableElement.addEventListener(events[deviceType].move, (e) => {
  e.preventDefault();

  if (moveElement) {
    currentX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    currentY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    draggableElement.style.top = `${
      draggableElement.offsetTop + (currentY - initialY)
    }px`;
    draggableElement.style.left = `${
      draggableElement.offsetLeft + (currentX - initialX)
    }px`;

    initialX = currentX;
    initialY = currentY;
  }
});
