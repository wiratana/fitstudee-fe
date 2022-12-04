import React, {useState} from 'react'

const bodyPreferences = [
		{
			id:"0",
			image:"https://via.placeholder.com/150",
			title:"Legs Focus",
			description:"make your leg bigger like BAKI"
		},
		{
			id:"1",
			image:"https://via.placeholder.com/150",
			title:"Basic Body",
			description:"create basic body but aesthetic like EREN"
		},
		{
			id:"2",
			image:"https://via.placeholder.com/150",
			title:"Back Focus",
			description:"Make your back wider and stronger like Garou"
		},
		{
			id:"3",
			image:"https://via.placeholder.com/150",
			title:"Chest Focus",
			description:"Bigger chest, bigger power"
		}
	]

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
	const [step, setStep] 			  = useState(0)
	const [height, setHeight]		  = useState(0)
	const [weight, setWeight]		  = useState(0)
	const [preference, setPreference] = useState(-1)
	const [level, setLevel] 		  = useState(-1)

	const next = () => setStep(Math.min((step+1), 3))

	const prev = () => setStep(Math.max((step-1), 0))

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
							<input id="height" type="number" name="height" className="bg-gray-200 rounded-md p-1" onChange={event => setHeight(event.target.value)} value={height || ""}/>
						</div>							
						<div className="input-group my-3">
							<label htmlFor="weight" className="mr-2">weight</label>
							<input id="weight" type="number" name="weight" className="bg-gray-200 rounded-md p-1" onChange={event => setWeight(event.target.value)} value={weight || ""}/>
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
								<div key={element.title} className="card w-1/4" onClick={() => setPreference(element.id)}>
									<div className={`m-[10px] ${preference == element.id ? 'bg-gray-500' : 'bg-gray-900'} p-[10px] hover:m-[0px] hover:p-[20px] hover:rounded-3xl duration-300 rounded-md`}>
										<div className="img-container w-fit">
											<img src="{element.image}" alt=""/>
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
											<img src="{element.image}" alt=""/>
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
					<div className="m-[5px]">Height : {height | ""}</div>
					<div className="m-[5px]">Weight : {weight | ""}</div>
					<div className="m-[5px]">Body Preference : {(preference >= 0) ? bodyPreferences[preference].title : ""}</div>	
					<div className="m-[5px]">Level : {(level >= 0) ? levels[level].title : ""}</div>	
				</div>
			)
		}
	}

	const nextButton = () => {
		return (step == 3) 
			? <a href="/app/food" className="block bg-sky-500 rounded-md px-2 py-1 text-gray-100">Save</a>
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