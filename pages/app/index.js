import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dashboard(){
    const router = useRouter()
    const [cal, setCal]         = useState(0)
    const [calNeed, setCalNeed] = useState(0)
    
    useEffect(() => {
        async function getUserData(){
            await fetch(`http://localhost:5000/users/detail/${localStorage.getItem('user_id')}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("access-token")}`,
              },
            })
            .then(async (res) => {
                if(res.status == 403)
                    router.push('/auth/login')
                else
                    await res.json().then((e) => setCalNeed(e.detail.calories_need))
            
                if(localStorage.getItem('calories_consumption') === null)
                    localStorage.setItem('calories_consumption', 0)
                    
                setCal(localStorage.getItem('calories_consumption'))
            })
        }
        getUserData()
    })
    
	return (
		<section>
			<div className="bg-form h-screen bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{cal}/{calNeed}</div>
						<div className="text-container flex justify-around">
							<Link href="/app/food" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Food</Link>
				            <Link href="/app/water" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Water</Link>
				            <Link href="/app/excercise" className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 text-white">Excercise</Link>
		        		</div>
					</div>
				</div>
			</div>
		</section>
	)
}