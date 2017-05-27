import { addHandler } from './functions';

function removeRippleFrom(button) {
  let ripple = button.querySelector('.ripple');

  if (ripple) {
    button.removeChild(ripple);
  }
}

export default function (button) {
  addHandler(button, 'mouseleave', () => removeRippleFrom(button));

  addHandler(button, 'mouseup', () => removeRippleFrom(button));

  addHandler(button, 'mousedown', function (event) {
    if (event.button !== 2) {
      let ripple = document.createElement('div');
      ripple.className = 'ripple';
      button.appendChild(ripple);
    }
  });
}
