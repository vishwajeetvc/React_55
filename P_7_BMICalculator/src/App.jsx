import { useRef, useEffect, useState } from "react";
import bmi_image from "./assets/bmi2.svg";
import stick from "./assets/stick.svg";
export default function App() {
  const [bmi, setBmi] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  function calculateBmi(){
    if(!weight || !height) return ;
    console.log(typeof weight, typeof height)
    const bmi = +weight / ((+height/100) * (+height/100) );
    console.log(bmi)
    setBmi(bmi.toFixed(2));
  }

  return (
    <div className="mt-[50px] flex  flex-col p-2 items-center">
      <h1 className=" font-bold text-center text-3xl py-5">Body Mass Index</h1>
      <div>
        <BMI bmi={bmi} />
      </div>
      <div></div>
      {bmi && <div className="p-3 font-bold text-gray-600 text-2xl">{bmi}</div>}
      <div className="flex justify-center flex-col items-center">
        <div className="flex justify-center">
          <input
            className={`border w-[40%] mx-2 px-2 py-3 rounded border-gray-300 border-2 text-sm font-bold text-center`}
            type="text"
            value={weight}
            placeholder="weight in kg"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
          <input
            className={`border font-bold w-[40%] mx-2 px-2 py-3 border-gray-300 border-2 rounded text-sm text-center`}
            type="text"
            value={height}
            placeholder="Height in cm"
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
        </div>
        <button 
          onClick={calculateBmi}
          className="bg-green-500 p-2 w-[84%] my-2 rounded font-bold text-white text-2xl">
          Calculate
        </button>
      </div>
      <p className="text-sm font-bold text-gray-400 absolute bottom-[40px]">Created With ❤️  by Vishwajeet Kumar</p>
    </div>
  );
}

function BMI({ bmi }) {
  const [deg, setDeg] = useState(-90);

  const degree = [-0, -180, -90];
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      if (degree.length) {
        setDeg(degree[0]);
        degree.splice(0, 1);
      } else {
        clearInterval(timerId.current);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (bmi == 0) return;
    if (bmi < 18.5) {
      setDeg("-155");
    } else if (bmi < 25) {
      setDeg("-112");
    } else if (bmi < 30) {
      setDeg("-67");
    } else if (bmi >= 30) {
      setDeg("-19");
    }
  });

  return (
    <>
      <div className="relative w-[300px]">
        <img className="w-full" src={bmi_image} />
        <img
          style={{ transform: `rotate(${deg}deg)` }}
          className={` absolute w-[120px] bottom-16 left-[67%] transition-all duration-[800ms] translate-x-[-50%] origin-[6%_50%]`}
          src={stick}
        />
      </div>
    </>
  );
}
