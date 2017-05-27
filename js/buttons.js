import { addHandler } from './functions';

export default function (button) {
  addHandler(button, 'mouseleave', function () {
    button.classList.remove('pressed');
  });

  addHandler(button, 'mouseup', function () {
    button.classList.remove('pressed');
  });

  addHandler(button, 'mousedown', function (event) {
    if (event.button !== 2) {
      button.classList.add('pressed');
    }
  });
}
