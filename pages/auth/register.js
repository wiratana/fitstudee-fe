export default function Register(){
	return (
		<section>
			<div className="bg-form h-screen bg-gray-800 flex items-center">
				<div className="container mx-auto">
					<div className="form mx-auto w-1/3 bg-gray-100 p-5 rounded-xl shadow">
						<div className="text-container text-center">
							<h1 className="text-sky-900">Register</h1>
						</div>
						<div className="input-container text-center mx-auto">
							<div className="input-group my-3">
								<label htmlFor="username" className="mr-2">username</label>
								<input id="username" type="text" name="username" className="bg-gray-200 rounded-md p-1"/>
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
								<a href="/app/initial-setup/form" className="bg-sky-500 rounded-md px-2 py-1 text-gray-100">Submit</a>
							</div>
							<div className="text-container">
								Already have account ? <a href="/auth/login" className="text-sky-900">Let's login</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}