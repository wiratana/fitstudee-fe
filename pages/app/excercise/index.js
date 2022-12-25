import React, {useEffect, useState} from 'react'
import Image from 'next/image'

const excerciseLists = [
	{
		name:"push up",
		duration:60,
		description: "bla bla bla",
		burn: 150
	},
	{
		name:"pull up",
		duration:60,
		description: "bla bla bla",
		burn: 250
	},
	{
		name:"sit up",
		duration:60,
		description: "bla bla bla",
		burn: 350
	},
	{
		name:"squat",
		duration:60,
		description: "bla bla bla",
		burn: 150
	},
	{
		name:"chin up",
		duration:60,
		description: "bla bla bla",
		burn: 5
	}

]

export default function Excercise(){
	const [currentState, setCurrentState] = useState(0)
	const [calories, setCalories] = useState(0)
	const [burnedCalories, setBurnedCalories] = useState(0)
	const [excercises, setExcercises] = useState([])
	const [time, setTime] = useState(0)
    const [storedTime, setStoredTime] = useState(0)
	const [timerStatus, setTimerStatus] = useState(0)
    const [excerciseLogs, setExcerciseLogs] = useState([])
    const [bodyPreference, setBodyPreference] = useState({})
    const [levelPack, setLevelPack] = useState({})
    
    const getBodyPreference = async () => {
        await fetch(`http://localhost:5000/users/detail/${localStorage.getItem('user_id')}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then(async (res)=>{
            await res.json().then(async (data)=>{
                let level = data.detail.level
                await fetch(`http://localhost:5000/body-pref/${data.detail.body_preference}`)
                .then(async (res) => {
                    await res.json().then(async (data)=> {
                        setBodyPreference(data)
                        setLevelPack(data.level_packs[level])
                    })
                })
            })
        })
    }
    

    const handleSubmit = async () => {
        const data = excercises.map(e => {
                e._userId = localStorage.getItem("user_id")
                delete e._id
                return e
        })
        const JSONdata = JSON.stringify(data)
        await fetch('http://localhost:5000/excercise-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSONdata
        }).then((res)=>{
            loadExcerciseLogs()
            setExcercises([])
        })
    }
    
    const deleteItem = async (excercise) => {
        await fetch(`http://localhost:5000/excercise-log/${excercise._id}`, {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          }
        }).then(()=>loadExcerciseLogs())
    }
    
    const loadExcerciseLogs = async () => {
        await fetch("http://localhost:5000/excercise-log", {
            method: 'GET',          
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
        }).then(async(res) => await res.json().then(async (data)=>setExcerciseLogs(data)))
    }
    
    const ExcerciseLogSeeder = async () => {
        let data = excerciseLists.map(function(e) {
                e._userId = localStorage.getItem("user_id")
                return e
        })
        const JSONdata = JSON.stringify(data)
        console.log(JSONdata)
        await fetch('http://localhost:5000/excercise-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSONdata
        }).then(async(e)=>await e.json().then((e)=>console.log(e)))
    }
    
	useEffect(() => {
		const play  = () => setTime(time-1)
		const pause = () => setTime(time)
		
		const interval = setInterval(timerStatus ? play : pause, 1000)

		if(!Math.max(time,0)) clearInterval(interval)
	
		return () => clearInterval(interval)
	})

    useEffect(() => {
        getBodyPreference()
        loadExcerciseLogs()
    }, [])

	const render = () => {
		if(currentState == 0){
            console.log(time)
			return levelPack.excercises ? (
				<section>
					<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
                        <div className="container mx-auto mt-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
                                <button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={ExcerciseLogSeeder}>Seed Data</button>
							</div>
						</div>
						<div className="container mx-auto mt-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${burnedCalories}/${calories}`}</div>
							</div>
						</div>
						<div className="container mx-auto my-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{levelPack.excercises.map(function(excercise,i){
									return (
										<div key={excercise.name} className={"card  group hover:w-full duration-700"} onClick={()=> {
                                            let arr = [...excercises]
                                            arr.push(excercise)
                                            setExcercises(arr)
											setBurnedCalories(parseInt(burnedCalories) + parseInt(excercise.burn))
										}}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center`}>
												<div className="img-container w-fit">
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
								{excercises ? excercises.map((excercise, i) => {
									return (
										<div key={excercise._id} className={"card  group hover:w-full duration-700"}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
												<div className="img-container w-fit">
                                                
												</div>
												<div className="text-container text-sky-400 flex items-center w-full justify-between">
													<div className="title inline-block">{excercise.name}</div>
													<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white"
														onClick={()=> {
															setBurnedCalories(parseInt(burnedCalories) - parseInt(excercise.burn))
                                                            let arr = [...excercises]
                                                            arr.splice(i, 1)
                                                            setExcercises(arr)
                                                        }}>X</button></div>
												</div>
											</div>
										</div>
									)
								}) : ''}
								<button className={`m-[10px] p-[10px] hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto ${excercises.length == 0 ? 'bg-gray-500' : 'bg-gray-900'}`} onClick={() => {
									setTime(excercises.map((e)=>parseInt(e.duration)).reduce((a,b) => a + b))
                                    setStoredTime(time)
									setCurrentState((currentState+1) % 2)
								}} disabled={excercises.length <= 0 ? true : false}>Start</button>
							</div>
						</div>
                        <div className="container mx-auto mb-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{excerciseLogs ? excerciseLogs.map((excercise, i) => {
									return (
										<div key={excercise._id} className={"card  group hover:w-full duration-700"}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
												<div className="img-container w-fit">
                                                
												</div>
												<div className="text-container text-sky-400 flex items-center w-full justify-between">
													<div className="title inline-block">{excercise.name}</div>
													<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white"
														onClick={()=> {deleteItem(excercise)}}>X</button></div>
												</div>
											</div>
										</div>
									)
								}) : ''}
							</div>
						</div>
					</div>
				</section>
			) : <h1>Loading</h1>
		}

		if(currentState == 1){
            console.log(time)
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
                                    handleSubmit()
                                    localStorage.setItem("calories_burned", storedTime)
								}}>{time ? timerStatus ? 'Pause' : 'Play' : 'Finish'}</button>
							</div>
						</div>
						<div className="container mx-auto my-[100px]">
							<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
								{excercises.map(function(excercise){
									return (
										<div key={`track-${excercise._id}`} className={"card  group hover:w-full duration-700"}>
											<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}><div className="text-container text-sky-400 flex items-center w-full justify-between">
													<div className="title inline-block">{excercise.name}</div>
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