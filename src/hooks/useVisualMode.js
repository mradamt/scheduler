import {useState} from 'react';

const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    const historyGrow = [...history]
    if (replace) {
      historyGrow.shift()
    };
    historyGrow.unshift(mode)
    setHistory([...historyGrow]);
  }

  const back = function() {
    if (history.length <= 1) {
      return;
    }

    const historyShrink = [...history]
    historyShrink.shift()
    setHistory([...historyShrink]);
  }

  const mode = history[0]
  return {mode, transition, back};
}


export default useVisualMode;