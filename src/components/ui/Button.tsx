// Importing helper modules
import React, { ReactElement } from "react"
import { Spinner } from "react-activity"

type colors = "primary" | "success" | "danger" | "cancel"

interface Props {
	title: string
	color: colors
	icon?: ReactElement | null
	disabled?: boolean
	clicked?: () => void
	fullWidth?: boolean
	loading?: boolean
}

const Button: React.FC<Props> = (props) => {
	const bgColors = {
		primary: "bg-blue-800 text-white",
		success: "bg-green-700 text-white",
		danger: "bg-red-600 text-white",
		cancel: "bg-gray-500 text-gray-100 bg-opacity-90",
	}

	return (
		<button
			onClick={props.clicked}
			disabled={props.disabled}
			className={`duration-300 min-w-[100px] text-sm ${
				props.fullWidth && "w-full"
			} px-4 py-2 flex items-center justify-center gap-1 rounded-sm hover:bg-opacity-80 ${
				props.disabled
					? `hover:bg-opacity-100 cursor-not-allowed  bg-gray-800 text-gray-500`
					: `${bgColors[props.color]} cursor-pointer`
			}`}
		>
			{props.loading ? (
				<Spinner color="#727981" size={8} speed={1} animating={true} />
			) : (
				props.icon
			)}
			{props.title}
		</button>
	)
}

export default Button
