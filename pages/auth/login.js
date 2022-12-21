import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login(){
    const router = useRouter()
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
          name: event.target.name.value,
          password: event.target.password.value,
        }
        
        const JSONdata = JSON.stringify(data)
        let endpoint = 'http://localhost:5000/auth/login'
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        
        await fetch(endpoint, options)
        .then((res) => res.json())
        .then(async (data) => {
            localStorage.setItem("user_id", data.userId)
            localStorage.setItem("access-token", data.accessToken)
            localStorage.setItem("refresh-token", data.refreshToken)
        })
        
        endpoint = `http://localhost:5000/users/detail/${localStorage.getItem("user_id")}`
        options = {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
        
        await fetch(endpoint, options)
        .then((res) => res.json())
        .then(async (data) => {
            localStorage.setItem("user", data)
            console.log("babi satu ini")
            if(!data.detail.initialization_status)
                router.push('/app/initial-setup/form')
            router.push('/app')
        })
    }
    
    return (
        <section>
            <div className="bg-form h-screen bg-gray-800 flex items-center">
                <div className="container mx-auto">
                    <div className="form mx-auto w-1/3 bg-gray-100 p-5 rounded-xl shadow">
                        <div className="text-container text-center">
                            <h1 className="text-sky-900">Login</h1>
                        </div>
                        <form onSubmit={handleSubmit}>  
                            <div className="input-container text-center mx-auto">
                                <div className="input-group my-3">
                                    <label htmlFor="name" className="mr-2">username</label>
                                    <input id="name" type="text" name="name" className="bg-gray-200 rounded-md p-1"/>
                                </div>
                                <div className="input-group my-3">
                                    <label htmlFor="password" className="mr-2">password</label>
                                    <input id="password" type="text" name="password" className="bg-gray-200 rounded-md p-1"/>
                                </div>
                                <div className="input-group my-3">
                                    <button type="submit" className="bg-sky-500 rounded-md px-2 py-1 text-gray-100">Submit</button>
                                </div>
                                <div className="text-container">
                                    Don&apos;t have account ? <Link href="/auth/register" className="text-sky-900">Let&apos;s register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
