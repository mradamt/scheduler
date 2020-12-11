import {useState} from 'react';

const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    setHistory(prev => {
      const newHistory = [...prev]
      if (replace) newHistory.shift();
      newHistory.unshift(mode)
      return [...newHistory];
    })
  }

  const back = function() {
    setHistory(prev => {
      if (prev.length <= 1) return;
      const newHistory = [...prev]
      newHistory.shift()
      return [...newHistory];
    })
  }

  const mode = history[0]
  return {mode, transition, back};
}


export default useVisualMode;