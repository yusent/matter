export function addHandler(element, eventType, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventType, handler, false);
  } else if (el.attachEvent) { // IE <= 8
    element.attachEvent('on' + eventType, handler);
  } else { // Older browsers
    element['on' + eventType] = handler;
  }
}
