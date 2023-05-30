// Importing helper modules
import { NavLink } from "react-router-dom"
import { useAuthenticator } from "@aws-amplify/ui-react"

// Importing core components
import Button from "./Button"
import Container from "./Container"

interface HeaderProps {
	title: string
}

const Header: React.FC<HeaderProps> = (props) => {
	const { authStatus } = useAuthenticator((context: any) => [
		context.authStatus,
	])

	return (
		<div className="h-16 w-full bg-gray-800 center">
			<Container>
				<div className="center-between">
					<h2 className="xl text-green-500">{props.title}</h2>
					<NavLink
						to={authStatus === "authenticated" ? "/create-blog" : "/auth"}
					>
						<Button color="success" title="Add New" />
					</NavLink>
				</div>
			</Container>
		</div>
	)
}

export default Header
