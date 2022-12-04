export default function Home(){
  return (
    <section>
      <div className="bg-form h-screen bg-gray-800 flex items-center">
        <div className="container mx-auto">
          <div className="text-container flex justify-between">
            <a href="/auth/login" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Login</a>
            <a href="/auth/register" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Login</a>
            <a href="/app" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">App Dashboard</a>
            <a href="/app/food" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Food</a>
            <a href="/app/water" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Water</a>
            <a href="/app/excercise" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Excercise</a>
          </div>
        </div>
      </div>
    </section>
  );
}