// Importing helper modules
import { Auth } from 'aws-amplify'
import { CurrentUserContext } from 'App'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'

// Importing core components
import { NavLink } from 'react-router-dom'
import { Spinner } from 'react-activity'
import Button from 'components/ui/Button'
import Fade from 'react-reveal/Fade'
import TextInput from 'components/modules/TextInput'

const ConfirmAccount = () => {
	// User Context
	const { user, setUser } = useContext(CurrentUserContext)

	// DarkMode Context

	// Form state
	const [password, setPassword] = useState<string>('')

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		setLoading(true)
		try {
			const res = await Auth.completeNewPassword(user, password)
			setUser(res)
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<Fade bottom>
			<div className="w-full">
				<h2 className={'text-3xl font-semibold mb-4 text-gray-50'}>
					Confirm Account
				</h2>
				<h3 className={'text-lg text-gray-100 font-normal'}>
					Account confirmation needed
				</h3>
				<p className={'max-w-lg text-sm mt-4 mb-8 text-gray-300 font-normal'}>
					Create new password inorder to confirm your account.
				</p>
				<div className="flex  flex-col gap-4">
					<TextInput
						label="New Password"
						placeholder="Your password"
						value={password}
						type="password"
						disabled={loading}
						setValue={(val) => setPassword(val)}
					/>
				</div>
				<div className="py-4"></div>
				<Button
					title="Comfirm Account"
					fullWidth
					color={'success'}
					clicked={submit}
					disabled={loading}
					icon={
						loading ? (
							<Spinner color="#727981" size={8} speed={1} animating={true} />
						) : null
					}
				/>
				<NavLink to={'/'}>
					<h4 className={'text-sm  text-center mt-4 text-gray-200 font-medium'}>
						Back to login?{' '}
						<span className={'text-primary cursor-pointer'}>Click Here</span>
					</h4>
				</NavLink>
			</div>
		</Fade>
	)
}

export default ConfirmAccount
