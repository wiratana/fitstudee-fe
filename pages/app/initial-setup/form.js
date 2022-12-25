import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const levels = [
	{
		id:"0",
		image:"https://via.placeholder.com/150",
		title:"easy",
		description:"easy level for beginer"
	},
	{
		id:"1",
		image:"https://via.placeholder.com/150",
		title:"medium",
		description:"medium level for intermediete"
	},
	{
		id:"2",
		image:"https://via.placeholder.com/150",
		title:"hard",
		description:"Hard level for monster"
	}
]


export default function Form(){
    const router = useRouter()
	const [step, setStep] 			  = useState(0)
	const [height, setHeight]		  = useState(0)
	const [weight, setWeight]		  = useState(0)
    const [age, setAge]               = useState(0)
    const [sex, setSex]               = useState("")
	const [preference, setPreference] = useState("")
	const [level, setLevel] 		  = useState(-1)
    const [bmi, setBMI]               = useState(0)
    const [calNeed, setCalNeed]       = useState(0)
    const [status, setStatus]         = useState("")
    const [bodyPreferences, setBodyPreferences] = useState([])

	const next = () => setStep(Math.min((step+1), 2))

	const prev = () => setStep(Math.max((step-1), 0))
    
    const calculateBMI = () => {
        setBMI((height & weight) ? (weight/Math.pow(height/10, 2))*100 : 0)
        setStatus(bmi < 18.5 ? "underweight" : bmi > 25 ? "overweight" : "normal")
        setCalNeed(bmi < 18.5 ? 3500 : bmi > 25 ? 2500 : 3000)
    }
    
    useEffect(() => {
        async function fetchBodyPref(){
            await fetch("http://localhost:5000/body-pref")
            .then((res) => res.json())
            .then(async (data) => {
                setBodyPreferences(data)
            })
        }
        
        fetchBodyPref()
    }, [])
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            initialization_status:true,
            height: parseInt(height),
            weight: parseInt(weight),
            age: parseInt(age),
            body_preference: preference,
            level: parseInt(level),
            sex: sex,
            bmi: parseInt(bmi),
            status: status,
            calories_need: parseInt(calNeed)
        }
        
        const JSONdata = JSON.stringify(data)
        let endpoint = `http://localhost:5000/users/initial-setup/${localStorage.getItem('user_id')}`
        let options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('access-token')}`
          },
          body: JSONdata,
        }
        
        await fetch(endpoint, options)
        .then((res) => {
            if(res.status == 403) router.push('/auth/login')
            if(res.status == 200) router.push('/app')
        })
    }

	const form = () => {
		if(step == 0){
			return (
				<div className="bmi-data">
					<div className="input-container mx-auto">
						<div className="input-group my-3">
							<label htmlFor="height" className="block">height</label>
							<input id="height" type="number" name="height" className="border-2 border-indigo-500 rounded-md p-1 w-full" onChange={event => {setHeight(event.target.value);calculateBMI()}} value={height || ""}/>
						</div>							
						<div className="input-group my-3">
							<label htmlFor="weight" className="block">weight</label>
							<input id="weight" type="number" name="weight" className="border-2 border-indigo-500 rounded-md p-1 w-full" onChange={event => {setWeight(event.target.value);calculateBMI()}} value={weight || ""}/>
						</div>
                        <div className="input-group my-3">
							<label htmlFor="age" className="block">Age</label>
							<input id="age" type="number" name="age" className="border-2 border-indigo-500 rounded-md p-1 w-full" onChange={event => setAge(event.target.value)} value={age || ""}/>
						</div>
                        <div className="input-group my-3">
							<label htmlFor="age" className="block">Sex</label>
                            <input type="radio" name="gender" value="male" onClick={event => setSex(event.target.value)}/> Male
                            <input type="radio" name="gender" value="female" onClick={event => setSex(event.target.value)}/> Female
                        </div>
					</div>
				</div>
			)
		}
		if(step == 1){
			return (
				<div className="body-preference">
					<div className="card-container flex justify-center">
						{bodyPreferences.map(function(element,i){
							return (
								<div key={`${i}-${element.name}`} className={`shadow rounded-md overflow-hidden m-[10px] ${preference == element._id ? 'bg-slate-500' : 'bg-slate-900'} card w-1/${bodyPreferences.length} pb-[10px] hover:drop-shadow-2xl duration-300`} onClick={() => setPreference(element._id)}>
                                    <Image src="/assets/img/example.jpeg" width={200} height={200} className="object-fill"/>
									<div className="text-container p-[5px_10px]">
                                        <div className="title text-xl text-sky-500 font-semibold mb-[10px]">{element.name}</div>
                                        <div className="description text-sky-300 font-light">
                                            {element.description}
                                        </div>
									</div>
								</div>
							)	
						})}
					</div>
				</div>
			)
		}
		if(step == 2){
			return(
				<div className="level">
					<div className="card-container flex">
						{levels.map(function(element,i){
							return (
								<div key={element.title} className={`shadow rounded-md overflow-hidden m-[10px] ${level == element.id ? 'bg-slate-500' : 'bg-slate-900'} card w-1/${levels.length} pb-[10px] hover:drop-shadow-2xl duration-300`} onClick={() => setLevel(element.id)}>
                                    <Image src="/assets/img/example.jpeg" width={200} height={200} className="object-fill"/>
                                    <div className="text-container p-[5px_10px]">
                                        <div className="title text-xl text-sky-500 font-semibold mb-[10px]">{element.title}</div>
                                        <div className="description text-sky-300 font-light">
                                            {element.description}
                                        </div>
									</div>
								</div>
							)	
						})}
					</div>
				</div>
			)
		}
		if(step == 3){
			return(
				<div>
					<div className="m-[5px]">Age : {age | ""}</div>
            		<div className="m-[5px]">Sex : {sex}</div>
					<div className="m-[5px]">Height : {height | ""}</div>
					<div className="m-[5px]">Weight : {weight | ""}</div>
					<div className="m-[5px]">Body Preference : {preference}</div>	
                    <div className="m-[5px]">BMI : {bmi}</div>
                    <div className="m-[5px]">Status : {status}</div>
                    <div className="m-[5px]">Calories Need : {calNeed}</div>	
					<div className="m-[5px]">Level : {(level >= 0) ? levels[level].title : ""}</div>	
				</div>
			)
		}
	}

	const nextButton = () => {
		return (step == 2) 
			? <button className="base-background rounded-md px-2 py-1 text-slate-50 w-2/5" onClick={handleSubmit}>Save</button>
			: <button className="base-background rounded-md px-2 py-1 text-slate-50 w-2/5" onClick={next}>Next</button>
	}

	return (
		<section>
            <div className="bg-form h-screen base-background flex items-center">
                <div className="w-full flex justify-end">
                    <div className="w-1/2 p-5 h-screen relative">
                        <div className="form mx-auto p-[50px] h-full bg-slate-50 w-full rounded-lg shadow flex items-center justify-center flex-row">
                            <div className="absolute left-10 translate-x-[-100%]">
                                <div className="flex items-center">
                                    <span className={`mr-[25px] text-slate-50 ${step == 0 ? 'font-semibold' :'font-light' }`}>Data dasar milik pengguna yang akan digunakan sebagai variabel dalam menghitung formula bmi</span>
                                    <div className={`my-[50px] ${step == 0 ? 'bg-indigo-500' : 'bg-slate-50'} border-4 border-indigo-500 w-[50px] h-[50px] rounded-full flex justify-center items-center`}>
                                        <span className={`text-lg font-bold ${step == 0 ? 'text-slate-50' :'text-indigo-500' }`}>1</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`mr-[25px] text-slate-50 ${step == 1 ? 'font-semibold' :'font-light' }`}>Body preference yang dinginkan oleh pengguna sebagai parameter pencapaian bentuk tubuh impian</span>
                                    <div className={`my-[50px] ${step == 1 ? 'bg-indigo-500' : 'bg-slate-50'} border-4 border-indigo-500 w-[50px] h-[50px] rounded-full flex justify-center items-center`}>
                                        <span className={`text-lg font-bold ${step == 1 ? 'text-slate-50' :'text-indigo-500' }`}>2</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`mr-[25px] text-slate-50 ${step == 2 ? 'font-semibold' :'font-light' }`}>Level kesulitan yang disesuaikan dengan kemampuan yang dimiliki oleh pengguna</span>
                                    <div className={`my-[50px] ${step == 2 ? 'bg-indigo-500' : 'bg-slate-50'} border-4 border-indigo-500 w-[50px] h-[50px] rounded-full flex justify-center items-center`}>
                                        <span className={`text-lg font-bold ${step == 2 ? 'text-slate-50' :'text-indigo-500' }`}>3</span>
                                    </div>
                                </div>
                            </div>
                            <div>                            
                                <div className="text-container text-center">
                                    <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                                    <h1 className="text-sky-900 text-2xl">Personal Data Collection Stage</h1>
                                </div>
                                {form()}
                                <div className="flex justify-between my-[10px]">
                                    <button className="rounded-md px-2 py-1 text-indigo-500 border-2 border-indigo-500 w-2/5" onClick={prev}>Back</button>
                                    {nextButton()}
                                </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
		</section>
	)
}