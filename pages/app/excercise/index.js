import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'

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
    const router = useRouter()
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
                setCalories(Math.floor(data.detail.calories_need/4))
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
        }).then((res)=>{
            console.log(res)
            loadExcerciseLogs()
        })
    }
    
    const loadExcerciseLogs = async () => {
        await fetch("http://localhost:5000/excercise-log", {
            method: 'GET',          
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem("access-token")}`,
        }}).then(async(res) => await res.json().then(async (data)=>{
            if(data.length > 0)
                setBurnedCalories(data.map(e=>e.burn).reduce((a,b)=>a+b))
            setExcerciseLogs(data)
        }))
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
			return levelPack.excercises ? (
				<section>
                    <button className={`w-[50px] h-[50px] base-background absolute left-[5px] top-[5px] rounded-full text-slate-50 shadow text-lg`} onClick={()=>router.back()}>Back</button>
                    <div className={`bg-form ${excerciseLogs > 5 ? 'h-full' : 'h-screen'} base-background flex items-center flex-col`}>
						<div className="container mx-auto p-5">
							<div className="form mx-auto w-full bg-gray-100 p-5 rounded-xl shadow flex">
                                <div className="w-1/2">
                                    <div className="text-container text-center">
                                        <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                                        <h1 className="text-sky-900 text-2xl">FitStudee</h1>
                                    </div>
                                    <div className="w-1/2 p-[20px] shadow base-background text-white rounded mx-auto text-center my-[20px]">
                                        <span className="text-2xl">&#128170;</span> Kalori Terbakar : <span className="text-lg font-bold">{burnedCalories}</span>/<span className="text-md">{calories}</span>
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex flex-wrap">
                                        {levelPack.excercises.map(function(excercise,i){
                                            return (
                                                <div key={excercise.name} className={"card group duration-700 m-[10px] p-[10px] bg-gray-900 hover:scale-110 duration-300 rounded-md align-center"} onClick={()=> {
                                                    let arr = [...excercises]
                                                    arr.push(excercise)
                                                    setExcercises(arr)
                                                    setBurnedCalories(parseInt(burnedCalories) + parseInt(excercise.burn))
                                                }}>
                                                    <div className="text-container text-sky-400 flex items-center">
                                                        <div className="title inline-block">{excercise.name}</div>
                                                    </div>
                                                </div>
                                            )	
                                        })}
                                    </div>
                                </div>
							</div>
						</div>
						<div className="container mx-auto my-[50px] flex flex-wrap">
                            <div className="w-1/2 mx-auto">
                                <div className="form bg-gray-100 p-5 rounded-xl shadow">
                                    <div className="flex flex-wrap">
                                        {excercises ? excercises.map((excercise, i) => {
                                            return (
                                                <div key={excercise._id} className={"card group duration-700"}>
                                                    <div className={`flex m-[10px] p-[10px] bg-gray-900 duration-300 rounded-md align-center flex-col hover:scale-110`}>
                                                        <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                                            <div className="title inline-block mr-3">{excercise.name}</div>
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
                                    </div>
                                    <button className={`block w-full m-[10px] p-[10px] hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto ${excercises.length == 0 ? 'bg-gray-500' : 'base-background'}`} onClick={() => {
                                        setTime(excercises.map((e)=>parseInt(e.duration)).reduce((a,b) => a + b))
                                        setStoredTime(time)
                                        setCurrentState((currentState+1) % 2)
                                    }} disabled={excercises.length <= 0 ? true : false}>Start</button>
                                </div>
                            </div>
                            <div className="w-2/5 mx-auto">
                                <div className="flex-col form bg-gray-100 p-5 rounded-xl shadow flex">
                                    {excerciseLogs ? excerciseLogs.map((excercise, i) => {
                                        return (
                                            <div key={excercise._id} className={"card  group hover:w-full duration-700"}>
                                                <div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
                                                    <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                                        <div className="title inline-block">{excercise.name}</div>
                                                        <div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white"
                                                            onClick={()=> {
                                                                deleteItem(excercise)
                                                            }}>X</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : ''}
                                </div>
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
					<div className={`bg-form ${excercises.length > 50 ? 'h-full' : 'h-screen'} base-background flex items-center flex-col`}>
						<div className="container mx-auto my-5">
							<div className="form mx-auto w-2/3 bg-gray-100 p-3 rounded-xl shadow flex">
                                <div className="w-1/2 p-5">
                                    <div className="text-container text-center mb-[50px]">
                                        <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                                        <h1 className="text-sky-900 text-2xl">FitStudee</h1>
                                    </div>
                                    <div className="w-[200px] h-[200px] p-[20px] base-background text-white rounded-full mx-auto text-center my-[20px] text-[64px] flex justify-center items-center border-8"><div>{time}</div></div>
                                    <button className={`mx-auto w-full m-[10px] p-[10px] hover:bg-gray-500 duration-300 rounded-md align-center text-white w-1/3 mx-auto ${excercises.size == 0 ? 'bg-gray-500' : 'base-background'} text-xl`} onClick={() => {
                                        if(time) 
                                            setTimerStatus(Number(!timerStatus))
                                        else
                                            setCurrentState((currentState+1) % 2)
                                        handleSubmit()
                                        localStorage.setItem("calories_burned", storedTime)
                                    }}>{time ? timerStatus ? 'Pause' : 'Play' : 'Finish'}</button>
                                </div>
								<div className="w-1/2 flex flex-wrap">
                                    {excercises ? excercises.map((excercise, i) => {
                                        return (
                                            <div key={excercise._id} className={"card group duration-700"}>
                                                <div className={`flex m-[10px] p-[10px] bg-gray-900 duration-300 rounded-md align-center flex-col hover:scale-110`}>
                                                    <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                                        <div className="title inline-block">{excercise.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) : ''}
                                </div>
							</div>
						</div>
					</div>
				</section>
			)
		}
	}

	return render()
}