import { addHandler } from './functions';

function unpress(button) {
  button.classList.remove('pressed');
  let ripple = button.querySelector('.ripple');

  if (ripple && !ripple.classList.contains('animating')) {
    button.removeChild(ripple);
  }
}

export default function (button) {
  addHandler(button, 'mouseleave', () => unpress(button));

  addHandler(button, 'mouseup', () => unpress(button));

  addHandler(button, 'mousedown', function (event) {
    if (event.button !== 2) {
      button.classList.add('pressed');

      let ripple = document.createElement('div');
      ripple.className = 'ripple animating';
      ripple.style.height = `${button.offsetWidth * 2}px`;
      ripple.style.top = `${event.pageY - this.offsetTop - button.offsetWidth}px`;
      ripple.style.left = `${event.pageX - this.offsetLeft - button.offsetWidth}px`;

      addHandler(ripple, 'animationend', function () {
        ripple.classList.remove('animating');

        if (!button.classList.contains('pressed')) {
          button.removeChild(ripple);
        }
      });

      button.appendChild(ripple);
    }
  });
}
