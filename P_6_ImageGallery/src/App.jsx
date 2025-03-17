import { useEffect, useState, useRef } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const postCount = useRef(0);
  const observer = useRef(null);
  const elRef = useRef(null);

  function fetchData(count) {
    fetch(`http://localhost:3000/get/${count}/${count + 2}`)
      .then((resp) => resp.json())
      .then((d) => {
        if (!d.length) return;
        setData((prev) => [...prev, ...d]);
      });
  }
  function getArr() {
    if (!elRef.current) {
      elRef.current = [];
    }
    return elRef.current;
  }

  useEffect(() => {
    fetchData(postCount.current);
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (elRef.current.at(-1) == entry.target) {
            console.log("End");
            postCount.current += 3;
            fetchData(postCount.current);
          }
        }
      });
    });
  }, []);

  useEffect(() => {
    console.log(data);
    console.log("Observer Conneted");
    elRef.current?.forEach((el) => {
      observer.current.observe(el);
    });
    return () => {
      if (observer.current) {
        console.log("Observer Disconnected");
        observer.current.disconnect();
      }
    };
  }, [data]);
  return (
    <>
      <input
        className={`border rounded px-4 py-2`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button>Search</button>
      <div className=" flex mx-w-[650px] flex-wrap  justify-center gap-5 p-5 ">
        {!query &&
          data.map((item, i) => (
            <div
              ref={(node) => {
                const arr = getArr();
                arr[i] = node;
              }}
              key={item._id}
              className={`w-[90%] sm:w-[300px] rounded-xl overflow-hidden relative`}
            >
              <img
                className=""
                src={`http://localhost:3000/img/${item.name}`}
              />
              <div className="absolute bottom-2 left-[50%] px-4 py-1 bg-red-50 rounded-4xl translate-x-[-50%]">
                {item.name}
              </div>
            </div>
          ))}
        {query &&
          data
            .filter((item) => item.name.includes(query))
            .map((item, i) => (
              <div
                ref={(node) => {
                  const arr = getArr();
                  arr[i] = node;
                }}
                key={item._id}
                className={`w-[90%] sm:w-[300px] bg-red-400 rounded-xl overflow-hidden relative`}
              >
                <img
                  className=""
                  src={`http://localhost:3000/img/${item.name}`}
                />
                <div className="absolute bottom-2 left-[50%] px-4 py-1 bg-red-50 rounded-4xl translate-x-[-50%]">
                  {item.name}
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

