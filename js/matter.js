import './polyfill';
import initButton from './buttons';

export function initComponents(parentNode) {
  for (let button of parentNode.querySelectorAll('[class$="raised-btn"]')) {
    initButton(button);
  }
}
