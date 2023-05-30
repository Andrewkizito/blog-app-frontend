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

const Register = () => {
	// Navigation
	const navigate = useNavigate()

	// User Context
	const { setUser } = useContext(CurrentUserContext)

	// Form state
	const [username, setName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		setLoading(true)
		try {
			const res = await Auth.signUp({
				username: username,
				password: password,
				attributes: {
					email: email,
				},
			})
			setUser(res)
			toast.info("Verification code sent to email")
			navigate("/auth/verify")
		} catch (error: any) {
			if (error.message.toLowerCase() === "user already exists") {
				Auth.resendSignUp(username)
					.then(() => {
						toast.info("Verification code sent to email")
						navigate("/auth/verify")
					})
					.catch((err) => toast.error(err.message))
			} else {
				toast.error(error.message)
			}
		}
		setLoading(false)
	}

	return (
		<Fade bottom>
			<div className="w-full">
				<h2 className={"text-3xl mb-4 text-gray-50 font-normal"}>Register</h2>
				<h3 className={"text-lg text-gray-100 font-normal"}>
					Create a new account
				</h3>
				<p className={"max-w-lg text-sm mt-4 mb-8 text-gray-300 font-normal"}>
					Register for an account today and get started editing, creating and
					deleting articles
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
						label="Email"
						placeholder="Your email"
						value={email}
						type="text"
						disabled={loading}
						setValue={(val) => setEmail(val)}
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
						title="Register"
						fullWidth
						color={"success"}
						clicked={submit}
						disabled={loading}
						icon={
							loading ? (
								<Spinner color="#727981" size={8} speed={1} animating={true} />
							) : null
						}
					/>
				</div>
				<NavLink to={"/auth"}>
					<h4 className={"text-sm  text-center mt-4 text-gray-200 font-medium"}>
						Already have an account?{" "}
						<span className={"text-primary cursor-pointer"}>Click Here</span>
					</h4>
				</NavLink>
			</div>
		</Fade>
	)
}

export default Register
