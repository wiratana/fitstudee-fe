import React, {useState} from 'react'
import Link from 'next/link'

export default function Dashboard(){
	return (
		<section>
			<div className="bg-form h-screen bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">2000/4000</div>
						<div className="text-container flex justify-around">
							<Link href="/app/food" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Food</Link
				            <Link href="/app/water" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Water</Link
				            <Link href="/app/excercise" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Excercise</Link
		        		</div>
					</div>
				</div>
			</div>
		</section>
	)
}