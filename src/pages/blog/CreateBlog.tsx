// Importing helper modules
import api from "utils/axios.config"
import { Auth } from "aws-amplify"
import { toast } from "react-toastify"
import { useRef, useState } from "react"
import { updateState } from "utils/modules"

// Importing core components
import Button from "components/ui/Button"
import BackButton from "components/ui/BackButton"
import Fade from "react-reveal/Fade"
import ImageUploader from "components/modules/ImageUploader"
import RichTextEditor from "components/modules/RichTextEditor"
import TextInput from "components/modules/TextInput"

type State = { [key: string]: string }

const initialState: State = {
	title: "",
	image: "",
	author: "",
	content: "",
	description: "",
}

const CreateBlog = () => {
	// Component State
	const [form, setForm] = useState(initialState)
	const [loading, setLoading] = useState<boolean>(false)
	const [imageProgress, setImageProgress] = useState<boolean>(false)

	// Top el
	const topEl = useRef<HTMLDivElement | null>()

	async function submit() {
		if (loading || imageProgress) return

		if (Object.values(form).length === 2) {
			toast.warning("All fields are required")
			return
		}

		topEl.current?.scrollIntoView()

		try {
			// Get Auth Token
			const token = await (await Auth.currentSession())
				.getIdToken()
				.getJwtToken()
			setLoading(true)
			toast
				.promise(
					api.post(
						"/blog",
						{ ...form, title: form.title.trim() },
						{
							headers: { Authorization: token },
						}
					),
					{
						pending: "Publishing Blog, Please Wait...",
					}
				)
				.then((res) => {
					toast.success(res.data)
					setForm(initialState)
				})
				.catch((err) => toast.error(err.message))
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<div className="h-screen bg-gray-900 px-20">
			<Fade>
				<div className="py-5">
					<BackButton to="/blog-manager" title="Publish Blog Post" />
					<div
						className="border-t border-t-gray-700 mt-3"
						ref={(el) => (topEl.current = el)}
					></div>
					<div className="sm:grid md:grid-cols-2 gap-6 py-5">
						<div className=" flex flex-col gap-5">
							<TextInput
								placeholder="Post title"
								label="Title"
								disabled={loading || imageProgress}
								value={form.title}
								setValue={(val) => updateState("title", val, setForm)}
								maxLength={100}
							/>
							<TextInput
								disabled={loading || imageProgress}
								placeholder="Name of author"
								label="Author"
								value={form.author}
								setValue={(val) => updateState("author", val, setForm)}
							/>
							<TextInput
								disabled={loading || imageProgress}
								placeholder="A short summary"
								label="Summary"
								maxLength={148}
								value={form.description}
								setValue={(val) => updateState("description", val, setForm)}
							/>
						</div>
						<div className=" max-sm:my-4">
							<ImageUploader
								label="Cover Photo"
								value={form.image}
								loading={imageProgress}
								edit={false}
								disabled={!form || imageProgress || loading}
								setLoading={(val) => setImageProgress(val)}
								setValue={(key) => updateState("image", key, setForm)}
							/>
						</div>
						{!imageProgress && (
							<div className="col-span-2 max-sm:my-4">
								<RichTextEditor
									label={"Article Details"}
									value={form.content}
									readOnly={loading}
									setValue={(value) => updateState("content", value, setForm)}
								/>
							</div>
						)}
						<div className="col-span-2 flex items-center justify-end gap-2">
							<Button
								title="Cancel"
								color="cancel"
								disabled={loading}
								clicked={setForm.bind(this, initialState)}
							/>
							<Button
								title="Publish Post"
								color="primary"
								disabled={loading || Object.values(form).includes("")}
								clicked={submit}
							/>
						</div>
					</div>
				</div>
			</Fade>
		</div>
	)
}

export default CreateBlog
