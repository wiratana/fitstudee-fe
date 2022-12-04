import React, {useEffect, useState} from 'react'

const excerciseLists = [
	{
		id:0,
		name:"push up",
		duration:60,
		description: "bla bla bla",
		image: "",
		burn: 150
	},
	{
		id:1,
		name:"pull up",
		duration:60,
		description: "bla bla bla",
		image: "",
		burn: 250
	},
	{
		id:2,
		name:"sit up",
		duration:60,
		description: "bla bla bla",
		image: "",
		burn: 350
	},
	{
		id:3,
		name:"squat",
		duration:60,
		description: "bla bla bla",
		image: "",
		burn: 150
	},
	{
		id:4,
		name:"chin up",
		duration:60,
		description: "bla bla bla",
		image: "",
		burn: 5
	}

]

export default function Food(){
	const [currentState, setCurrentState] = useState(0)
	const [calories, setCalories] = useState(0)
	const [burnedCalories, setBurnedCalories] = useState(0)
	const [excercises, setExcercises] = useState(new Map())
	const [time, setTime] = useState(0)
	const [timerStatus, setTimerStatus] = useState(0)

	useEffect(() => {
		const play  = () => setTime(time-1)
		const pause = () => setTime(time)
		
		const interval = setInterval(timerStatus ? play : pause, 1000)

		if(!Math.max(time,0)) clearInterval(interval)
	
		return () => clearInterval(interval)
	})


	const render = () => {
		if(currentState == 0){
			return (
				<section>
					<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
						<div className="container mx-auto mt-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${burnedCalories}/${calories}`}</div>
							</div>
						</div>
						<div className="container mx-auto my-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{excerciseLists.map(function(excercise,i){
									return (
										<div key={excercise.name} className={"card  group hover:w-full duration-700"} onClick={()=> {
											setExcercises(new Map(excercises.set(excercises.size + 1,excercise)))
											setBurnedCalories(parseInt(burnedCalories) + parseInt(excercise.burn))
										}}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center`}>
												<div className="img-container w-fit">
													<img src="{excercise.image}" alt=""/>
												</div>
												<div className="text-container text-sky-400 flex items-center">
													<div className="title inline-block">{excercise.name}</div>
												</div>
											</div>
										</div>
									)	
								})}
							</div>
						</div>
						<div className="container mx-auto mb-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{[...excercises.keys()].map(function(index){
									return (
										<div key={"item-"+index} className={"card  group hover:w-full duration-700"}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
												<div className="img-container w-fit">
													<img src="" alt=""/>
												</div>
												<div className="text-container text-sky-400 flex items-center w-full justify-between">
													<div className="title inline-block">{excercises.get(index).name}</div>
													<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white"
														onClick={()=> {
															setBurnedCalories(parseInt(burnedCalories) - parseInt(excercises.get(index).burn))
															setExcercises(() => {
																excercises.delete(index)
																return new Map(excercises)
															})}}>X</button></div>
												</div>
											</div>
										</div>
									)
								})}
								<button className={`m-[10px] p-[10px] hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto ${excercises.size == 0 ? 'bg-gray-500' : 'bg-gray-900'}`} onClick={() => {
									setTime([...excercises.values()].reduce((a,b) => a + parseInt(b.duration),0))
									setCurrentState((currentState+1) % 2)
								}} disabled={excercises.size == 0 ? true : false}>Start</button>
							</div>
						</div>
					</div>
				</section>
			)
		}

		if(currentState == 1){
			return (
				<section>
					<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
						<div className="container mx-auto mt-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">Duration : {time}</div>
								<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">5000/1000</div>
								<button className={`m-[10px] p-[10px] hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto ${excercises.size == 0 ? 'bg-gray-500' : 'bg-gray-900'}`} onClick={() => {
									if(time) 
										setTimerStatus(Number(!timerStatus))
									else
										setCurrentState((currentState+1) % 2)
								}}>{time ? timerStatus ? 'Pause' : 'Play' : 'Finish'}</button>
							</div>
						</div>
						<div className="container mx-auto my-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{[...excercises.keys()].map(function(index){
									return (
										<div key={"item-"+index} className={"card  group hover:w-full duration-700"}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>						<div className="text-container text-sky-400 flex items-center w-full justify-between">
													<div className="title inline-block">{excercises.get(index).name}</div>
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
	}

	return render()
}