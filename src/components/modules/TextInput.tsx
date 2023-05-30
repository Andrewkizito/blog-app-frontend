// Importing helper modules
import { ReactElement } from "react"

interface Props {
	label: string
	value: string
	maxLength?: number
	setValue: (val: string) => void
	placeholder?: string
	disabled?: boolean
	icon?: ReactElement | null
	type?: "text" | "email" | "password" | "number" | "textarea"
}

const TextInput: React.FC<Props> = (props) => {
	return (
		<div>
			<label className={`text-sm mb-5 text-gray-200 font-light`}>
				{props.label}
			</label>
			<div
				className={`border-[1.5px] border-gray-400 flex mt-4 rounded-sm ${
					props.disabled ? `bg-gray-600 bg-opacity-20` : "bg-inherit"
				}`}
			>
				{props.type === "textarea" ? (
					<textarea
						name=""
						id=""
						rows={10}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							props.setValue(e.target.value)
						}
						className={` w-full py-3 px-4  focus:outline-none text-sm bg-inherit text-gray-200 resize-none`}
						disabled={props.disabled}
						placeholder={props.placeholder}
						value={props.value}
						maxLength={props.maxLength}
					></textarea>
				) : (
					<input
						type={props.type ? props.type : "text"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							props.setValue(e.target.value)
						}
						className={`w-full py-3 px-4  focus:outline-none text-sm bg-inherit text-gray-200`}
						disabled={props.disabled}
						placeholder={props.placeholder}
						value={props.value}
						maxLength={props.maxLength}
						max={props.maxLength}
					/>
				)}
				{props.icon && (
					<div className={"center px-3"}>
						<div className="relative center cursor-pointer">{props.icon}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default TextInput
