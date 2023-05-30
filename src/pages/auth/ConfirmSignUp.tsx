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

const ConfirmSignUp = () => {
	// Page Context
	const navigate = useNavigate()

	// User Context
	const { setUser } = useContext(CurrentUserContext)

	// Form state
	const [username, setUsername] = useState<string>("")
	const [code, setCode] = useState<string>("")

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		setLoading(true)
		try {
			const res = await Auth.confirmSignUp(username, code)
			setUser(res)
			navigate("/auth/login")
			toast.success("Account verified successfully")
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<Fade bottom>
			<div className="w-full">
				<h2 className={"text-3xl font-semibold mb-4 text-gray-50"}>
					Confirm Account
				</h2>
				<p className={"max-w-lg text-sm mt-4 mb-8 text-gray-300 font-normal"}>
					Enter your verification code sent to your email inorder to confirm
					your account.
				</p>
				<div className="flex  flex-col gap-4">
					<TextInput
						label="Username"
						placeholder="Enter username"
						value={username}
						type="text"
						disabled={loading}
						setValue={(val) => setUsername(val)}
					/>
					<TextInput
						label="Verification Code"
						placeholder="Enter Code"
						value={code}
						type="text"
						disabled={loading}
						setValue={(val) => setCode(val)}
					/>
				</div>
				<div className="py-4"></div>
				<Button
					title="Comfirm Account"
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
				<NavLink to={"/auth/register"}>
					<h4 className={"text-sm text-center mt-4 text-gray-200 font-medium"}>
						Back to sign up?{" "}
						<span className={"text-primary cursor-pointer"}>Click Here</span>
					</h4>
				</NavLink>
			</div>
		</Fade>
	)
}

export default ConfirmSignUp
