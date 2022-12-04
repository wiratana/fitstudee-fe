import React, {useState} from 'react'
import Image from 'next/image'

const nutritionNeeds = [
	{
		id:0,
		name:"carbohydrate",
		amount:500,
		unit:"grams",
		foods: [
			{	
				id:0,
				name:"potatoes",
				image: "https://via.placeholder.com/50",
				cal:240
			},
			{	
				id:1,
				name:"oats",
				image: "https://via.placeholder.com/50",
				cal:340
			},
			{	
				id:2,
				name:"rices",
				image: "https://via.placeholder.com/50",
				cal:210
			},
			{	
				id:3,
				name:"noodles",
				image: "https://via.placeholder.com/50",
				cal:140
			},
			{	
				id:4,
				name:"corn",
				image: "https://via.placeholder.com/50",
				cal:40
			}
		]
	},
	{
		id:1,
		name:"proteins",
		amount:500,
		unit:"grams",
		foods: [
			{	
				id:0,
				name:"Chicken Breast",
				image: "https://via.placeholder.com/50",
				cal:100
			},
			{	
				id:1,
				name:"Fish",
				image: "https://via.placeholder.com/50",
				cal:70
			},
			{	
				id:2,
				name:"Red meat",
				image: "https://via.placeholder.com/50",
				cal:120
			},
			{	
				id:3,
				name:"nuts",
				image: "https://via.placeholder.com/50",
				cal:300
			},
			{	
				id:4,
				name:"egg",
				image: "https://via.placeholder.com/50",
				cal:200
			}
		]
	}
];

export default function Food(){
	const [nutritions, setNutritions] = useState(new Map())
	const [limit, setLimit]           = useState(0)
	const [calories, setCalories]     = useState(0)

	return (
		<section>
			<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto mt-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${calories}/${limit}`}</div>
					</div>
				</div>
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						{nutritionNeeds.map(function(nutrition,i){
							return (
								<div key={nutrition.name} className={"card  group hover:w-full duration-700"}>
									<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center`}>
										<div className="img-container w-fit">
											<Image src="{nutrition.image}" alt=""/>
										</div>
										<div className="text-container text-sky-400 flex items-center">
											<div className="title inline-block">{nutrition.name}</div>
										</div>
										<div className="flex space-between mx-auto">
											{nutrition.foods.map(function(food,j){
												return (
													<div key={food.name}>
														<div
														className={`hidden m-[15px] ${nutrition[i] == food.id ? 'bg-sky-300' : 'bg-sky-900'} p-[10px] hover:m-[0px] hover:p-[20px] hover:rounded-3xl duration-300 rounded-md group-hover:block`}
														onClick={()=> {												
															setNutritions(new Map(nutritions.set(i, {id:food.id, cal:food.cal})))
															setCalories([...nutritions.values()].reduce((a,b) => a + b.cal, 0))
														}}>
															<div className="img-container w-fit">
																<Image src="{food.image}" alt=""/>
															</div>
															<div className="text-container text-sky-400">
																<div className="title">{food.name}</div>
															</div>
														</div>
													</div>  
												)
											})}
										</div>
									</div>
								</div>
							)	
						})}
					</div>
				</div>
				<div className="container mx-auto mb-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						{[...nutritions.keys()].map(function(index){
							return (
								<div key={"item-"+index} className={"card  group hover:w-full duration-700"}>
									<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
										<div className="img-container w-fit">
											<Image src="" alt=""/>
										</div>
										<div className="text-container text-sky-400 flex items-center w-full justify-between">
											<div className="title inline-block">{nutritionNeeds[index].foods[nutritions.get(index).id].name}</div>
											<div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white"
												onClick={()=> {
													setNutritions(() => {
														nutritions.delete(index)
														return new Map(nutritions)
													})
													setCalories([...nutritions.values()].reduce((a,b) => a + b.cal, 0))
												}}>X</button></div>
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