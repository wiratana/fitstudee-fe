import Link from 'next/link'

export default function Home(){
  return (
    <section>
      <div className="bg-form h-screen bg-gray-800 flex items-center">
        <div className="container mx-auto">
          <div className="text-container flex justify-between">
            <Link href="/auth/login" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Login</Link>
            <Link href="/auth/register" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Login</Link>
            <Link href="/app" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">App Dashboard</Link>
            <Link href="/app/food" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Food</Link>
            <Link href="/app/water" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Water</Link>
            <Link href="/app/excercise" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Excercise</Link>
          </div>
        </div>
      </div>
    </section>
  );
}