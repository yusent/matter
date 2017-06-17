if (!Element.prototype.addEventListener) {
  let oListeners = {};
  let runListeners = function (oEvent) {
    if (!oEvent) {
      oEvent = window.event;
    }

    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) {
          oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
        }
        break;
      }
    }
  };

  Element.prototype.addEventListener = function (sEventType, fListener) {
    if (oListeners.hasOwnProperty(sEventType)) {
      let oEvtListeners = oListeners[sEventType];
      let nElIdx;
      let iElId;

      for (nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) {
          nElIdx = iElId;
          break;
        }
      }

      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this['on' + sEventType] = runListeners;
      } else {
        let aElListeners = oEvtListeners.aEvts[nElIdx];

        if (this['on' + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this['on' + sEventType] = runListeners;
        }

        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) {
            return;
          }
        }     

        aElListeners.push(fListener);
      }
    } else {
      oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
      this['on' + sEventType] = runListeners;
    }
  };

  Element.prototype.removeEventListener = function (sEventType, fListener) {
    if (!oListeners.hasOwnProperty(sEventType)) {
      return;
    }

    let oEvtListeners = oListeners[sEventType];
    let nElIdx;
    let iElId;

    for (nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        nElIdx = iElId;
        break;
      }
    }

    if (nElIdx === -1) {
      return;
    }

    for (let iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) {
        aElListeners.splice(iLstId, 1);
      }
    }
  };
}
