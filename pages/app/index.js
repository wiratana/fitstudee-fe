import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

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
                
                await fetch('http://localhost:5000/food-log', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem("access-token")}`,
                  },
                })
                .then(async (res)=>{
                    await res.json().then(async (data)=>{
                        if (data.length > 0) {
                            localStorage.setItem('calories_consumption',data.map((e) => e.cal).reduce((a,b) => a+b))
                            setCal(localStorage.getItem('calories_consumption'))
                        }
                    })
                })
            })
        }
        getUserData()
    })
    
	return (
		<section>
			<div className="bg-form h-full base-background flex items-center flex-col">
				<div className="container mx-auto my-5">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex mb-[20px]">
                        <div className="text-container text-center">
                            <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                            <h1 className="text-sky-900 text-2xl">FitStudee</h1>
                        </div>
						<div className="w-1/2 p-[20px] base-background text-white rounded mx-auto text-center my-[20px] shadow"><span className="text-2xl">&#127838;</span> Konsumsi Kalori : <span className="text-lg font-bold">{cal}</span>/<span className="text-md">{calNeed}</span></div>
						<div className="text-container flex justify-around">
                            <Link href="/app/food" className={`block shadow rounded-md overflow-hidden m-[10px] base-background card w-1/3 pb-[10px] hover:drop-shadow-2xl hover:scale-110 duration-300`}>
                                <Image src="/assets/img/example2.jpeg" width={300} height={300} className="object-fill"/>
                                <div className="text-container p-[5px_10px] text-xl text-slate-50 font-semibold text-center">
                                    Food
                                </div>
                            </Link>
                            <Link href="/app/excercise" className={`block shadow rounded-md overflow-hidden m-[10px] base-background card w-1/3 pb-[10px] hover:drop-shadow-2xl hover:scale-110 duration-300`}>
                                <Image src="/assets/img/example.jpeg" width={300} height={300} className="object-fill"/>
                                <div className="text-container p-[5px_10px] text-xl text-slate-50 font-semibold text-center">
                                    Excercise
                                </div>
                            </Link>
                            <Link href="/app/water" className={`block shadow rounded-md overflow-hidden m-[10px] base-background card w-1/3 pb-[10px] hover:drop-shadow-2xl hover:scale-110 duration-300`}>
                                <Image src="/assets/img/example3.jpg" width={300} height={300} className="object-fill"/>
                                <div className="text-container p-[5px_10px] text-xl text-slate-50 font-semibold text-center">
                                    Water
                                </div>
                            </Link>
		        		</div>
					</div>
				</div>
			</div>
		</section>
	)
}