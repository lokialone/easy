import nextSvg  from './assets/santa.svg';

let container = document.createElement('div');


let style =`
    width: 30px;
    border: 1px solid gray;
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: white;
    user-select: none;
`;

function styleStringfy(style:string) {
    return style.split('\n').map((str) => str.trim()).join('');
}

if (container) {
    container.style.position = 'fixed';
    container.style.width = '30px';
    container.style.userSelect= 'none';
    container.innerHTML = `<div style="${styleStringfy(style)}"> <img draggable="false" width='20px;user-select: none;' src='${nextSvg}'/></div>`;
}

let moveInfo = {
    x: 0,
    y: 0,
}
let moveable = false;

let screenWidth = 0;

function adjustPosition(left = 0, width = 0) {
    if (left + (width / 2) < screenWidth / 2)  {
        container.style.left = 16 + 'px';
    } else {
        container.style.left = `${screenWidth - width}px`;
    }
}
container.addEventListener('mousedown', (event) => {
    moveInfo.x = event.clientX;
    moveInfo.y = event.clientY;
    moveable = true;
});

window.addEventListener('mouseup', () => {
    let { left, top, width } = container.getClientRects()[0];
    container.style.left = left + 'px';
    container.style.top = top + 'px';
    container.style.transform = `translate(0, 0)`;
    moveable = false;
    adjustPosition(left, width);
});

window.addEventListener('mousemove', (event) => {
    if(!moveable) return;
    // event.stopPropagation();
    let dx = event.clientX - moveInfo.x;
    let dy = event.clientY - moveInfo.y;
    container.style.transform = `translate(${dx}px, ${dy}px)`;
});

window.addEventListener('DOMContentLoaded', () => {
    screenWidth = document.body.offsetWidth;
    document.body.appendChild(container);
});

