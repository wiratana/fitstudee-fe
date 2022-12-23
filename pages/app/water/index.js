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
			<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${total}/${limit}`}</div>
						<div className="input-group my-3 mx-auto">
							<input id="Unit" type="text" name="Unit" className="border-b-4 border-indigo-500 p-1 text-center bg-transparent" value={unit} onChange={event => setUnit(event.target.value)}/>
						</div>
						<button className="m-[10px] p-[10px] bg-gray-900 hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto" onClick={(e) => handleSubmit() }>Tambah</button>
					</div>
				</div>
				<div className="container mx-auto mb-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						{logs.map(function(e){
							return (
								<div key={e._id} className={"card  group hover:w-full duration-700"}>
									<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
										<div className="text-container text-sky-400 flex items-center w-full justify-between">
											<div className="title inline-block"><strong>{e.amount} Ml</strong>&emsp;{e.created_at}</div>
											<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={() => deleteItem(e._id)}>X</button></div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}