import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'

export default function Water(){
    const router = useRouter()
    const [isFirst, setIsFirst] = useState(0)
	const [limit, setLimit] = useState(2500)
	const [logs, setLogs]   = useState([])
	const [total, setTotal] = useState(0)
	const [unit, setUnit]   = useState(200)
    
    const getWaterLog = async () => {
        await fetch('http://localhost:5000/water-log', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then(async (res) => {
            if(res.status == 403){
                router.push('/auth/login')
            }else{
                await res.json().then(e => {
                    setLogs(e)
                    if(e.length > 0)
                        setTotal(e.map(e => parseInt(e.amount)).reduce((a,b)=> a + b))
                })
            }
        })
    }
    
    const handleSubmit = async (amount) => {
        const data = {amount:unit}
        const JSONdata = JSON.stringify(data)
        await fetch('http://localhost:5000/water-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSONdata
        })
        getWaterLog()
    }
    
    const deleteItem = async (water_log) => {
        await fetch(`http://localhost:5000/water-log/${water_log}`, {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          }
        })
        getWaterLog()
    }
    
    useEffect(() => {
        getWaterLog()
    }, [])

	return (
		<section>
                        <button className={`w-[50px] h-[50px] base-background absolute left-[5px] top-[5px] rounded-full text-slate-50 shadow text-lg`} onClick={()=>router.back()}>Back</button>
			<div className={`bg-form ${logs.length > 2 ? 'h-full' : 'h-screen'} base-background flex items-center flex-col`}>
				<div className="container mx-auto p-5">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
                        <div className="text-container text-center">
                            <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                            <h1 className="text-sky-900 text-2xl">FitStudee</h1>
                        </div>
						<div className="w-1/2 p-[20px] base-background text-white rounded mx-auto text-center my-[20px]"><span className="text-2xl">&#128167;</span> Konsumsi Air : <span className="text-lg font-bold">{total}</span>/<span className="text-md">{limit}</span></div>
						<div className="input-group my-3 mx-auto flex mb-[50px] m-[10px]">
                            <input id="Unit" type="text" name="Unit" className="rounded-bl-lg rounded-tl-lg border-2 border-indigo-500 p-1 text-center bg-transparent" value={unit} onChange={event => setUnit(event.target.value)}/>
                            <button className="rounded-tr-lg rounded-br-lg p-[10px] base-background hover:bg-gray-500 duration-300 align-center text-white w-1/3 mx-auto text-lg" onClick={(e) => handleSubmit() }>&#10133;</button>
						</div>
                        <div className="flex-col flex">
                            {logs.map(function(e){
                                return (
                                    <div key={e._id} className={"card  group hover:w-full duration-700"}>
                                        <div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
                                            <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                                <div className="title inline-block"><span className="text-2xl">&#128167;</span> Jumlah Konsumsi : <span className="text-lg font-bold">{e.amount} ML</span>&emsp;&emsp;<span className="text-md">&#128336; {e.created_at}</span></div>
                                                <div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={() => deleteItem(e._id)}>X</button></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
					</div>
				</div>
			</div>
		</section>
	)
}