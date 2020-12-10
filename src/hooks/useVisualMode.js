import {useState} from 'react';

const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    const newHistory = [...history]
    if (replace) {
      newHistory.shift()
    };
    newHistory.unshift(mode)
    setHistory([...newHistory]);
  }

  const back = function() {
    if (history.length <= 1) {
      return;
    }

    const newHistory = [...history]
    newHistory.shift()
    setHistory([...newHistory]);
  }

  const mode = history[0]
  return {mode, transition, back};
}


export default useVisualMode;