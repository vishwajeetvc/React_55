import { useEffect ,useState } from "react";

export default function App() {
  const [quote, setQuote] = useState({});

  function newQuote(){
    fetch('http://localhost:3000/quote')
    .then((resp)=>{
        return resp.json();
      })
    .then(setQuote)
    .catch((e) => console.log(`something when wrong`))
  }
  useEffect(()=>{
    newQuote();
  },[])

  return (
    <>
      <div className="text-center p-5 bg-red-500 max-w-[900px] mx-auto rounded-xl my-[200px]">
        <h1 className="font-bold text-3xl p-5 text-white">"Motivation Quote"</h1>
        <p className=" text-white/90 text-2xl max-w-[700px] text-center mx-auto">{quote.quote}</p>
        <button 
          onClick={newQuote}
          className="border px-4 py-1 border-white text-white rounded-lg mt-4">Next</button>
      </div>
    </>
  );
}
