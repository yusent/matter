export default function (button) {
  let transitionEndHandler = event => {
    if (event.propertyName === 'opacity') {
      button.removeChild(event.target);
    }
  };

  let unpressHandler = () => {
    let ripples = button.querySelectorAll('.ripple');

    for (let ripple of ripples) {
      ripple.classList.add('fading-out');
    }
  };

  button.addEventListener('transitionend', transitionEndHandler);
  button.addEventListener('webkitTransitionEnd', transitionEndHandler);
  button.addEventListener('mouseleave', unpressHandler);
  button.addEventListener('mouseup', unpressHandler);

  button.addEventListener('mousedown', function (event) {
    if (event.button !== 2) {
      let ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.height = `${button.offsetWidth * 2}px`;
      ripple.style.top = `${event.pageY - this.offsetTop - button.offsetWidth}px`;
      ripple.style.left = `${event.pageX - this.offsetLeft - button.offsetWidth}px`;

      button.appendChild(ripple);
    }
  });
}
