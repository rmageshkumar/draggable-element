let draggableElement = document.querySelector(".draggable-element");

let initialX = 0,
  initialY = 0,
  currentX,
  currentY;
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
  if (moveElement) {
    e.preventDefault();
    currentX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    currentY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;

    draggableElement.style.top = `${
      draggableElement.offsetTop - (initialY - currentY)
    }px`;
    draggableElement.style.left = `${
      draggableElement.offsetLeft - (initialX - currentX)
    }px`;

    initialX = currentX;
    initialY = currentY;
  }
});

draggableElement.addEventListener(
  events[deviceType].up,
  (stopMovement = (e) => {
    moveElement = false;
  })
);

draggableElement.addEventListener("mouseleave", stopMovement);
draggableElement.addEventListener(
  events[deviceType].up,
  (e) => (moveElement = false)
);
