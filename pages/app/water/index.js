import React, {useState} from 'react'
import Image from 'next/image'

export default function Water(){
	const [limit, setLimit] = useState(0)
	const [logs, setLogs]   = useState(new Map())
	const [total, setTotal] = useState(0)
	const [unit, setUnit]   = useState(200)

	const getCurrentTime = () => {
		let current = new Date();
		console.log(current)
		return `${current.getSeconds()}:${current.getMinutes()}:${current.getHours()} ${current.getDay()}\\${current.getMonth()}\\${current.getYear()}`
	}

	return (
		<section>
			<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${total}/${limit}`}</div>
						<div className="input-group my-3 mx-auto">
							<input id="Unit" type="text" name="Unit" className="border-b-4 border-indigo-500 p-1 text-center bg-transparent" value={unit} onChange={event => setUnit(event.target.value)}/>
						</div>
						<button className="m-[10px] p-[10px] bg-gray-900 hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto" onClick={() => {
								setLogs(logs.set(logs.size + 1, {time:getCurrentTime(), amount:unit}))
								setTotal(parseInt(total) + parseInt(unit))
							}}>Tambah</button>
					</div>
				</div>
				<div className="container mx-auto mb-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						{[...logs.keys()].map(function(index){
							return (
								<div key={"log-"+index} className={"card  group hover:w-full duration-700"}>
									<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
										<div className="text-container text-sky-400 flex items-center w-full justify-between">
											<div className="title inline-block"><strong>{logs.get(index).amount} Ml</strong> {logs.get(index).time}</div>
											<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={()=> {
													setTotal(parseInt(total)-parseInt(logs.get(index).amount))
													setLogs(() => {
														logs.delete(index)
														return new Map(logs)
													})}}>X</button></div>
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