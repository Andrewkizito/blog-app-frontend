// Importing helper modules
import { Storage } from "aws-amplify"
import { generateUrl } from "utils/modules"
import { toast } from "react-toastify"
import { useCallback, useMemo, useRef, useState } from "react"

// Importing core components
import ReactQuill from "react-quill"

// Importing styles
import "react-quill/dist/quill.snow.css"

interface RichTextEditorProps {
	label: string
	value: string
	readOnly: boolean
	minimal?: boolean
	setValue: (val: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = (props) => {
	// Editor ref
	const quill = useRef<any>(null)
	const [readOnly, setReadOnly] = useState<boolean>(false)

	const imageHandler = useCallback(async () => {
		if (props.readOnly) return

		const input = document.createElement("input")
		input.setAttribute("type", "file")
		input.setAttribute("accept", "image/*")
		input.click()

		input.onchange = async () => {
			if (!input.files?.length) return
			const file = input.files[0]
			if (file) {
				setReadOnly(true)
				toast
					.promise(
						Storage.put(
							`blog-image-${(Math.random() * 1000).toFixed(0)}-${
								file.name
							}`,
							file
						),
						{
							success: "Image attached successfully",
							error: "Something went wrong",
							pending: "Uploading image ...",
						}
					)
					.then((res) => {
						let image = generateUrl(`public/${res.key}`)
						let editor = quill.current.getEditor()
						const range = quill.current.getEditorSelection("focus", "true")
						editor.insertEmbed(range.index, "image", image)
					})
					.finally(() => setReadOnly(false))
			}
		}
	}, [props.readOnly])

	const modules = useMemo(
		() => ({
			toolbar: {
				container: props.minimal
					? [
							[{ header: [false] }],
							["bold", "italic", "underline", "blockquote"],
							[{ color: [] }],
					  ]
					: [
							[{ header: [2, 3, 4, false] }],
							["bold", "italic", "underline", "blockquote"],
							[{ color: [] }],
							[
								{ list: "ordered" },
								{ list: "bullet" },
								{ indent: "-1" },
								{ indent: "+1" },
							],
							["link", "image"],
							["clean"],
					  ],
				handlers: {
					image: imageHandler,
				},
			},
			clipboard: {
				matchVisual: true,
			},
		}),
		[imageHandler, props.minimal]
	)

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
		"color",
		`clean`,
	]

	return (
		<div>
			<label className={`text-sm mb-5 text-gray-200 font-light`}>
				{props.label}
			</label>
			<div className="mt-4">
				<ReactQuill
					ref={(el: any) => (quill.current = el)}
					theme="snow"
					placeholder={"Start from here.."}
					value={props.value}
					onChange={(newValue: string) => props.setValue(newValue)}
					formats={formats}
					modules={modules}
					readOnly={readOnly || props.readOnly}
					className={"editorDark"}
				/>
			</div>
		</div>
	)
}

export default RichTextEditor
