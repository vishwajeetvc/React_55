import { useRef, useState } from "react";
export default function App() {
  const [startTime, setStartTime] = useState(0);
  const [now, setNow] = useState(0);
  const timerId = useRef(null);

  function handleStart(){
    setStartTime(Date.now());
    setNow(Date.now());

    if(timerId.current) clearTimeout(timerId.current);
    timerId.current = setInterval(()=>{
      setNow(Date.now());
    },50)
  }
  function handleStop(){
    clearTimeout(timerId.current);
  }

  const passedTime = ((now - startTime)/1000).toFixed(1);

  return (
    <>
      {passedTime}
      <button 
        className="p-2"
        onClick={handleStart}>Start</button>
      <button 
        className="p-2"
        onClick={handleStop}>Stop</button>

    </>
  );
}

