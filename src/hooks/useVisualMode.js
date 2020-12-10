import {useState} from 'react';

const useVisualMode = function (initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    const historyGrow = [...history]

    if (replace) historyGrow.pop();
    
    historyGrow.push(mode)
    setHistory([...historyGrow]);
  }

  const back = function() {
    if (history.length <= 1) {
      return;
    }

    const historyShrink = [...history]
    historyShrink.pop()
    setHistory([...historyShrink]);
  }

  const mode = history.slice(-1)[0]
  return {mode, transition, back};
}


export default useVisualMode;