import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

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
			<div className="bg-form h-screen base-background flex items-center">
                <div className="w-full">
                    <div className="bg-slate-50 w-1/2 h-screen flex items-center shadow">
                        <div className="form mx-auto p-2">
                            <div className="text-container text-center">
                                <Image src="/assets/img/Logo.png" width={75} height={75} className="mx-auto"/>
                                <h1 className="text-sky-900 text-2xl">Welcome To FitStudee</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="input-container mx-auto">
                                    <div className="input-group my-3">
                                        <label htmlFor="name" className="block">username</label>
                                        <input id="name" type="text" name="name" className="border-2 border-indigo-500 rounded-md p-1 w-full"/>
                                    </div>							
                                    <div className="input-group my-3">
                                        <label htmlFor="email" className="block">email</label>
                                        <input id="email" type="text" name="email" className="border-2 border-indigo-500 rounded-md p-1 w-full"/>
                                    </div>
                                    <div className="input-group my-3">
                                        <label htmlFor="password" className="block">password</label>
                                        <input id="password" type="text" name="password" className="border-2 border-indigo-500 rounded-md p-1 w-full"/>
                                    </div>
                                    <div className="input-group my-3">
                                        <button type="submit" className="base-background rounded-md px-2 py-1 text-slate-50 w-full">Submit</button>
                                    </div>
                                    <div className="text-container">
                                        Sudah Punya Akun ? <Link href="/auth/login" className="text-sky-900">Ayo Masuk</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
					</div>
				</div>
			</div>
		</section>
	);
}