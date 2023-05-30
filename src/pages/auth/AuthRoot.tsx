// Importing helper modules
import { Outlet } from 'react-router-dom'

// Importing core components
import banner from 'assets/images/banner.jpg'

const AuthRoot = () => {
	return (
		<div className={`h-screen w-screen overflow-hidden bg-gray-800`}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
				<div className="p-10 max-md:p-5 h-full center">
					<Outlet />
				</div>
				<div
					className="h-full bg-cover bg-center max-md:hidden"
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('${banner}')`,
					}}
				/>
			</div>
		</div>
	)
}

export default AuthRoot
