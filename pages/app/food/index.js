import React, {useState, useEffect} from 'react'
import Image from 'next/image'

export default function Food(){
	const [nutritions, setNutritions] = useState([])
    const [nutritionLogs, setNutritionLogs] = useState([])
	const [limit, setLimit]           = useState(0)
	const [calories, setCalories]     = useState(0)
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
                setLimit(data.detail.calories_need)
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
        const data = nutritions.map(e => {
                e._userId = localStorage.getItem("user_id")
                delete e._id
                return e
        })
        const JSONdata = JSON.stringify(data)
        await fetch('http://localhost:5000/food-log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSONdata
        }).then((res)=>{
            loadNutritions()
            setNutritions([])
        })
    }
    
    const deleteItem = async (nutrition) => {
        await fetch(`http://localhost:5000/food-log/${nutrition._id}`, {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          }
        }).then(()=>loadNutritions())
    }
    
    const loadNutritions = async () => {
        await fetch('http://localhost:5000/food-log', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then(async (res)=>{
            await res.json().then(async (data)=>{
                if (data.length > 0) {
                    setNutritionLogs(data)
                    setCalories(data.map((e) => e.cal).reduce((a,b) => a+b))
                }
            })
        })
    }
    
    useEffect(()=>{
        getBodyPreference()
        loadNutritions()
    },[])
    
	return levelPack.food_categories ? (
		<section>
			<div className="bg-form h-full bg-gray-800 flex items-center flex-col">
				<div className="container mx-auto mt-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
						<div className="w-1/2 p-[20px] bg-sky-500 text-white rounded mx-auto text-center my-[20px]">{`${calories}/${limit}`}</div>
					</div>
				</div>
				<div className="container mx-auto my-[100px]">
					<div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
                        {levelPack.food_categories.map(function(nutrition,i){
							return (
								<div key={nutrition.name} className={"card  group hover:w-full duration-700"}>
									<div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center`}>
										<div className="img-container w-fit">
										</div>
										<div className="text-container text-sky-400 flex items-center">
											<div className="title inline-block">{nutrition.name}</div>
										</div>
										<div className="flex space-between mx-auto">
											{nutrition.foods.map(function(food,j){
												return (
													<div key={food.name}>
														<div
														className={`hidden m-[15px] bg-sky-900 p-[10px] hover:m-[0px] hover:p-[20px] hover:rounded-3xl duration-300 rounded-md group-hover:block`}
														onClick={()=> {
                                                            let arr = [...nutritions]
                                                            arr.push(food)
															setNutritions(arr)
                                                            setCalories(arr.map((e)=>parseInt(e.cal)).reduce((a,b)=>a+b))
														}}>
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
                    {console.log(nutritions)}
                        {nutritions.map((nutrition, i) => {
                            return (
                                <div key={`${i}-{nutrition._id}`} className={"card  group hover:w-full duration-700"}>
                                    <div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
                                        <div className="img-container w-fit">
                                        </div>
                                        <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                            <div className="title inline-block">{nutrition.name}</div>
                                            <div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={function(){
                                                let arr = [...nutritions]
                                                arr.splice(i, 1)
                                                setNutritions(arr)
                                                setCalories(calories-parseInt(nutrition.cal))
                                            }}>X</button></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
                <div className="container mx-auto mb-[100px]">
                    <div className="flex-col form mx-auto w-2/3 bg-gray-100 p-5 rounded-xl shadow flex">
                        {nutritionLogs.map((nutrition, i) => {
                            return (
                                <div key={`${i}-{nutrition._id}`} className={"card  group hover:w-full duration-700"}>
                                    <div className={`flex m-[10px] p-[10px] hover:m-[0px] bg-gray-900 hover:p-[20px] hover:rounded-3xl duration-300 rounded-md align-center flex-col`}>
                                        <div className="img-container w-fit">
                                        </div>
                                        <div className="text-container text-sky-400 flex items-center w-full justify-between">
                                            <div className="title inline-block">{nutrition.name}</div>
                                            <div className="delete-button"><button className="bg-sky-900 px-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={()=>deleteItem(nutrition)}>X</button></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
			</div>
		</section>
	) : (<div>Hallo</div>)
}