// Importing core components
import { NavLink } from "react-router-dom"

interface BackButtonProps {
	to: string
	title: string
}

const BackButton: React.FC<BackButtonProps> = (props) => {
	return (
		<div className="flex items-center gap-3">
			<NavLink to={props.to}>
				<div className="w-10 h-10 max-md:w-7 max-md:h-7 bg-gray-800 rounded-full center text-gray-200 duration-300 cursor-pointer hover:bg-gray-700">
					<span className="material-symbols-outlined max-md:text-base">
						arrow_back
					</span>
				</div>
			</NavLink>
			<h4 className="text-xl text-gray-300 max-md:text-lg">{props.title}</h4>
		</div>
	)
}

export default BackButton
