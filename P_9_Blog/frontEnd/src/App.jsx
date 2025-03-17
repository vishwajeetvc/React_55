import { Outlet } from 'react-router'

export default function App() {
  return (
    <>
      <div className="flex flex-col items-center mt-[20px]">
        <NavBar />
        <Outlet/>
      </div>
    </>
  );
}

function NavBar() {
  return (
    <>
      <div>
        <nav className=" mx-auto w-[800px] flex justify-between p-5">
          <h1 className="text-5xl font-bold">MBI - Blogs</h1>
          <button className="text-3xl">✍ </button>
        </nav>
      </div>
    </>
  );
}

