import { useState } from "react";

let nums = ["00", 0, ".", 1, 2, 3, 4, 5, 6, 7, 8, 9];
let operators = ["c", "-", "x", "/"];
let bigOperators = ["=", "+"];

export default function App() {
  const [equation, setEquation] = useState([]);

  const addKeys = (key) => {

  };

  return (
    <>
      <input
        type="text"
        value={equation.join("")}
        onChange={(e) => {
          setEquation([...equation, e.target.value]);
        }}
        className="w-[186px] py-2 border"
      />
      <Keys add={addKeys} />
    </>
  );
}

function Keys({ add }) {
  return (
    <div>
      <div className="flex">
        <div className="flex w-[114px] flex-wrap-reverse ">
          {nums.map((num) => (
            <Key
              add={add}
              k={num}
              key={num}
              className="w-[38px] text-center border"
            />
          ))}
        </div>

        <div className="flex w-[34px] flex-wrap ">
          {operators.map((op) => (
            <Key
              add={add}
              k={op}
              key={op}
              className="w-[38px] border flex items-center justify-center"
            />
          ))}
        </div>
        <div className="flex w-[40px] flex-wrap ">
          {bigOperators.map((bo) => (
            <Key
              add={add}
              k={bo}
              key={bo}
              className="w-[38px] text-center border flex items-center justify-center "
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Key({ k, className, add }) {
  return (
    <>
      <div onClick={() => add(k)} className={className} key={k}>
        {k}
      </div>
    </>
  );
}

function isOperator(key) {
  if (operators.includes(key) || bigOperators.includes(key)) {
    if (key != "c" && key != "=") {
      return true;
    }
  }
  return false;
}
