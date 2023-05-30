// Importing helper modules
import { Auth } from "aws-amplify"
import { CurrentUserContext } from "App"
import { toast } from "react-toastify"
import { useContext, useState } from "react"

// Importing core components
import { NavLink, useNavigate } from "react-router-dom"
import { Spinner } from "react-activity"
import Button from "components/ui/Button"
import Fade from "react-reveal/Fade"
import TextInput from "components/modules/TextInput"

const Login = () => {
	// Navigation
	const navigate = useNavigate()

	// User Context
	const { setUser } = useContext(CurrentUserContext)

	// ntext

	// Form state
	const [username, setName] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		setLoading(true)
		try {
			const res = await Auth.signIn({ username: username, password: password })
			setUser(res)
			if (res.challengeName === "NEW_PASSWORD_REQUIRED")
				navigate("/auth/confirm-account")
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<Fade bottom>
			<div className="w-full">
				<h2 className={"text-3xl mb-4 text-gray-50 font-normal"}>Login</h2>
				<h3 className={"text-lg text-gray-100 font-normal"}>
					Sign into your account
				</h3>
				<p className={"max-w-lg text-sm mt-4 mb-8 text-gray-300 font-normal"}>
					Welcome back, we are happy to see you continue your journey, submit
					you account details and continue.
				</p>
				<div className="flex  flex-col gap-4">
					<TextInput
						label="Username"
						placeholder="Your username"
						value={username}
						type="text"
						disabled={loading}
						setValue={(val) => setName(val)}
					/>
					<TextInput
						label="Password"
						placeholder="Your password"
						value={password}
						type="password"
						disabled={loading}
						setValue={(val) => setPassword(val)}
					/>
					<Button
						title="Log In"
						fullWidth
						color={"primary"}
						clicked={submit}
						disabled={loading}
						icon={
							loading ? (
								<Spinner color="#727981" size={8} speed={1} animating={true} />
							) : null
						}
					/>
				</div>
				<div className="center-between">
					<NavLink to={"forgot-password"}>
						<h4
							className={"text-sm  text-center mt-4 text-gray-200 font-medium"}
						>
							Forgot your password?{" "}
							<span className={"text-primary cursor-pointer"}>Click Here</span>
						</h4>
					</NavLink>
					<NavLink to={"register"}>
						<h4
							className={"text-sm  text-center mt-4 text-gray-200 font-medium"}
						>
							Don't have an account?{" "}
							<span className={"text-blue-500 cursor-pointer"}>Register</span>
						</h4>
					</NavLink>
				</div>
			</div>
		</Fade>
	)
}

export default Login
