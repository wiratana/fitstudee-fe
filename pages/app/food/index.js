import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Food(){
    const router = useRouter()
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
            <button className={`w-[50px] h-[50px] base-background absolute left-[5px] top-[5px] rounded-full text-slate-50 shadow text-lg`} onClick={()=>router.back()}>Back</button>
			<div className={`bg-form ${nutritionLogs > 0 ? 'h-full' : 'h-screen'} base-background flex items-center flex-col py-5`}>
				<div className="container mx-auto flex">
                    <div className="mx-auto w-2/5">
                        <div className="flex-col form bg-gray-100 p-5 rounded-xl shadow flex">
                            <div className="text-container text-center">
                                <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                                <h1 className="text-sky-900 text-2xl">Personal Food Tracker</h1>
                            </div>
                            <div className="w-1/2 p-[20px] base-background text-white rounded mx-auto text-center my-[20px]"><span className="text-2xl">&#127838;</span> Konsumsi Kalori : <span className="text-lg font-bold">{calories}</span>/<span className="text-md">{limit}</span></div>
                        </div>
                    </div>
                    <div className="w-2/5 mx-auto">
                        <div className="flex-col form bg-gray-100 p-5 rounded-xl shadow flex">
                            <div className="flex-col">
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
                    </div>
                </div>
                <div className="container mx-auto mt-[100px] flex">
                    <div className="mx-auto w-2/5">
                        <div className="flex-col form bg-gray-100 p-5 rounded-xl shadow flex">
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
                    <div className="mx-auto w-2/5">
                        <div className="flex-col form bg-gray-100 p-5 rounded-xl shadow flex">
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
                            <button className="base-background text-slate-50 mx-auto w-1/2 my-[10px] py-[5px] hover:rounded-3xl duration-300 rounded-md hover:bg-red-500 hover:text-white" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
			</div>
		</section>
	) : (<div>Hallo</div>)
}