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
					<div className="text-container text-center">
						<h1 className="text-sky-900">BMI</h1>
					</div>
					<div className="input-container text-center mx-auto">
						<div className="input-group my-3">
							<label htmlFor="height" className="mr-2">height</label>
							<input id="height" type="number" name="height" className="bg-gray-200 rounded-md p-1" onChange={event => {setHeight(event.target.value);calculateBMI()}} value={height || ""}/>
						</div>							
						<div className="input-group my-3">
							<label htmlFor="weight" className="mr-2">weight</label>
							<input id="weight" type="number" name="weight" className="bg-gray-200 rounded-md p-1" onChange={event => {setWeight(event.target.value);calculateBMI()}} value={weight || ""}/>
						</div>
                        <div className="input-group my-3">
							<label htmlFor="age" className="mr-2">Age</label>
							<input id="age" type="number" name="age" className="bg-gray-200 rounded-md p-1" onChange={event => setAge(event.target.value)} value={age || ""}/>
						</div>
                        <div className="input-group my-3">
							<label htmlFor="age" className="mr-2">Age</label>
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
					<div className="text-container text-center">
						<h1 className="text-sky-900">Body Preference</h1>
					</div>
					<div className="card-container flex">
						{bodyPreferences.map(function(element,i){
							return (
								<div key={`${i}-${element.name}`} className="card w-1/4" onClick={() => setPreference(element._id)}>
									<div className={`m-[10px] ${preference == element._id ? 'bg-gray-500' : 'bg-gray-900'} p-[10px] hover:m-[0px] hover:p-[20px] hover:rounded-3xl duration-300 rounded-md`}>
										<div className="img-container w-fit">
										</div>
										<div className="text-container text-sky-400">
											<div className="title">{element.name}</div>
											<div className="description">
												{element.description}
											</div>
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
					<div className="text-container text-center">
						<h1 className="text-sky-900">Level</h1>
					</div>
					<div className="card-container flex">
						{levels.map(function(element,i){
							return (
								<div key={element.title} className="card w-1/3" onClick={() => setLevel(element.id)}>
									<div className={`m-[10px] ${level == element.id ? 'bg-gray-500' : 'bg-gray-900'} p-[10px] hover:m-[0px] hover:p-[20px] hover:rounded-3xl duration-300 rounded-md`}>
										<div className="img-container w-fit">
										</div>
										<div className="text-container text-sky-400">
											<div className="title">{element.title}</div>
											<div className="description">
												{element.description}
											</div>
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
			? <button className="block bg-sky-500 rounded-md px-2 py-1 text-gray-100" onClick={handleSubmit}>Save</button>
			: <button className="block bg-sky-500 rounded-md px-2 py-1 text-gray-100" onClick={next}>Next</button>
	}

	return (
		<section>
			<div className="bg-form h-screen bg-gray-800 flex items-center">
				<div className="container mx-auto">
					<div className="form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow">
						{form()}
						<div className="w-1/3 mx-auto flex justify-between my-[10px]">
							<button className="block bg-gray-100 rounded-md px-2 py-1 text-sky-500 border-solid border-2 border-sky-500" onClick={prev}>Back</button>
							{nextButton()}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}