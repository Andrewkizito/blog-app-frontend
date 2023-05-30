// Importing helper modules
import React, { useRef } from "react"
import { Storage } from "aws-amplify"
import { toast } from "react-toastify"
import { generateName, generateUrl } from "utils/modules"

interface ImageUploaderProps {
	label: string
	value: string
	loading: boolean
	setLoading: (value: boolean) => void
	setValue: (value: string) => void
	disabled?: boolean
	notBg?: boolean
	edit?:
		| false
		| {
				setOldValue: (value: string) => void
				oldValue: string
		  }
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
	const uploadEl = useRef<HTMLInputElement | null>(null)

	function uploadHandler(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files?.length) return
		props.setLoading(true)
		toast
			.promise(Storage.put(generateName(files[0].name), files[0]), {
				success: "File Uploaded Successfully",
				error: "Upload failed, try again",
				pending: "Uploading file, please wait",
			})
			.then((res) => {
				const key = `public/${res.key}`
				if (props.edit) {
					props.edit.setOldValue(props.value)
					props.setValue(key)
					return
				}
				props.setValue(key)
			})
			.finally(() => {
				e.target.value = ""
				props.setLoading(false)
			})
	}

	function removeFile() {
		props.setLoading(true)
		toast
			.promise(Storage.remove(props.value.replace("public/", "")), {
				success: "File remvoved Successfully",
				error: "Removal failed, try again",
				pending: "Removing file, please wait",
			})
			.then(() => {
				props.setValue(props.edit ? props.edit.oldValue : "")
				if (props.edit) props.edit.setOldValue("")
			})
			.finally(() => props.setLoading(false))
	}

	const actionHandler = () => {
		if (props.loading || props.disabled) return

		if (!props.value || (props.value && props.edit && !props.edit.oldValue)) {
			uploadEl.current?.click()
			return
		}

		removeFile()
	}

	return (
		<div className={`h-full flex flex-col`}>
			<label className={`text-sm text-gray-200 font-light`}>
				{props.label}
			</label>
			<input
				type="file"
				accept="image/*"
				className="hidden"
				onChange={uploadHandler.bind(this)}
				ref={(el) => (uploadEl.current = el)}
			/>
			<div
				className={`mt-4 border border-dashed w-full sm:flex-1 relative center duration-300 max-sm:h-44 ${
					!props.value && "bg-gray-50 bg-opacity-10"
				}`}
			>
				{props.value ? (
					<>
						<div
							className="absolute z-10 h-10 w-10 bg-white rounded-full right-2 top-2 cursor-pointer center group"
							onClick={actionHandler}
						>
							{props.edit && !props.edit.oldValue && (
								<span className="material-symbols-outlined duration-300 text-gray-900 group-hover:text-primary">
									upload
								</span>
							)}
							{(props.edit && props.edit.oldValue) ||
								(!props.edit && (
									<span className="material-symbols-outlined duration-300 text-gray-900 text-[22px] group-hover:text-red-500">
										delete_forever
									</span>
								))}
						</div>
						<img
							src={generateUrl(props.value)}
							alt=""
							className={`${
								props.notBg
									? " h-4/5 object-scale-down brightness-0 invert"
									: "object-cover"
							} object-center w-full h-full absolute`}
						/>
					</>
				) : (
					<div
						className=" rounded-full cursor-pointer center flex-col gap-2 group"
						onClick={actionHandler}
					>
						<span className="material-symbols-outlined text-white text-4xl">
							photo_camera
						</span>
						<p className="text-sm font-light text-white">
							Click to attach photo.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default ImageUploader
