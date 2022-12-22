import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register(){
    const router = useRouter()
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
          detail:{initialization_status:false}
        }
        
        const JSONdata = JSON.stringify(data)
        let endpoint = 'http://localhost:5000/users/register'
        let options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        
        await fetch(endpoint, options)
        .then((res) => {
            if(res.status == 200) router.push('/auth/login')
        })
    }
    
	return (
		<section>
			<div className="bg-form h-screen bg-gray-800 flex items-center">
				<div className="container mx-auto">
					<div className="form mx-auto w-1/3 bg-gray-100 p-5 rounded-xl shadow">
						<div className="text-container text-center">
							<h1 className="text-sky-900">Register</h1>
						</div>
                        <form onSubmit={handleSubmit}>
                            <div className="input-container text-center mx-auto">
                                <div className="input-group my-3">
                                    <label htmlFor="name" className="mr-2">username</label>
                                    <input id="name" type="text" name="name" className="bg-gray-200 rounded-md p-1"/>
                                </div>							
                                <div className="input-group my-3">
                                    <label htmlFor="email" className="mr-2">email</label>
                                    <input id="email" type="text" name="email" className="bg-gray-200 rounded-md p-1"/>
                                </div>
                                <div className="input-group my-3">
                                    <label htmlFor="password" className="mr-2">password</label>
                                    <input id="password" type="text" name="password" className="bg-gray-200 rounded-md p-1"/>
                                </div>
                                <div className="input-group my-3">
                                    <button type="submit" className="bg-sky-500 rounded-md px-2 py-1 text-gray-100">Submit</button>
                                </div>
                                <div className="text-container">
                                    Already have account ? <Link href="/auth/login" className="text-sky-900">Let's login</Link>
                                </div>
                            </div>
                        </form>
					</div>
				</div>
			</div>
		</section>
	);
}